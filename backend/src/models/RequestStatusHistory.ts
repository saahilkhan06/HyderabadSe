import { Schema, model } from 'mongoose';
import { REQUEST_STATUSES } from './ProductRequest.js';

const RequestStatusHistorySchema = new Schema(
  {
    referenceId: { type: String, required: true, index: true },
    fromStatus: { type: String, enum: REQUEST_STATUSES },
    toStatus: { type: String, enum: REQUEST_STATUSES, required: true },
    note: { type: String, trim: true },
    changedBy: { type: String, default: 'system' },
  },
  { timestamps: true, collection: 'request_status_history' },
);

RequestStatusHistorySchema.index({ referenceId: 1, createdAt: 1 });

export const RequestStatusHistoryModel = model(
  'RequestStatusHistory',
  RequestStatusHistorySchema,
);
