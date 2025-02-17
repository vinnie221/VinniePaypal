const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = "https://api-m.paypal.com"; // Use PayPal's live API URL when switching to live mode

const RETURN_URL = "https://vinnie-paypal.vercel.app/payment-success";
const CANCEL_URL = "https://vinnie-paypal.vercel.app/payment-cancel";

// Create a PayPal order
app.post("/create-paypal-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: amount } }], // Example currency: USD
        application_context: {
          return_url: RETURN_URL,
          cancel_url: CANCEL_URL,
        },
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ id: response.data.id });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Capture payment after approval
app.post("/capture-paypal-order", async (req, res) => {
  try {
    const { orderID } = req.body;
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    res.status(500).json({ error: "Payment capture failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
