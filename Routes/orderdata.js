const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  if (!data) {
    try {
      await Order.create({
        order_data: [data],
      }).then(() => {
        res.json({
          success: true,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
