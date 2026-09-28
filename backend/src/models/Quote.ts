import { Schema, model } from 'mongoose';

const QuoteSchema = new Schema(
  {
    referenceId: { type: String, required: true, unique: true, index: true },
    currency: { type: String, default: 'INR', uppercase: true },
    productCost: { type: Number, required: true, min: 0 },
    sourcingHandling: { type: Number, required: true, min: 0 },
    packaging: { type: Number, required: true, min: 0 },
    internationalShipping: { type: Number, required: true, min: 0 },
    estimatedDestinationCharges: { type: Number, required: true, min: 0 },
    totalBeforeConfirmation: { type: Number, required: true, min: 0 },
    validUntil: { type: Date },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ['draft', 'sent', 'accepted', 'expired', 'declined'],
      default: 'draft',
    },
  },
  { timestamps: true, collection: 'quotes' },
);

export const QuoteModel = model('Quote', QuoteSchema);
