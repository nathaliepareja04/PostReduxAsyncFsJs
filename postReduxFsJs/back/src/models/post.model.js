import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "el campo title es requerido"],
    },
    description: {
      type: String,
      required: [true, "el campo description es requerido"],
    },
    imgUrl: {
      type: String,
      required: [true, "el campo imgUrl es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

export const postModel = model("post", postSchema);
