import { DATABASE_ID } from "@/shared/appwrite/appwrite-client";
import { NextNumberSequence } from "shared-types";
import { createRepository } from "@/shared/repositories/create-repository";

const TABLE_ID = "next_number_sequence";

export const nextNumberSequenceRepository = {
  ...createRepository<NextNumberSequence>({ databaseId: DATABASE_ID, tableId: TABLE_ID }),
};
