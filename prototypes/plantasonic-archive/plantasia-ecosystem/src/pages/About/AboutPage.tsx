import { Page } from '@components/common/Page/Page';
import { Panel } from '@design-system/components/Panel';

/** AboutPage — the vision and philosophy behind Plantasia. */
export function AboutPage() {
  return (
    <Page
      eyebrow="The vision"
      title="About Plantasia"
      lede="A living sound ecosystem where music is cultivated, not programmed."
      width="narrow"
    >
      <Panel variant="glass" data-animate>
        <div className="stack">
          <p>
            Plantasia reimagines the synthesizer as a garden. Instead of oscillators and filters, you
            tend Seeds, Sunlight, Water, and Wind. Instead of presets, you cultivate living Species
            that grow, breathe, mutate, and evolve.
          </p>
          <p>
            Every visual element is alive — nothing ever stops moving. The center ecosystem is the
            application: a procedurally-generated organism whose roots, branches, leaves, and blooms
            respond to the sound it makes in real time.
          </p>
          <p>
            Beneath the poetry is a real, expandable synthesis engine built on Tone.js. Beginners
            learn synthesis through nature; experts can reveal the underlying signal chain at any
            time. Plantasia is equally a musical instrument, a generative art installation, an
            educational tool, and an ambient performance environment.
          </p>
        </div>
      </Panel>
    </Page>
  );
}
