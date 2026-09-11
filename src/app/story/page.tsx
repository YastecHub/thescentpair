import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button-link";
import { GoldRule } from "@/components/ui/gold-rule";
// Eyebrow is available via type-eyebrow CSS class in this page
import { EditorialLetter } from "@/components/motion/editorial-letter";
import { BrandLogo } from "@/components/brand/brand-logo";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: "Our Story  His & Her's Scents",
  description:
    "The founding story of His & Her's Scents. Why we created a fragrance house built around two people sharing one signature scent.",
  path: "/story",
});

export default function StoryPage() {
  return (
    <article aria-labelledby="story-page-title">
      <Section
        labelledBy="story-page-title"
        data-motion="letter"
        className="bg-onyx-900 pb-12"
      >
        <div className="flex flex-col items-center text-center">
          <BrandLogo variant="crest" className="mb-6" />
          <h1
            id="story-page-title"
            className="type-page-heading mt-2 text-foil"
          >
            A scent becomes part of your story.
          </h1>
        </div>

        <EditorialLetter
          eyebrow="The Letter"
          lines={[
            {
              text: "We created HIS & HER'S because we believed fragrance could mean something more personal.",
              goldWords: ["personal"],
            },
            {
              text: "Not just a bottle chosen from a shelf, but something that reflects your identity and the connections that matter to you.",
              goldWords: ["connections"],
            },
            {
              text: "Inspired by the intimacy of two people developing their own signatures while sharing one unspoken thread.",
              goldWords: ["two"],
            },
            {
              text: "Because sometimes, a scent is more than a fragrance. It becomes part of your story.",
              goldWords: ["story"],
            },
          ]}
        />
      </Section>

      <Section className="bg-parchment text-ink-900 light-surface pt-0">
        <GoldRule />

        <div className="mt-12 grid gap-20 max-w-readable" data-motion="letter">
          {/* Section 1: Why */}
          <div>
            <p className="type-eyebrow text-gold-700">Why we exist</p>
            <h2 className="mt-4 type-section-heading">
              Fragrance should feel more personal.
            </h2>
            <div className="mt-6 grid gap-5 text-body text-ink-600 leading-relaxed">
              <p>
                We created HIS &amp; HER&apos;S because we believed fragrance
                could mean more. Not just a scent you choose from a shelf, but
                something that reflects who you are  and more importantly, the
                connections that matter to you.
              </p>
              <p>
                Too many fragrances are designed to be universal. We made the
                opposite choice. We made something that felt specific. Something
                that felt like it belonged to someone.
              </p>
            </div>
          </div>

          {/* Section 2: Identity */}
          <div>
            <p className="type-eyebrow text-gold-700">Fragrance as identity</p>
            <h2 className="mt-4 type-section-heading">
              A scent is how you stay in someone&apos;s memory.
            </h2>
            <div className="mt-6 grid gap-5 text-body text-ink-600 leading-relaxed">
              <p>
                We carry scent in ways we carry nothing else. It bypasses
                language. It reaches directly into memory and feeling.
              </p>
              <p>
                A signature fragrance becomes the invisible part of how people
                know you  what lingers in a room after you leave, what someone
                remembers when they think of you long after a moment has passed.
              </p>
            </div>
          </div>

          {/* Section 3: Two people */}
          <div>
            <p className="type-eyebrow text-gold-700">
              Two people, one shared story
            </p>
            <h2 className="mt-4 type-section-heading">
              Inspired by what two people share.
            </h2>
            <div className="mt-6 grid gap-5 text-body text-ink-600 leading-relaxed">
              <p>
                Every pair in HIS &amp; HER&apos;S begins with a question: what
                would it mean for two people to choose a fragrance together? Not
                the same fragrance  but two that belong alongside each other.
              </p>
              <p>
                We were inspired by the quiet intimacy of that. Two people
                developing their own signature, while remaining connected
                through a shared note, a shared mood, a thread that runs between
                them.
              </p>
            </div>
          </div>

          {/* Section 4: Complementary */}
          <div>
            <p className="type-eyebrow text-gold-700">
              Complementary, not identical
            </p>
            <h2 className="mt-4 type-section-heading">
              Different characters. One shared accord.
            </h2>
            <div className="mt-6 grid gap-5 text-body text-ink-600 leading-relaxed">
              <p>
                Our pairs are never two versions of the same fragrance. His is
                darker, drier, more resinous. Her&apos;s is warmer, softer, more
                layered. But both carry the same base note  the accord that
                makes them feel like they were made for each other.
              </p>
              <p>
                Because that is how it works between people, too. Not identical.
                Complementary.
              </p>
            </div>
          </div>

          {/* Section 5: Memory */}
          <div>
            <p className="type-eyebrow text-gold-700">Memory and connection</p>
            <h2 className="mt-4 type-section-heading">
              Scent carries what words cannot.
            </h2>
            <div className="mt-6 grid gap-5 text-body text-ink-600 leading-relaxed">
              <p>
                A fragrance worn every day becomes memory. It becomes the smell
                of a particular morning, a particular evening, a particular
                version of yourself that you will want to return to.
              </p>
              <p>
                That is the real thing we are making. Not a bottle. Not a
                product. A piece of your story that you carry on your skin.
              </p>
            </div>
          </div>

          {/* Section 6: The promise */}
          <div className="border-l-2 border-gold-700 pl-8">
            <blockquote className="font-display text-3xl leading-tight text-ink-900 lg:text-4xl">
              Signature scents, made for two.
            </blockquote>
            <p className="mt-6 text-body text-ink-600 leading-relaxed">
              That is our promise. Two fragrances with their own character,
              their own story  and a shared thread that makes them unmistakably
              a pair.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-readable">
          <GoldRule />
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/pairs" variant="primary">
              Explore the pairs
            </ButtonLink>
            <ButtonLink href="/collection">Browse the collection</ButtonLink>
          </div>
        </div>
      </Section>
    </article>
  );
}
