import { InvoiceOrgEntity, UpdateNextNumberSequencePayload } from "shared-types";
import { nextNumberSequenceRepository } from "./next-number-sequence.repository";

export const nextNumberSequenceService = {
  async getNextInvoiceNumbers() {
    const sequences = await nextNumberSequenceRepository.list();
    return {
      fiveStarAutoLeather: sequences.rows.find(
        (seq) => seq.key === `invoice-${InvoiceOrgEntity.FiveStarAutoLeather}`
      ),
      leatherAndStitch: sequences.rows.find(
        (seq) => seq.key === `invoice-${InvoiceOrgEntity.LeatherAndStitch}`
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
