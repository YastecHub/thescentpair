import { storySchema, type Story } from "@/lib/content/schemas";
import { parseContentCollection } from "@/lib/content/validation";

const demoStories = [
  {
    slug: "how-we-chose-our-scents",
    title: "How We Chose Our Scents",
    excerpt:
      "The quiet conversation that led us here  two people, two different instincts, one shared decision.",
    publishedAt: "2026-10-04",
    published: true,
    coverMedia: "hhs/stories/how-we-chose-our-scents/cover",
    relatedFragrances: ["midnight-oath", "velvet-vow"],
    body: "Choosing a fragrance together is an act of vulnerability. It asks something of both people. You have to be willing to say: this is how I want to be remembered.\n\nWe spent six months moving between workshops, sample vials and early-morning disagreements about what the word 'warm' actually means. He wanted something drier, more resinous  something that felt permanent. She wanted depth that evolved, that changed over the course of a day like a conversation that deepens with time.\n\nThe answer was not one fragrance. It was two. Different in character. United in accord. The shared amber base was the thing that neither of us expected  the thread that runs through both without either of us having asked for it.\n\nThat is what HIS & HER'S is made of. Not compromise. Complementarity.",
    seo: {
      title: "How We Chose Our Scents  His & Her's Scents",
      description:
        "The quiet conversation that led to HIS & HER'S. Two people, two different instincts, one shared fragrance decision.",
      ogImage: "hhs/og/how-we-chose-our-scents",
    },
  },
  {
    slug: "the-invisible-language-of-scent",
    title: "The Invisible Language of Scent",
    excerpt:
      "Why fragrance bypasses everything rational and speaks directly to memory  and what that means for two people who share one.",
    publishedAt: "2026-09-18",
    published: true,
    coverMedia: "hhs/stories/invisible-language/cover",
    relatedFragrances: ["midnight-oath"],
    body: "Scent is the only sense that does not travel through the thalamus on its way to the brain. It arrives directly at the amygdala  the part of the brain responsible for emotion, for fear, for attachment.\n\nThis is why a particular fragrance can return you to a morning ten years ago with a clarity that photographs cannot. Language fails. Images fade. But scent persists. It carries context the way nothing else can.\n\nWhen two people choose to share a fragrance  or to develop complementary ones  they are, without quite knowing it, writing something into each other's memory. Every time they smell that note again, in the air of a different room or years later on a different wrist, they will be returned to the same place.\n\nThis is the thing we think about when we are developing a pair. Not just: do these two fragrances smell good together? But: what will they hold? What will they mean, later, when the moment is gone but the scent remains?",
    seo: {
      title: "The Invisible Language of Scent  His & Her's Scents",
      description:
        "Fragrance bypasses rationality. It speaks directly to memory. Here is what that means for two people who share one.",
      ogImage: "hhs/og/invisible-language",
    },
  },
  {
    slug: "on-gifting-something-that-stays",
    title: "On Gifting Something That Stays",
    excerpt:
      "A fragrance given well is not a transaction. It is a statement about what you know of someone  and what you want them to carry.",
    publishedAt: "2026-08-30",
    published: true,
    coverMedia: "hhs/stories/on-gifting/cover",
    relatedFragrances: ["velvet-vow", "midnight-oath"],
    body: "The French have a phrase for it: un cadeau qui dure  a gift that lasts. It is used, almost always, for fragrance.\n\nA watch is precise. Jewellery is specific. But fragrance is intimate in a way that other gifts are not. You are saying: I know how you smell. I know what suits you. I know what you should be wearing on your skin for the next year of your life.\n\nGiven correctly, it is one of the most affectionate things one person can do for another.\n\nGiven carelessly, it says nothing at all.\n\nThe dual coffret was designed for the gift that means something. The rigid onyx box, the velvet lining, the handwritten card on deckle-edged parchment  none of it is decoration. It is context. It tells the person receiving it that what is inside was not chosen at random. That someone thought about it. That someone knows them.\n\nA fragrance given well is not a transaction. It is a statement. Choose accordingly.",
    seo: {
      title: "On Gifting Something That Stays  His & Her's Scents",
      description:
        "A fragrance given well is not a transaction. It is a statement about what you know of someone and what you want them to carry.",
      ogImage: "hhs/og/on-gifting",
    },
  },
] satisfies Story[];

export const stories = parseContentCollection(
  storySchema,
  demoStories,
  "stories",
);
