const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  order_data: {
    type: [FURNITURE],
    required: true,
  },
});

module.exports = mongoose.model("order", OrderSchema);
