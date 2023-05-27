"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const quoteBufferSchema = new schema(
  {
    caption: {
      type: String,
      required: true,
    },
    quoteBuffer: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("quoteBuffer", quoteBufferSchema);
