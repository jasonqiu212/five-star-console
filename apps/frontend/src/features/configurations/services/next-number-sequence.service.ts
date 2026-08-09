import { InvoiceOrgEntity, UpdateNextNumberSequenceRequest } from "shared-types";
import { nextNumberSequenceRepository } from "./next-number-sequence.repository";

async function consumeNextValue(key: string, transactionId?: string): Promise<number> {
  const sequences = await nextNumberSequenceRepository.list();
  const row = sequences.rows.find((seq) => seq.key === key);
  if (!row) throw new Error(`Sequence "${key}" not found`);

  const valueToConsume = row.nextValue;
  await nextNumberSequenceRepository.update(
    row.$id,
    { nextValue: valueToConsume + 1 },
    { transactionId }
  );
  return valueToConsume;
}

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

  async updateNextNumberSequence(params: UpdateNextNumberSequenceRequest) {
    const { id, nextValue } = params;
    return nextNumberSequenceRepository.update(id, { nextValue });
  },

  /** Returns the next PO number and stages the sequence's increment. */
  async consumeNextPoNumber(transactionId?: string): Promise<number> {
    return consumeNextValue("po", transactionId);
  },

  /** Returns the next invoice number for the given entity and stages the sequence's increment. */
  async consumeNextInvoiceNumber(
    entity: InvoiceOrgEntity,
    transactionId?: string
  ): Promise<number> {
    return consumeNextValue(`invoice-${entity}`, transactionId);
  },
};
