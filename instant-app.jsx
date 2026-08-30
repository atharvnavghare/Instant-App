import React, { useState, useMemo } from "react";
import { ShoppingBag, Flame, MapPin, Home, TrendingUp, User, Plus, X, Check, Search } from "lucide-react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Work+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
`;

const INK = "#171410";
const PAPER = "#EDE9DD";
const ORANGE = "#FF4713";
const GREEN = "#1C8A4B";
const NAVY = "#24306B";
const LINE = "#C9C2AE";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "tshirts", label: "T-Shirts", emoji: "👕" },
  { id: "jeans", label: "Jeans/Pants", emoji: "👖" },
  { id: "shirts", label: "Shirts", emoji: "🧥" },
  { id: "shorts", label: "Shorts/Cargos", emoji: "🩳" },
  { id: "footwear", label: "Footwear", emoji: "👟" },
  { id: "accessories", label: "Accessories", emoji: "🧢" },
];

const GRADIENTS = {
  tshirts: "linear-gradient(135deg,#3a3a3a,#171410)",
  jeans: "linear-gradient(135deg,#2b3a63,#171410)",
  shirts: "linear-gradient(135deg,#5c4a2e,#171410)",
  shorts: "linear-gradient(135deg,#4a5c3a,#171410)",
  footwear: "linear-gradient(135deg,#6b2e2e,#171410)",
  accessories: "linear-gradient(135deg,#5c3a5c,#171410)",
};

const PRODUCTS = [
  { id: 1, name: "Oversized Black Tee", cat: "tshirts", price: 399, sold: 42, trending: true },
  { id: 2, name: "Baggy Cargo", cat: "shorts", price: 699, sold: 31, trending: true },
  { id: 3, name: "Relaxed Fit Shirt", cat: "shirts", price: 499, sold: 27, trending: true },
  { id: 4, name: "Washed Denim Jeans", cat: "jeans", price: 899, sold: 19 },
  { id: 5, name: "Graphic Print Tee", cat: "tshirts", price: 349, sold: 55, trending: true },
  { id: 6, name: "Cargo Shorts", cat: "shorts", price: 449, sold: 22 },
  { id: 7, name: "Chunky Sneakers", cat: "footwear", price: 1299, sold: 14 },
  { id: 8, name: "Canvas Trainers", cat: "footwear", price: 799, sold: 18 },
  { id: 9, name: "Corduroy Cap", cat: "accessories", price: 299, sold: 38 },
  { id: 10, name: "Chain Bracelet", cat: "accessories", price: 199, sold: 46 },
  { id: 11, name: "Slim Fit Chinos", cat: "jeans", price: 649, sold: 12 },
  { id: 12, name: "Polo Tee", cat: "tshirts", price: 449, sold: 20 },
];

function PriceTag({ value, size = "md" }) {
  const big = size === "lg";
  return (
    <div
      className="inline-flex items-center gap-1 shrink-0"
      style={{
        background: ORANGE,
        color: PAPER,
        padding: big ? "4px 10px" : "2px 8px",
        transform: "rotate(-2deg)",
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        fontSize: big ? 15 : 13,
        border: `1.5px dashed ${PAPER}`,
        boxShadow: "2px 2px 0 rgba(23,20,16,0.25)",
      }}
    >
      ₹{value}
    </div>
  );
}

function ProductCard({ p, onAdd, added }) {
  return (
    <div
      className="flex flex-col shrink-0"
      style={{
        width: 152,
        background: "#fff",
        border: `1px solid ${LINE}`,
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ height: 130, background: GRADIENTS[p.cat] }}
      >
        <span style={{ fontSize: 40, opacity: 0.9 }}>
          {CATEGORIES.find((c) => c.id === p.cat)?.emoji}
        </span>
        {p.trending && (
          <div
            className="absolute top-1.5 left-1.5 flex items-center gap-0.5"
            style={{
              background: INK,
              color: ORANGE,
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 5px",
            }}
          >
            <Flame size={10} /> HOT
          </div>
        )}
        <div className="absolute -bottom-2 left-2">
          <PriceTag value={p.price} />
        </div>
      </div>
      <div className="px-2 pt-3 pb-2 flex flex-col gap-1.5" style={{ color: INK }}>
        <p
          className="leading-tight"
          style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: 12.5, minHeight: 32 }}
        >
          {p.name}
        </p>
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: GREEN,
              fontWeight: 700,
            }}
          >
            ● {p.sold} sold today
          </span>
        </div>
        <button
          onClick={() => onAdd(p)}
          className="mt-1 w-full flex items-center justify-center gap-1 transition-transform active:scale-95"
          style={{
            background: added ? GREEN : INK,
            color: PAPER,
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            padding: "7px 0",
          }}
        >
          {added ? (
            <>
              <Check size={12} /> ADDED
            </>
          ) : (
            <>
              <Plus size={12} /> ADD
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function InstantApp() {
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(null);
  const [tab, setTab] = useState("home");

  const filtered = useMemo(
    () => (category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === category)),
    [category]
  );
  const trending = PRODUCTS.filter((p) => p.trending);
  const under499 = PRODUCTS.filter((p) => p.price < 499);

  function addToCart(p) {
    setCart((c) => [...c, p]);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded(null), 900);
  }

  const total = cart.reduce((s, p) => s + p.price, 0);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center py-6"
      style={{ background: "#DAD4C2", fontFamily: "'Work Sans', sans-serif" }}
    >
      <style>{FONTS}</style>
      {/* Phone frame */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: 380,
          height: 780,
          background: PAPER,
          border: `10px solid ${INK}`,
          borderRadius: 34,
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        {/* Ticker */}
        <div
          className="overflow-hidden shrink-0 flex items-center"
          style={{ height: 26, background: INK }}
        >
          <div className="ticker-track flex items-center gap-8 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <span
                key={i}
                style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: GREEN }}
                className="flex items-center gap-8"
              >
                <span>🔥 LIVE IN YOUR CITY</span>
                <span style={{ color: ORANGE }}>● 42 SOLD TODAY</span>
                <span style={{ color: PAPER }}>OVERSIZED TEE ₹399</span>
                <span style={{ color: PAPER }}>BAGGY CARGO ₹699</span>
                <span style={{ color: ORANGE }}>● SAME-DAY DELIVERY</span>
              </span>
            ))}
          </div>
        </div>
        <style>{`
          .ticker-track { animation: scroll-left 14s linear infinite; }
          @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
        `}</style>

        {/* Header */}
        <div
          className="shrink-0 flex items-center justify-between px-4 pt-3 pb-2"
          style={{ borderBottom: `1px solid ${LINE}` }}
        >
          <div className="flex flex-col leading-none">
            <span
              style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: INK, letterSpacing: -0.5 }}
            >
              INSTANT
            </span>
            <span
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: ORANGE, fontWeight: 700 }}
            >
              MEN'S FASHION, INSTANTLY.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1 px-2 py-1"
              style={{ border: `1px dashed ${LINE}`, fontFamily: "'Space Mono', monospace", fontSize: 10 }}
            >
              <MapPin size={11} color={NAVY} /> YOUR CITY
            </div>
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingBag size={20} color={INK} />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 flex items-center justify-center"
                  style={{
                    background: ORANGE,
                    color: PAPER,
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto pb-2">
          {/* Category chips */}
          <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 transition-colors"
                style={{
                  background: category === c.id ? NAVY : "transparent",
                  color: category === c.id ? PAPER : INK,
                  border: `1.5px solid ${category === c.id ? NAVY : LINE}`,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>

          {/* Trending section */}
          <div className="mt-4">
            <div className="flex items-center gap-1.5 px-4 mb-2">
              <Flame size={15} color={ORANGE} />
              <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: INK }}>
                Today's Trending Fits
              </span>
            </div>
            <div className="flex gap-3 px-4 overflow-x-auto pb-2">
              {trending.map((p) => (
                <ProductCard key={p.id} p={p} onAdd={addToCart} added={justAdded === p.id} />
              ))}
            </div>
          </div>

          {/* Under 499 section */}
          <div className="mt-5">
            <div className="flex items-center justify-between px-4 mb-2">
              <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: INK }}>
                Under ₹499
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  color: GREEN,
                  fontWeight: 700,
                }}
              >
                COLLEGE PICKS
              </span>
            </div>
            <div className="flex gap-3 px-4 overflow-x-auto pb-2">
              {under499.map((p) => (
                <ProductCard key={p.id} p={p} onAdd={addToCart} added={justAdded === p.id} />
              ))}
            </div>
          </div>

          {/* Category grid */}
          <div className="mt-5 px-4">
            <div
              className="flex items-center gap-2 mb-2 pb-1"
              style={{ borderBottom: `1px dashed ${LINE}` }}
            >
              <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: INK }}>
                {category === "all" ? "All Products" : CATEGORIES.find((c) => c.id === category)?.label}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} onAdd={addToCart} added={justAdded === p.id} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div
          className="shrink-0 flex items-center justify-around py-2.5"
          style={{ borderTop: `1.5px solid ${INK}`, background: PAPER }}
        >
          {[
            { id: "home", icon: Home, label: "Home" },
            { id: "trending", icon: TrendingUp, label: "Trending" },
            { id: "search", icon: Search, label: "Search" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex flex-col items-center gap-0.5"
              style={{ color: tab === t.id ? ORANGE : INK }}
            >
              <t.icon size={19} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9 }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Cart drawer */}
        {cartOpen && (
          <div className="absolute inset-0 flex flex-col justify-end" style={{ background: "rgba(23,20,16,0.5)" }}>
            <div
              className="flex flex-col"
              style={{
                background: PAPER,
                borderTop: `2px solid ${INK}`,
                maxHeight: "70%",
                borderRadius: "18px 18px 0 0",
              }}
            >
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px dashed ${LINE}` }}>
                <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: INK }}>
                  YOUR BAG
                </span>
                <button onClick={() => setCartOpen(false)}>
                  <X size={20} color={INK} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-2">
                {cart.length === 0 ? (
                  <p
                    className="py-8 text-center"
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: INK, opacity: 0.6 }}
                  >
                    Bag is empty. Add something trending.
                  </p>
                ) : (
                  cart.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2"
                      style={{ borderBottom: `1px dashed ${LINE}` }}
                    >
                      <span style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 13, color: INK, fontWeight: 600 }}>
                        {p.name}
                      </span>
                      <PriceTag value={p.price} />
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="px-4 py-3" style={{ borderTop: `1px solid ${LINE}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: INK }}>
                      TOTAL
                    </span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: ORANGE }}>
                      ₹{total}
                    </span>
                  </div>
                  <button
                    className="w-full py-3"
                    style={{
                      background: INK,
                      color: PAPER,
                      fontFamily: "'Space Mono', monospace",
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    CHECKOUT · SAME-DAY DELIVERY
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
