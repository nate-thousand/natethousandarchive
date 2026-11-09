export const asciiStates = {
  seed: `•
│
•`,
  growth: `        ●
      ╱ │ ╲
    ●  ●  ●
  ╱   │   ╲
 ●    ●    ●`,
  bloom: `        ●
     ●  ●  ●
   ●  ●  ●  ●
     ●  ●  ●
        ●`,
  mutation: `   ●
 ╱ ╳ ╲
●  │  ●`,
  mycelium: `●────●────●
│  ╲ │ ╱  │
●────●────●
│ ╱  │  ╲ │
●────●────●`,
  ecosystem: `              ●
       ╱──────┼──────╲
     ●        ●        ●
   ╱ │ ╲            ╱ │ ╲
 ●  ●  ●          ●  ●  ●
       ╲          ╱
        ●────────●
        · · · · ·
            ●`,
} as const;

export type AsciiState = keyof typeof asciiStates;
