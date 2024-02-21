import { instance } from "../server.js";
import Razorpay from "razorpay";

import { Payment } from "../models/paymentModel.js";

import {
  validatePaymentVerification,
  validateWebhookSignature,
} from "razorpay/dist/utils/razorpay-utils.js";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount) * 100, // smallest currency unit
    currency: "INR",
  };
  try {
    const order = await instance.orders.create(options);
    // console.log(order);
    res.status(200).json({
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  try {
    const isAuthenticated = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      process.env.RAZORPAY_API_SECRET
    );
    if (isAuthenticated) {
      // save this in database
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res
        .status(200)
        .send(`<h1 style="color:blue;font-size:46px;">Failed.Try again</h1>`)
        .json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send(
        `<h1 style="color:blue;font-size:46px;">Internal Server Error
    </h1>`
      )
      .json({ success: false });
  }
};
