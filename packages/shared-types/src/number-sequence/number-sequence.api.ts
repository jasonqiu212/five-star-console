import { NextNumberSequence } from "../appwrite/appwrite";

export type UpdateNextNumberSequenceRequest = Pick<NextNumberSequence, "nextValue"> & {
  id: string;
};
