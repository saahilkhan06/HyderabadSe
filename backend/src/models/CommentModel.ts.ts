import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  name: string;
  comment: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 60,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel =
  mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);