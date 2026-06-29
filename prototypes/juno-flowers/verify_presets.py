#!/usr/bin/env python3
"""Verify the Juno Flowers MVP preset surface."""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
HTML = ROOT / "index.html"
ENGINE = ROOT / "plantasia-engine.js"

REQUIRED_FIELDS = [
    "scale", "color", "waveform", "attack", "release", "detuneCents",
    "pan", "filterType", "filterFreq", "delay", "echo", "reverb"
]
VALID_WAVEFORMS = {"sine", "triangle", "square", "sawtooth", "saw", "pulse", "noise"}
VALID_FILTERS = {"lowpass", "highpass", "bandpass"}
MAX_ECHO_FB = 0.72
FILTER_MAX = 8000

EXPECTED_PRESET = "junoflowers"


def extract_balanced_block(source: str, marker: str) -> str:
    start = source.find(marker)
    if start == -1:
        return ""
    brace_start = source.find("{", start)
    if brace_start == -1:
        return ""
    depth = 0
    for idx in range(brace_start, len(source)):
        ch = source[idx]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return source[brace_start + 1:idx]
    return ""


def parse_juno_preset(engine_js: str) -> dict:
    block = extract_balanced_block(engine_js, "junoflowers:")
    if not block:
        return {}

    sound = extract_balanced_block(block, "sound:")
    entry = {"raw": block}
    scale_m = re.search(r"scale:\s*\[([^\]]+)\]", block)
    if scale_m:
        entry["scale"] = [
            float(x.strip()) for x in scale_m.group(1).split(",") if x.strip()
        ]
    color_m = re.search(r"color:\s*([A-Z_]+|'[^']+'|\"[^\"]+\")", block)
    if color_m:
        entry["color"] = color_m.group(1)
    for field in ["waveform", "filterType"]:
        fm = re.search(rf"{field}:\s*'([^']+)'", sound)
        if fm:
            entry[field] = fm.group(1)
    for field in ["attack", "release", "filterFreq", "delay", "echo", "reverb"]:
        fm = re.search(rf"{field}:\s*([\d.]+)", sound)
        if fm:
            entry[field] = float(fm.group(1))
    if "detuneCents:" in sound:
        entry["detuneCents"] = True
    if "pan:" in sound:
        entry["pan"] = True
    return entry


def main():
    html = HTML.read_text(encoding="utf-8")
    engine_js = ENGINE.read_text(encoding="utf-8") if ENGINE.exists() else ""
    scripts = re.findall(r"<script>([\s\S]*?)</script>", html)
    js = scripts[0] if scripts else ""
    legacy_block = extract_balanced_block(engine_js, "const LEGACY_PRESETS =")
    top_level_presets = re.findall(r"^\s{4}(\w+):\s*\{", legacy_block, flags=re.M)
    code_presets = {EXPECTED_PRESET: parse_juno_preset(engine_js)} if EXPECTED_PRESET in top_level_presets else {}

    preset_input_m = re.search(r'id="preset"[^>]*value="(\w+)"', html)
    mode_input_m = re.search(r'id="performanceMode"[^>]*value="([^"]+)"', html)

    preset_order_m = re.search(r"const PRESET_ORDER = \[([\s\S]*?)\];", js)
    preset_order = []
    if preset_order_m:
        preset_order = re.findall(r"'(\w+)'", preset_order_m.group(1))

    print("=" * 60)
    print("Juno Flowers MVP — Preset Surface")
    print("=" * 60)
    print(f"  Engine presets : {', '.join(top_level_presets) or 'none'}")
    print(f"  UI sound input : {preset_input_m.group(1) if preset_input_m else 'missing'}")
    print(f"  UI visual input: {mode_input_m.group(1) if mode_input_m else 'missing'}")

    print()
    print("=" * 60)
    print("Juno Flowers Preset Validation")
    print("=" * 60)

    errors = []
    warnings = []

    code_set = set(code_presets.keys())
    if code_set != {EXPECTED_PRESET}:
        errors.append(f"engine should expose only {EXPECTED_PRESET}, found={code_set}")
    if not preset_input_m or preset_input_m.group(1) != EXPECTED_PRESET:
        errors.append("UI preset input must be fixed to junoflowers")
    if not mode_input_m or mode_input_m.group(1) != "juno-flow":
        errors.append("UI mode input must be fixed to juno-flow")

    if preset_order:
        order_set = set(preset_order)
        if order_set != code_set:
            warnings.append(
                f"PRESET_ORDER mismatch: missing={code_set-order_set}, extra={order_set-code_set}"
            )

    for key in sorted(code_presets.keys()):
        p = code_presets[key]
        issues = []

        for field in REQUIRED_FIELDS:
            if field not in p and field not in ("pan", "detuneCents"):
                if field == "scale" and "scale" not in p:
                    issues.append(f"missing {field}")
            elif field == "scale":
                if not p.get("scale") or len(p["scale"]) < 1:
                    issues.append("empty scale")
                elif any(f <= 0 or f > 20000 for f in p["scale"]):
                    issues.append("invalid scale frequencies")
            elif field == "waveform":
                if p.get("waveform") not in VALID_WAVEFORMS:
                    issues.append(f"unknown waveform '{p.get('waveform')}'")
            elif field == "filterType":
                if p.get("filterType") not in VALID_FILTERS:
                    issues.append(f"invalid filterType '{p.get('filterType')}'")
            elif field == "filterFreq":
                ff = p.get("filterFreq", 0)
                if ff < 100 or ff > FILTER_MAX:
                    warnings.append(f"{key}: filterFreq {ff} outside slider 100-{FILTER_MAX}")
            elif field == "delay":
                dm = min(1.0, p.get("delay", 0))
                if dm < 0 or dm > 1:
                    issues.append(f"delay mix {dm} out of 0-1")
            elif field == "echo":
                eb = min(MAX_ECHO_FB, p.get("echo", 0))
                if eb < 0 or eb > MAX_ECHO_FB:
                    issues.append(f"echo {eb} invalid")
            elif field in ("attack", "release"):
                if p.get(field, 0) <= 0:
                    issues.append(f"{field} must be > 0")

        if not p.get("detuneCents"):
            issues.append("missing detuneCents")
        if not p.get("pan"):
            issues.append("missing pan")

        status = "PASS" if not issues else "FAIL"
        detail = "; ".join(issues) if issues else (
            f"wave={p.get('waveform')} filter={p.get('filterType')} "
            f"{len(p.get('scale', []))} notes delay={min(1,p.get('delay',0)):.2f}"
        )
        print(f"  [{status}] {key:18s} {detail}")
        if issues:
            errors.extend([f"{key}: {i}" for i in issues])

    print()
    if warnings:
        print("Warnings:")
        for w in warnings:
            print(f"  ⚠ {w}")
        print()

    if errors:
        print(f"RESULT: {len(errors)} validation error(s)")
        for e in errors:
            print(f"  ✗ {e}")
        return 1

    print("RESULT: Juno Flowers is the only exposed preset and passes validation.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
