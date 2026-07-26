import { Link } from "react-router-dom";
import React from "react";
import { IndianRupee, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export default function SellCarBox() {
    return (
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
            <div className="relative flex flex-col lg:h-full justify-between gap-6 bg-[#14161A] rounded-2xl overflow-hidden px-6 py-7 lg:px-7 lg:py-8">

                {/* decorative glow */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 bg-[#B8862E]/20 rounded-full blur-3xl"></div>

                <div className="relative">
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8862E] mb-3">Sell in minutes</p>
                    <h2 className="font-serif text-2xl lg:text-3xl text-white leading-snug mb-3">
                        Want to Sell Your Car?
                    </h2>
                    <p className="text-sm text-white/60 leading-relaxed">
                        Get the best price with instant valuation, verified buyers, and a hassle-free process.
                    </p>
                </div>

                {/* Feature list — fills the vertical rail on large screens */}
                <div className="relative space-y-5 hidden lg:block">
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                            <IndianRupee size={17} className="text-[#B8862E]" strokeWidth={1.75} />
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Instant valuation</p>
                            <p className="text-white/50 text-xs mt-0.5">Know your car's worth in seconds</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                            <ShieldCheck size={17} className="text-[#B8862E]" strokeWidth={1.75} />
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Verified buyers</p>
                            <p className="text-white/50 text-xs mt-0.5">Only genuine, checked buyers reach out</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                            <Clock size={17} className="text-[#B8862E]" strokeWidth={1.75} />
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Sell in a few days</p>
                            <p className="text-white/50 text-xs mt-0.5">Most cars find a buyer fast</p>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <Link to={'/carlisting'} className="relative">
                    <button className="w-full flex items-center justify-center gap-2 bg-[#B8862E] text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-[#8F6821] transition-colors">
                        Sell Car
                        <ArrowRight size={16} strokeWidth={2} />
                    </button>
                </Link>
            </div>
        </div>
    );
}