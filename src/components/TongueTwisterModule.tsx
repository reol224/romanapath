import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, ChevronRight, Volume2, CheckCircle2 } from "lucide-react";
import { tongueTwisters, TongueTwister } from "@/data/extras";

interface TongueTwisterModuleProps {
  isOpen: boolean;
  onClose: () => void;
}

const difficultyConfig = {
  easy: { label: "Easy", color: "#58CC02", bg: "#E6F9E8", shadow: "#46A302" },
  medium: { label: "Medium", color: "#FF9600", bg: "#FFF3DC", shadow: "#CC7700" },
  hard: { label: "Hard", color: "#FF4B4B", bg: "#FFECEC", shadow: "#CC2A2A" },
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
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 0 #E5E5E5, 0 0 0 2px #E5E5E5" }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "2px solid #F0F0F0" }}>
          <div>
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
              👅 Tongue Twisters
            </h2>
            <p className="text-sm font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
              Drill difficult Romanian sounds with speed
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
            <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
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
                className="px-3 py-1.5 rounded-full text-xs font-black transition-all border-2"
                style={{
                  backgroundColor: current === i ? cfg.color : "white",
                  color: current === i ? "white" : cfg.color,
                  borderColor: cfg.color,
                  fontFamily: "Nunito, sans-serif",
                  boxShadow: current === i ? `0 3px 0 ${cfg.shadow}` : "0 3px 0 #E5E5E5",
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
          <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-black border-2"
                  style={{
                    backgroundColor: difficultyConfig[twister.difficulty].bg,
                    color: difficultyConfig[twister.difficulty].color,
                    borderColor: difficultyConfig[twister.difficulty].color,
                    fontFamily: "Nunito, sans-serif",
                  }}
                >
                  {difficultyConfig[twister.difficulty].label}
                </span>
                <span className="text-xs font-black px-2 py-0.5 rounded-xl border-2" style={{ fontFamily: "Nunito, sans-serif", backgroundColor: "white", borderColor: "#E5E5E5", color: "#FF4B4B" }}>
                  Focus: {twister.focusSound}
                </span>
              </div>
              {completed.has(current) && (
                <CheckCircle2 className="w-5 h-5" style={{ color: "#58CC02" }} />
              )}
            </div>

            {/* Word-by-word highlighted text */}
            <p className="text-2xl leading-relaxed mb-3 font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
              {words.map((word, i) => (
                <span
                  key={i}
                  className="transition-all duration-150"
                  style={{
                    color: highlightIdx === i ? "#1CB0F6" : "#3C3C3C",
                    fontWeight: highlightIdx === i ? 900 : 700,
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
                  <p className="text-sm mb-1 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#1CB0F6" }}>
                    {twister.phonetic}
                  </p>
                  <p className="text-sm font-bold italic" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                    {twister.english}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowPhonetic(s => !s)}
              className="text-xs mt-2 font-black underline transition-opacity hover:opacity-70"
              style={{ fontFamily: "Nunito, sans-serif", color: "#1CB0F6" }}
            >
              {showPhonetic ? "Hide" : "Show"} phonetics & translation
            </button>
          </div>

          {/* Speed controls */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Speed:</span>
            {(["slow", "normal", "fast"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className="px-3 py-1 rounded-full text-xs font-black border-2 transition-all capitalize"
                style={{
                  backgroundColor: speed === s ? "#FF9600" : "white",
                  color: speed === s ? "white" : "#AFAFAF",
                  borderColor: speed === s ? "#FF9600" : "#E5E5E5",
                  fontFamily: "Nunito, sans-serif",
                  boxShadow: speed === s ? "0 3px 0 #CC7700" : "0 3px 0 #E5E5E5",
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
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm transition-all"
                style={{ backgroundColor: "#58CC02", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #46A302" }}
              >
                <Volume2 className="w-4 h-4" />
                Practice Now
              </button>
            ) : (
              <button
                onClick={stopPractice}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm transition-all"
                style={{ backgroundColor: "#FF4B4B", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #CC2A2A" }}
              >
                <RefreshCw className="w-4 h-4" />
                Stop
              </button>
            )}
            <button
              onClick={() => setCurrent(c => (c + 1) % tongueTwisters.length)}
              className="px-4 py-3 rounded-2xl border-2 font-black text-sm flex items-center gap-1 transition-all"
              style={{ borderColor: "#1CB0F6", color: "#1CB0F6", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #0A90D0" }}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {attempts[current] > 0 && (
            <p className="text-center text-xs mt-3 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
              Practiced {attempts[current]}× today
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
