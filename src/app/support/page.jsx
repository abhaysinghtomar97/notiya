"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import DallChiniMachine from "@/components/support/DallchiniMachine";

const UPI_ID = "7380974145@nyes";
const COFFEE_PRICE = 99; // ₹99 per coffee

function SupportContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("dallchini");

  // Coffee QR state
  const [isCustomPrice, setIsCustomPrice] = useState(false);
  const [coffeeQty, setCoffeeQty] = useState(1);
  const [customAmount, setCustomAmount] = useState("150");
  const [supporterName, setSupporterName] = useState("");
  const [showCoffeeQR, setShowCoffeeQR] = useState(false);
  const [coffeePaid, setCoffeePaid] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "coffee" || tab === "dallchini") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const parsedCustom = Math.max(1, Number(customAmount) || 0);
  const coffeeTotal = isCustomPrice ? parsedCustom : coffeeQty * COFFEE_PRICE;

  const itemLabel = isCustomPrice
    ? `Custom Coffee (₹${coffeeTotal})`
    : `Notiya Coffee x${coffeeQty}`;

  const noteText = supporterName.trim()
    ? `${itemLabel} from ${supporterName.trim()}`
    : itemLabel;

  const coffeeUpiUrl = `upi://pay?pa=${UPI_ID}&pn=Notiya%20Support&am=${coffeeTotal}&cu=INR&tn=${encodeURIComponent(
    noteText
  )}`;

  const handleCoffeePreset = (qty) => {
    setIsCustomPrice(false);
    setCoffeeQty(qty);
    setShowCoffeeQR(false);
    setCoffeePaid(false);
  };

  const handleSelectCustom = () => {
    setIsCustomPrice(true);
    setShowCoffeeQR(false);
    setCoffeePaid(false);
  };

  return (
    <main className="min-h-screen bg-amber-50/30 px-4 py-10 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Support Notiya</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Fuel late-night coding with a virtual desi snack or a freshly brewed coffee.
          </p>

          {/* Toggle Switcher */}
          <div className="mt-6 inline-flex rounded-2xl border border-amber-200/80 bg-white p-1.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <button
              onClick={() => setActiveTab("dallchini")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === "dallchini"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              🌿 DallChini Machine
            </button>
            <button
              onClick={() => setActiveTab("coffee")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === "coffee"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              ☕ Buy Me a Coffee
            </button>
          </div>
        </div>

        {/* Active View */}
        {activeTab === "dallchini" ? (
          <DallChiniMachine upiId={UPI_ID} />
        ) : (
          <div className="mx-auto max-w-md rounded-3xl border border-amber-200/80 bg-white p-7 shadow-xl shadow-amber-950/5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl dark:bg-amber-500/15">
                  ☕
                </div>
                <div>
                  <h2 className="text-lg font-bold">Buy Me a Coffee</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    ₹{COFFEE_PRICE} per cup or pick your own amount
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-amber-50 px-3 py-1.5 font-mono text-lg font-bold text-amber-600 dark:bg-zinc-950 dark:text-amber-400">
                ₹{coffeeTotal}
              </div>
            </div>

            {/* Cup & Custom Selector */}
            <div className="mt-5">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Choose Cups or Custom Price
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleCoffeePreset(num)}
                    className={`rounded-xl border py-2.5 text-sm font-semibold transition ${
                      !isCustomPrice && coffeeQty === num
                        ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-amber-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                    }`}
                  >
                    ☕ ×{num}
                  </button>
                ))}
                <button
                  onClick={handleSelectCustom}
                  className={`rounded-xl border py-2.5 text-sm font-semibold transition ${
                    isCustomPrice
                      ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                      : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-amber-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                  }`}
                >
                  ✏️ Custom
                </button>
              </div>

              {/* Custom Amount Input */}
              {isCustomPrice && (
                <div className="mt-3 flex items-center rounded-xl border border-amber-400 bg-amber-50/40 px-3.5 py-2 dark:border-amber-500/50 dark:bg-zinc-950">
                  <span className="mr-2 font-mono text-base font-bold text-amber-600 dark:text-amber-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount (e.g. 250)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setShowCoffeeQR(false);
                      setCoffeePaid(false);
                    }}
                    className="w-full bg-transparent font-mono text-base text-zinc-900 placeholder-zinc-400 focus:outline-none dark:text-white dark:placeholder-zinc-500"
                  />
                </div>
              )}
            </div>

            {/* Optional Name / Note */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Your name or short note (optional)"
                value={supporterName}
                onChange={(e) => {
                  setSupporterName(e.target.value);
                  setShowCoffeeQR(false);
                }}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-500"
              />
            </div>

            {/* QR Code or Generate Button */}
            <div className="mt-6">
              {coffeePaid ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center dark:border-amber-500/30 dark:bg-amber-500/10">
                  <div className="text-3xl">🎉</div>
                  <h3 className="mt-2 font-semibold text-amber-900 dark:text-amber-300">
                    Thank you{supporterName ? `, ${supporterName}` : ""}!
                  </h3>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    Your ₹{coffeeTotal} coffee support keeps Notiya running.
                  </p>
                  <button
                    onClick={() => {
                      setCoffeePaid(false);
                      setShowCoffeeQR(false);
                    }}
                    className="mt-4 text-xs font-semibold text-amber-600 hover:underline dark:text-amber-400"
                  >
                    Buy another round
                  </button>
                </div>
              ) : showCoffeeQR ? (
                <div className="flex flex-col items-center rounded-2xl border border-amber-200 bg-white p-5 text-zinc-900 shadow-sm">
                  <QRCodeSVG value={coffeeUpiUrl} size={160} />
                  <p className="mt-3 text-xs font-bold">
                    Scan with GPay, PhonePe, or Paytm
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Paying ₹{coffeeTotal} to {UPI_ID}
                  </p>
                  <div className="mt-4 flex w-full gap-2">
                    <button
                      onClick={() => setShowCoffeeQR(false)}
                      className="rounded-xl bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setCoffeePaid(true)}
                      className="flex-1 rounded-xl bg-amber-500 py-2 text-xs font-semibold text-white hover:bg-amber-600"
                    >
                      I Have Paid ₹{coffeeTotal}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCoffeeQR(true)}
                  disabled={
                    isCustomPrice && (!customAmount || Number(customAmount) <= 0)
                  }
                  className="w-full rounded-xl bg-amber-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 disabled:opacity-40"
                >
                  Generate UPI QR · ₹{coffeeTotal}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// page url : /support
const page = () => {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-amber-50/30 dark:bg-zinc-950" />}
    >
      <SupportContent />
    </Suspense>
  );
};

export default page;