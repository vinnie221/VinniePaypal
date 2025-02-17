import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PaypalTest = () => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [color, setColor] = useState("text-blue-500");
  const [amount, setAmount] = useState(0);

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  const handleApprove = async (orderID) => {
    //https://vinnie-paypal-8mm2.vercel.app/
    //http://localhost:5173
    try {
      const res = await fetch("https://vinnie-paypal-8mm2.vercel.app/capture-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID }),
      });
      const data = await res.json();
      if (data.status === "COMPLETED") {
        setPaidFor(true);
      } else {
        setError("Payment not completed.");
      }
    } catch (err) {
      console.error("Payment capture error:", err);
      setError("Payment processing error.");
    }
  };

  useEffect(() => {
    const words = "Paypal Payment Test";
    let i = 0;
    const interval = setInterval(() => {
      setText(words.substring(0, i + 1));
      i++;
      if (i > words.length) {
        i = 0;
        setText("");
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const colors = ["text-blue-500", "text-green-500", "text-purple-500", "text-red-500"];
    let index = 0;
    const colorInterval = setInterval(() => {
      setColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 1000);
    return () => clearInterval(colorInterval);
  }, []);

  if (paidFor) {
    return (
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-green-500 text-center text-2xl"
      >
        Payment Successful!
      </motion.h1>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100"
    >
      <h1 className={`text-3xl font-bold ${color} transition-all h-10 duration-500`}>
        {text}
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-6"
      >
        <h1 className="text-xl font-bold mb-2 text-center">Pay with PayPal</h1>
        
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          className="w-full p-2 border border-gray-300 rounded mb-4 text-center"
          placeholder="Enter amount"
        />
        
        <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
          <PayPalButtons
            createOrder={async () => {
              const res = await fetch("http://localhost:5000/create-paypal-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
              });
              const data = await res.json();
              return data.id;
            }}
            onApprove={async (data) => {
              handleApprove(data.orderID);
            }}
            onError={(err) => {
              setError("Payment failed. Please try again.");
              console.error("PayPal Checkout Error:", err);
            }}
          />
        </PayPalScriptProvider>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </motion.div>
    </motion.div>
  );
};

export default PaypalTest;
