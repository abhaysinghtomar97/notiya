"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

const SNACKS = [
  { code: "A1", name: "Masala Chai", price: 20, emoji: "☕" },
  { code: "A2", name: "Samosa", price: 25, emoji: "🥟" },
  { code: "B1", name: "Maggi Bowl", price: 40, emoji: "🍜" },
  { code: "B2", name: "Parle-G", price: 10, emoji: "🍪" },
  { code: "C1", name: "Cold Coffee", price: 60, emoji: "🧋" },
  { code: "C2", name: "Aloo Bhujia", price: 30, emoji: "🥨" },
];

export default function DallChiniMachine({ upiId = "7380974145@nyes" }) {
  const [cart, setCart] = useState([]);
  const [codeInput, setCodeInput] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [dispensed, setDispensed] = useState([]);

  const addSnack = (snack) => {
    setShowQR(false);
    setCart((prev) => {
      const existing = prev.find((item) => item.code === snack.code);
      if (existing) {
        return prev.map((item) =>
          item.code === snack.code ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...snack, qty: 1 }];
    });
  };

  const handleKeyPress = (char) => {
    const next = (codeInput + char).slice(0, 2);
    setCodeInput(next);
    if (next.length === 2) {
      const match = SNACKS.find((s) => s.code === next);
      if (match) addSnack(match);
      setTimeout(() => setCodeInput(""), 350);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const upiUrl = `upi://pay?pa=${upiId}&pn=DallChini%20Notiya&am=${total}&cu=INR&tn=Notiya%20Snack%20Support`;

  const handleConfirmPayment = () => {
    setDispensed(cart);
    setCart([]);
    setShowQR(false);
  };

  return (
    <div className="mx-auto mt-5 grid max-w-4xl gap-6 rounded-3xl border border-yellow-400 bg-white p-6 text-white shadow-2xl md:grid-cols-3">
      {/* Glass Cabinet */}
      <div className="md:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-wide text-amber-400">
            <Image src={'/daalchini_logo.png'} height={50} width={100} alt='daalchini' ></Image> 
          </h2>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            ● ONLINE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-amber-700/70 bg-blue-300 p-4 sm:grid-cols-3">
          {SNACKS.map((snack) => (
            <button
              key={snack.code}
              onClick={() => addSnack(snack)}
              className="group flex flex-col items-center rounded-xl border border-amber-800 bg-zinc-900/90 p-3 transition hover:border-amber-400/60 hover:bg-yellow-400"
            >
              <span className="self-start rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-amber-400">
                {snack.code}
              </span>
              <span className="my-2 text-3xl transition-transform group-hover:scale-110">
                {snack.emoji}
              </span>
              <span className="text-sm font-medium">{snack.name}</span>
              <span className="mt-1 font-mono text-xs text-emerald-400">
                ₹{snack.price}
              </span>
            </button>
          ))}
        </div>

        {/* Dispense Chute */}
        <div className="mt-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-3 text-center">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Collection Chute
          </p>
          {dispensed.length > 0 ? (
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {dispensed.map((item) => (
                <span
                  key={item.code}
                  className="rounded-lg bg-amber-500/20 px-2.5 py-1 text-sm text-amber-300"
                >
                  {item.emoji} {item.name} ×{item.qty}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-xs text-zinc-600">Push flap after payment</p>
          )}
        </div>
      </div>

      {/* Control Panel & QR */}
      <div className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div>
          {/* LED Display */}
          <div className="mb-3 rounded-lg bg-black p-3 font-mono text-emerald-400 shadow-inner">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>CODE: {codeInput || "--"}</span>
              <span>ITEMS: {cart.reduce((n, i) => n + i.qty, 0)}</span>
            </div>
            <div className="mt-1 text-2xl font-bold">TOTAL: ₹{total}</div>
          </div>

          {/* Keypad */}
          <div className="mb-4 grid grid-cols-3 gap-1.5 font-mono text-sm">
            {["A", "B", "C", "1", "2", "3"].map((k) => (
              <button
                key={k}
                onClick={() => handleKeyPress(k)}
                className="rounded-lg bg-zinc-800 py-2 font-semibold hover:bg-zinc-700 active:bg-amber-500 active:text-black"
              >
                {k}
              </button>
            ))}
          </div>

          {/* Cart Items */}
          <div className="max-h-32 space-y-1.5 overflow-y-auto text-xs">
            {cart.map((item) => (
              <div
                key={item.code}
                className="flex items-center justify-between rounded bg-zinc-900 px-2 py-1.5"
              >
                <span>
                  {item.emoji} {item.name} ×{item.qty}
                </span>
                <span className="font-mono text-amber-400">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout / QR Section */}
        <div className="mt-4 border-t border-zinc-800 pt-3">
          {showQR && total > 0 ? (
            <div className="flex flex-col items-center rounded-xl bg-white p-3 text-zinc-900">
              <QRCodeSVG value={upiUrl} size={140} />
              <p className="mt-2 text-xs font-semibold">Scan with any UPI app</p>
              <button
                onClick={handleConfirmPayment}
                className="mt-2 w-full rounded-lg bg-emerald-600 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
              >
                I Have Paid ₹{total}
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setCart([])}
                disabled={cart.length === 0}
                className="rounded-xl bg-zinc-800 px-3 py-2.5 text-xs text-zinc-300 hover:bg-zinc-700 disabled:opacity-40"
              >
                Clear
              </button>
              <button
                onClick={() => setShowQR(true)}
                disabled={total === 0}
                className="flex-1 rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400 disabled:opacity-40"
              >
                Pay via QR
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}