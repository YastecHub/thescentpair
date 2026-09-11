import { noteSchema, type Note } from "@/lib/content/schemas";
import { parseContentCollection } from "@/lib/content/validation";

const demoNotes = [
  {
    id: "bergamot",
    name: "Bergamot",
    family: "citrus",
    shortDescription: "Bright citrus lift for the opening impression.",
    cloudinaryImageId: "hhs/notes/bergamot",
    accentColor: "#D9BC6A",
  },
  {
    id: "pink-pepper",
    name: "Pink Pepper",
    family: "spice",
    shortDescription: "A dry sparkle that keeps the first impression awake.",
    cloudinaryImageId: "hhs/notes/pink-pepper",
    accentColor: "#B08D3A",
  },
  {
    id: "oud",
    name: "Oud",
    family: "woody",
    shortDescription: "Resinous, smoky and grounded.",
    cloudinaryImageId: "hhs/notes/oud",
    accentColor: "#8A6C22",
  },
  {
    id: "rose",
    name: "Rose",
    family: "floral",
    shortDescription: "Soft floral depth without sweetness becoming loud.",
    cloudinaryImageId: "hhs/notes/rose",
    accentColor: "#7C4A45",
  },
  {
    id: "amber",
    name: "Amber",
    family: "warm",
    shortDescription: "A golden warmth that links the demonstration pair.",
    cloudinaryImageId: "hhs/notes/amber",
    accentColor: "#B08D3A",
  },
  {
    id: "musk",
    name: "Musk",
    family: "skin",
    shortDescription: "A quiet skin note that helps the scent linger.",
    cloudinaryImageId: "hhs/notes/musk",
    accentColor: "#F0E2B8",
  },
] satisfies Note[];

export const notes = parseContentCollection(noteSchema, demoNotes, "notes");
