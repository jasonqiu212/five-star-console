import { InvoiceOrgEntity, UpdateNextNumberSequencePayload } from "shared-types";
import { nextNumberSequenceRepository } from "./next-number-sequence.repository";

export const nextNumberSequenceService = {
  async getNextInvoiceNumbers() {
    const sequences = await nextNumberSequenceRepository.list();
    return {
      fiveStarAutoLeather: sequences.rows.find(
        (seq) => seq.key === `invoice-${InvoiceOrgEntity.FIVE_STAR_AUTO_LEATHER}`
      ),
      leatherAndStitch: sequences.rows.find(
        (seq) => seq.key === `invoice-${InvoiceOrgEntity.LEATHER_AND_STITCH}`
      ),
    };
  },

  async getNextPoNumber() {
    const sequences = await nextNumberSequenceRepository.list();
    return sequences.rows.find((seq) => seq.key === "po");
  },

  async updateNextNumberSequence(id: string, payload: Partial<UpdateNextNumberSequencePayload>) {
    return nextNumberSequenceRepository.update(id, payload);
  },
};
