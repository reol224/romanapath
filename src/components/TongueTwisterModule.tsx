import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, ChevronRight, Volume2, CheckCircle2 } from "lucide-react";
import { tongueTwisters, TongueTwister } from "@/data/extras";

interface TongueTwisterModuleProps {
  isOpen: boolean;
  onClose: () => void;
}

const difficultyConfig = {
  easy: { label: "Easy", color: "#2D5A27", bg: "#E8F5E3" },
  medium: { label: "Medium", color: "#C9922A", bg: "#FFF3DC" },
  hard: { label: "Hard", color: "#8B1A1A", bg: "#F9E8E8" },
};

export function TongueTwisterModule({ isOpen, onClose }: TongueTwisterModuleProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<"slow" | "normal" | "fast">("slow");
  const [attempts, setAttempts] = useState<number[]>([]);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [showPhonetic, setShowPhonetic] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [highlightIdx, setHighlightIdx] = useState(-1);

  const twister: TongueTwister = tongueTwisters[current];
  const words = twister.text.split(" ");
  const speedMs = speed === "slow" ? 700 : speed === "normal" ? 450 : 250;

  const startPractice = () => {
    setIsPlaying(true);
    setHighlightIdx(0);
    setAttempts(a => {
      const next = [...a];
      next[current] = (next[current] || 0) + 1;
      return next;
    });
    intervalRef.current = setInterval(() => {
      setHighlightIdx(prev => {
        if (prev >= words.length - 1) {
          clearInterval(intervalRef.current!);
          setIsPlaying(false);
          setCompleted(c => new Set([...c, current]));
          return -1;
        }
        return prev + 1;
      });
    }, speedMs);
  };

  const stopPractice = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
    setHighlightIdx(-1);
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    stopPractice();
    setShowPhonetic(false);
  }, [current]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(30,26,22,0.7)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "#F5EFE0", border: "1px solid rgba(139,26,26,0.15)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(30,26,22,0.1)" }}>
          <div>
            <h2 className="font-bold text-xl" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>
              Tongue Twisters
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "#1E1A16", opacity: 0.55 }}>
              Drill difficult Romanian sounds with speed
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 transition-colors">
            <X className="w-5 h-5" style={{ color: "#1E1A16" }} />
          </button>
        </div>

        {/* Twister selector */}
        <div className="px-6 pt-4 flex gap-2 flex-wrap">
          {tongueTwisters.map((tt, i) => {
            const cfg = difficultyConfig[tt.difficulty];
            const isDone = completed.has(i);
            return (
              <button
                key={tt.id}
                onClick={() => setCurrent(i)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all border"
                style={{
                  backgroundColor: current === i ? cfg.color : cfg.bg,
                  color: current === i ? "#F5EFE0" : cfg.color,
                  borderColor: cfg.color,
                  opacity: isDone && current !== i ? 0.7 : 1,
                }}
              >
                {isDone && "✓ "}{tt.title}
              </button>
            );
          })}
        </div>

        {/* Main card */}
        <div className="p-6">
          <div className="rounded-xl p-5 mb-4" style={{ backgroundColor: "rgba(139,26,26,0.04)", border: "1px solid rgba(139,26,26,0.12)" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: difficultyConfig[twister.difficulty].bg,
                    color: difficultyConfig[twister.difficulty].color,
                  }}
                >
                  {difficultyConfig[twister.difficulty].label}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(30,26,22,0.07)", color: "#8B1A1A" }}>
                  Focus: {twister.focusSound}
                </span>
              </div>
              {completed.has(current) && (
                <CheckCircle2 className="w-5 h-5" style={{ color: "#2D5A27" }} />
              )}
            </div>

            {/* Word-by-word highlighted text */}
            <p className="text-2xl leading-relaxed mb-3" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>
              {words.map((word, i) => (
                <span
                  key={i}
                  className="transition-all duration-150"
                  style={{
                    color: highlightIdx === i ? "#8B1A1A" : "#1E1A16",
                    fontWeight: highlightIdx === i ? 700 : 400,
                    textDecoration: highlightIdx === i ? "underline" : "none",
                  }}
                >
                  {word}{" "}
                </span>
              ))}
            </p>

            <AnimatePresence>
              {showPhonetic && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm mb-1" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#8B1A1A" }}>
                    {twister.phonetic}
                  </p>
                  <p className="text-sm italic" style={{ color: "#1E1A16", opacity: 0.6 }}>
                    {twister.english}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowPhonetic(s => !s)}
              className="text-xs mt-2 underline transition-opacity hover:opacity-70"
              style={{ color: "#8B1A1A" }}
            >
              {showPhonetic ? "Hide" : "Show"} phonetics & translation
            </button>
          </div>

          {/* Speed controls */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium" style={{ color: "#1E1A16", opacity: 0.7 }}>Speed:</span>
            {(["slow", "normal", "fast"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className="px-3 py-1 rounded-full text-xs font-semibold border transition-all capitalize"
                style={{
                  backgroundColor: speed === s ? "#8B1A1A" : "transparent",
                  color: speed === s ? "#F5EFE0" : "#8B1A1A",
                  borderColor: "#8B1A1A",
                }}
              >
                {s === "slow" ? "🐢 Slow" : s === "normal" ? "🚶 Normal" : "⚡ Fast"}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {!isPlaying ? (
              <button
                onClick={startPractice}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#8B1A1A", color: "#F5EFE0" }}
              >
                <Volume2 className="w-4 h-4" />
                Practice Now
              </button>
            ) : (
              <button
                onClick={stopPractice}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#1E1A16", color: "#F5EFE0" }}
              >
                <RefreshCw className="w-4 h-4" />
                Stop
              </button>
            )}
            <button
              onClick={() => setCurrent(c => (c + 1) % tongueTwisters.length)}
              className="px-4 py-3 rounded-xl border font-semibold text-sm flex items-center gap-1 transition-all hover:bg-black/5"
              style={{ borderColor: "#8B1A1A", color: "#8B1A1A" }}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {attempts[current] > 0 && (
            <p className="text-center text-xs mt-3" style={{ color: "#1E1A16", opacity: 0.5 }}>
              Practiced {attempts[current]}× today
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
