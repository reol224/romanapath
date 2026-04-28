import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, BookOpen } from "lucide-react";
import { proverbs } from "@/data/extras";

interface ProverbsSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const themeColors: Record<string, { color: string; bg: string }> = {
  Character: { color: "#8B1A1A", bg: "#F9E8E8" },
  Patience: { color: "#C9922A", bg: "#FFF3DC" },
  Communication: { color: "#1A3A6B", bg: "#E3EAF9" },
  "Hard Work": { color: "#2D5A27", bg: "#E8F5E3" },
  Caution: { color: "#C9922A", bg: "#FFF3DC" },
  Friendship: { color: "#8B1A1A", bg: "#F9E8E8" },
  Honesty: { color: "#2D5A27", bg: "#E8F5E3" },
  Consequences: { color: "#1A3A6B", bg: "#E3EAF9" },
};

export function ProverbsSection({ isOpen, onClose }: ProverbsSectionProps) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const proverb = proverbs[current];
  const tc = themeColors[proverb.theme] || { color: "#8B1A1A", bg: "#F9E8E8" };

  const prev = () => { setCurrent(c => (c - 1 + proverbs.length) % proverbs.length); setExpanded(false); };
  const next = () => { setCurrent(c => (c + 1) % proverbs.length); setExpanded(false); };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-xl rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 0 #E5E5E5, 0 0 0 2px #E5E5E5" }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "2px solid #F0F0F0" }}>
          <div>
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>📜 Romanian Proverbs</h2>
            <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Wisdom of the Romanian folk tradition</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
            <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
          </button>
        </div>

        <div className="p-6">
          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mb-5">
            {proverbs.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setExpanded(false); }}
                className="rounded-full transition-all"
                style={{
                  width: i === current ? "20px" : "8px",
                  height: "8px",
                  backgroundColor: i === current ? "#1CB0F6" : "#F0F0F0",
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Theme badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-black border-2" style={{ fontFamily: "Nunito, sans-serif", backgroundColor: tc.bg, color: tc.color, borderColor: tc.color }}>
                  {proverb.theme}
                </span>
                <span className="text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                  {current + 1} / {proverbs.length}
                </span>
              </div>

              {/* Romanian text */}
              <div
                className="rounded-2xl p-6 mb-4 relative overflow-hidden"
                style={{ backgroundColor: "#1CB0F6", border: "2px solid #0A90D0", boxShadow: "0 6px 0 #0A90D0" }}
              >
                {/* Folk pattern accent */}
                <svg className="absolute top-2 right-2 opacity-20" width="60" height="16" viewBox="0 0 80 16">
                  <path d="M0 8 L5 3 L10 8 L15 3 L20 8 L25 3 L30 8 L35 3 L40 8 L45 3 L50 8 L55 3 L60 8 L65 3 L70 8 L75 3 L80 8"
                    stroke="white" strokeWidth="2" fill="none" />
                </svg>
                <p className="text-xl leading-relaxed mb-3 font-black" style={{ fontFamily: "Nunito, sans-serif", color: "white" }}>
                  "{proverb.romanian}"
                </p>
                <p className="text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "rgba(255,255,255,0.8)" }}>
                  {proverb.phonetic}
                </p>
              </div>

              {/* Translations */}
              <div className="space-y-2 mb-4">
                <div className="flex gap-3 items-start p-3 rounded-2xl" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
                  <span className="text-xs font-black px-2 py-0.5 rounded-lg shrink-0 mt-0.5" style={{ fontFamily: "Nunito, sans-serif", backgroundColor: "#E5E5E5", color: "#AFAFAF" }}>Literal</span>
                  <p className="text-sm font-bold italic" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>{proverb.literal}</p>
                </div>
                <div className="flex gap-3 items-start p-3 rounded-2xl" style={{ backgroundColor: tc.bg, border: `2px solid ${tc.color}` }}>
                  <span className="text-xs font-black px-2 py-0.5 rounded-lg shrink-0 mt-0.5" style={{ fontFamily: "Nunito, sans-serif", backgroundColor: tc.color, color: "white" }}>Meaning</span>
                  <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: tc.color }}>{proverb.idiomatic}</p>
                </div>
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: "white", border: "2px solid #E5E5E5" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4" style={{ color: "#1CB0F6" }} />
                        <span className="text-xs font-black uppercase tracking-wider" style={{ fontFamily: "Nunito, sans-serif", color: "#1CB0F6" }}>Context</span>
                      </div>
                      <p className="text-sm font-bold leading-relaxed" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF", lineHeight: 1.75 }}>
                        {proverb.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setExpanded(e => !e)}
                className="w-full text-center text-xs mb-4 font-black underline transition-opacity hover:opacity-70"
                style={{ fontFamily: "Nunito, sans-serif", color: "#1CB0F6" }}
              >
                {expanded ? "Hide" : "Show"} cultural context
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="flex-1 py-3 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all"
              style={{ borderColor: "#E5E5E5", color: "#AFAFAF", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #E5E5E5" }}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={next}
              className="flex-1 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: "#1CB0F6", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #0A90D0" }}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
