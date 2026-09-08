import React, { useState, useContext } from "react";
import { Star, Gauge, Fuel, Settings, Calendar, Users, User, Zap, MapPin } from "lucide-react";
import ContextComponent from "../context/ContextComponent";

export default function CarDetails() {
  const { carDetails, setLoading } = useContext(ContextComponent);
  const [sellerModal, setSellerModal] = useState(false);
  const [imgFrame, setImgFrame] = useState(carDetails?.image)
  const [seller, setSeller] = useState({ name: '', mobile: '' });

  const getSellerDetails = async (car_id) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/car/carSellerDetails', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ car_id }),
        credentials: 'include'
      });
      const data = await response.json();
      setSeller({ name: data.name, mobile: data.mobile });
      setSellerModal(true);
    } catch (error) {
      console.error("Error fetching seller details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Parse the asking price for the meter — purely a derived display value, no state/logic change.
  const askingPriceNum =
    typeof carDetails?.Expected_price === "number"
      ? carDetails.Expected_price
      : parseFloat(String(carDetails?.Expected_price ?? "").replace(/[^0-9.]/g, ""));

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Car Title */}
        <div className="mb-7">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-serif text-3xl md:text-4xl text-[#14161A] tracking-tight">
              {carDetails?.Model}
            </h1>
            <span className="font-mono text-[11px] tracking-wide uppercase text-[#B8862E] bg-[#B8862E]/10 rounded-full px-3 py-1">
              {carDetails?.Variant}
            </span>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left – Images */}
          <div className="md:col-span-2 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-[#E8E6E1]">
              <img
                src={imgFrame}
                alt="Car Front View"
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <img src={carDetails?.image} onClick={() => setImgFrame(carDetails?.image)} alt="" className="h-28 w-full object-cover rounded-xl border border-[#E8E6E1] hover:opacity-80 transition-opacity cursor-pointer" />
              {carDetails?.images?.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`Car additional view ${i + 1}`}
                  onClick={() => setImgFrame(img.url)}
                  className="h-28 w-full object-cover rounded-xl border border-[#E8E6E1] hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Right – Pricing + AI Price Preview */}
          <div className="bg-white rounded-2xl border border-[#E8E6E1] p-6 h-fit sticky top-20">
            <p className="font-mono text-[11px] uppercase tracking-wide text-[#6B6D72] mb-1">Asking price</p>
            <h2 className="font-serif text-3xl text-[#14161A] mb-5">
              ₹ {carDetails?.Expected_price}
            </h2>

            {/* AI Estimated Price + Positioning Meter */}
            <div className="rounded-xl bg-[#FAFAF7] border border-[#E8E6E1] p-4 mb-5">
              <p className="text-sm font-medium text-[#14161A] mb-3">AI Estimated Market Value</p>
              {carDetails?.priceRange ? (
                <>
                  <p className="text-lg font-semibold text-[#14161A] mb-4">
                    ₹{carDetails.priceRange.lowerBound.toLocaleString("en-IN")} – ₹{carDetails.priceRange.upperBound.toLocaleString("en-IN")}
                  </p>
                  <PriceMeter
                    price={askingPriceNum}
                    low={carDetails.priceRange.lowerBound}
                    high={carDetails.priceRange.upperBound}
                  />
                </>
              ) : (
                <p className="text-[#6B6D72] text-sm">Analyzing configuration & specs…</p>
              )}
            </div>

            {/* CTA Buttons */}
            <button
              className="w-full bg-[#14161A] hover:bg-[#B8862E] text-white font-medium py-3 rounded-xl transition-colors duration-300"
              onClick={() => getSellerDetails(carDetails?._id)}
            >
              Get seller details
            </button>
          </div>
        </div>

        {/* Seller Details Modal */}
        {sellerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <button
                onClick={() => setSellerModal(false)}
                className="absolute right-5 top-5 text-[#6B6D72] hover:text-[#14161A] transition-colors"
              >
                ✕
              </button>

              <h2 className="font-serif mb-5 text-xl text-[#14161A]">
                Seller details
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between border-b border-[#E8E6E1] pb-2">
                  <span className="text-sm text-[#6B6D72]">Name</span>
                  <span className="font-medium text-[#14161A]">{seller.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E6E1] pb-2">
                  <span className="text-sm text-[#6B6D72]">Mobile</span>
                  <span className="font-mono font-medium text-[#14161A]">{seller.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B6D72]">City</span>
                  <span className="font-medium text-[#14161A]">{carDetails?.City}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">

                <a href={`tel:${seller.mobile}`}
                className="flex-1 rounded-xl bg-[#2F6B52] py-2.5 text-center text-white font-medium hover:bg-[#26583F] transition-colors"
                >
                  📞 Call
                </a>

                <a href={`https://wa.me/${seller.mobile}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-xl bg-[#25D366] py-2.5 text-center text-white font-medium hover:bg-[#1FB959] transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Specifications */}
        <div className="mt-12">
          <h2 className="font-serif text-2xl text-[#14161A] mb-4">Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Spec icon={<Fuel />} label="Fuel Type" value={carDetails?.Fuel_type} />
            <Spec icon={<Settings />} label="Transmission" value={carDetails?.Transmission} />
            <Spec icon={<Calendar />} label="Model Year" value={carDetails?.Reg_year} />
            <Spec icon={<Gauge />} label="KM Driven" value={carDetails?.KM} />
            <Spec icon={<Users />} label="Seating capcity" value={carDetails?.Seating_capacity} />
            <Spec icon={<User />} label="Owner type" value={carDetails?.Owner_type} />
            <Spec icon={<Zap />} label="Engine Capacity" value={`${carDetails?.Engine_capacity} CC`} />
            <Spec icon={<Gauge />} label="Max Power" value={`${carDetails?.Max_power} bhp`} />
            <Spec icon={<MapPin />} label="City" value={carDetails?.City} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E8E6E1] hover:border-[#B8862E]/40 transition-colors">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#B8862E]/10 text-[#B8862E] shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wide text-[#6B6D72]">{label}</p>
        <p className="font-semibold text-[#14161A]">{value}</p>
      </div>
    </div>
  );
}

// Pure presentational gauge — no fetches, no context, no field renaming.
// Pure presentational gauge — no fetches, no context, no field renaming.
// Pure presentational gauge — no fetches, no context, no field renaming.
function PriceMeter({ price, low, high }) {
  if (!price || !low || !high || Number.isNaN(price)) return null;

  const GREEN = "#2F6B52";
  const YELLOW = "#B8862E";
  const RED = "#A65A45";

  const padding = (high - low) * 0.45 || high * 0.15;
  const rangeMin = Math.max(0, low - padding);
  const rangeMax = high + padding;
  const span = rangeMax - rangeMin || 1;

  // Interpolate between two hex colors, t in [0,1]
  const lerpColor = (a, b, t) => {
    const ah = parseInt(a.slice(1), 16), bh = parseInt(b.slice(1), 16);
    const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
    const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
    const rr = Math.round(ar + (br - ar) * t);
    const rg = Math.round(ag + (bg - ag) * t);
    const rb = Math.round(ab + (bb - ab) * t);
    return `#${((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1)}`;
  };

  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const valueToAngle = (t) => 180 - t * 180;

  const rawT = (price - rangeMin) / span;
  // Keep the needle a few degrees short of either end so it never looks
  // "stuck" at the tip, even for an extreme outlier price.
  const needleT = Math.min(0.96, Math.max(0.04, rawT));
  const priceAngle = valueToAngle(needleT);

  const lowT = clamp01((low - rangeMin) / span);
  const highT = clamp01((high - rangeMin) / span);
  const lowAngle = valueToAngle(lowT);
  const highAngle = valueToAngle(highT);

  let verdict = "Fair price";
  let verdictColor = YELLOW;
  if (price < low) {
    verdict = "Great deal";
    verdictColor = GREEN;
  } else if (price > high) {
    verdict = "Above market";
    verdictColor = RED;
  } else {
    // Within range: color slides from green (at low) to yellow (at high)
    const withinT = high === low ? 0 : (price - low) / (high - low);
    verdictColor = lerpColor(GREEN, YELLOW, clamp01(withinT));
  }

  const fmt = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  // --- SVG geometry helpers ---
  const cx = 120, cy = 118, r = 88, sw = 16;
  const polar = (radius, angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) };
  };
  const arcPath = (radius, startAngle, endAngle) => {
    const s = polar(radius, startAngle);
    const e = polar(radius, endAngle);
    const largeArc = startAngle - endAngle <= 180 ? 0 : 1;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  // Zone 2 (low → high) as a smooth green→yellow gradient, built from
  // small colored arc segments since SVG can't gradient *along* an arc directly.
  const ZONE2_SEGMENTS = 20;
  const zone2Segments = Array.from({ length: ZONE2_SEGMENTS }, (_, i) => {
    const t0 = i / ZONE2_SEGMENTS;
    const t1 = (i + 1) / ZONE2_SEGMENTS;
    const a0 = lowAngle + (highAngle - lowAngle) * t0;
    const a1 = lowAngle + (highAngle - lowAngle) * t1;
    return { path: arcPath(r, a0, a1), color: lerpColor(GREEN, YELLOW, (t0 + t1) / 2) };
  });

  const needleLen = r - 14;
  const needleTip = polar(needleLen, priceAngle);
  const needleBaseL = polar(7, priceAngle + 90);
  const needleBaseR = polar(7, priceAngle - 90);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[10px] uppercase tracking-wide text-[#6B6D72]">
          Price positioning
        </p>
        <span
          className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full"
          style={{ color: verdictColor, backgroundColor: `${verdictColor}17`, border: `1px solid ${verdictColor}33` }}
        >
          {verdict}
        </span>
      </div>

      <svg viewBox="0 0 240 145" className="w-full" style={{ maxHeight: "170px" }}>
        {/* Below-range zone: solid green */}
        <path d={arcPath(r, 180, lowAngle)} fill="none" stroke={GREEN} strokeWidth={sw} opacity={0.85} />

        {/* In-range zone: green → yellow gradient */}
        {zone2Segments.map((seg, i) => (
          <path key={i} d={seg.path} fill="none" stroke={seg.color} strokeWidth={sw} opacity={0.85} />
        ))}

        {/* Above-range zone: solid red */}
        <path d={arcPath(r, highAngle, 0)} fill="none" stroke={RED} strokeWidth={sw} opacity={0.85} />

        {/* Boundary ticks at low/high */}
        {[lowAngle, highAngle].map((a, i) => {
          const inner = polar(r - sw / 2 - 3, a);
          const outer = polar(r + sw / 2 + 5, a);
          return (
            <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="#FAFAF7" strokeWidth={3} />
          );
        })}

        {/* Boundary value labels */}
        <text x={polar(r + 20, lowAngle).x} y={polar(r + 20, lowAngle).y} textAnchor="middle" className="font-mono" fontSize="9" fill="#6B6D72">
          {fmt(low)}
        </text>
        <text x={polar(r + 20, highAngle).x} y={polar(r + 20, highAngle).y} textAnchor="middle" className="font-mono" fontSize="9" fill="#6B6D72">
          {fmt(high)}
        </text>

        {/* Needle */}
        <polygon
          points={`${needleTip.x},${needleTip.y} ${needleBaseL.x},${needleBaseL.y} ${needleBaseR.x},${needleBaseR.y}`}
          fill="#14161A"
          style={{ transition: "all 0.7s ease-out" }}
        />
        <circle cx={cx} cy={cy} r={9} fill="#14161A" />
        <circle cx={cx} cy={cy} r={4} fill={verdictColor} />
      </svg>

      {/* Price readout, centered under the gauge */}
      <div className="text-center -mt-2">
        <p className="font-serif text-xl text-[#14161A]">{fmt(price)}</p>
        <p className="font-mono text-[9px] uppercase tracking-wide text-[#6B6D72]">Asking price</p>
      </div>
    </div>
  );
}