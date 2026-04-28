import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface PronunciationPlayerProps {
  text: string;
  phonetic: string;
  size?: "sm" | "md";
}

export function PronunciationPlayer({ text, phonetic, size = "md" }: PronunciationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 0.75>(1);

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    const duration = speed === 0.75 ? 2000 : 1500;
    setTimeout(() => setIsPlaying(false), duration);
  };

  const bars = [3, 5, 8, 6, 10, 7, 4, 9, 6, 5, 8, 4, 7, 5, 3];

  return (
    <div
      className={`inline-flex items-center gap-3 bg-[#C5EEFF] border-2 border-[#1CB0F6]/40 rounded-2xl transition-all ${
        size === "sm" ? "px-3 py-2" : "px-4 py-3"
      }`}
    >
      {/* Play button */}
      <button
        onClick={handlePlay}
        className={`shrink-0 rounded-xl flex items-center justify-center transition-all duration-200 ${
          isPlaying
            ? "bg-[#1CB0F6] scale-105"
            : "bg-white border-2 border-[#1CB0F6]/40 hover:bg-[#1CB0F6] group"
        } ${size === "sm" ? "w-7 h-7" : "w-9 h-9"}`}
        style={isPlaying ? { boxShadow: "0 3px 0 #0A92D0" } : { boxShadow: "0 3px 0 #1CB0F666" }}
      >
        {isPlaying ? (
          <Pause className={`text-white ${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} />
        ) : (
          <Play className={`text-[#1CB0F6] group-hover:text-white ${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} />
        )}
      </button>

      {/* Waveform */}
      <div className="flex items-center gap-0.5 h-6">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-0.5 rounded-full bg-[#1CB0F6]"
            style={{ originY: 0.5 }}
            animate={
              isPlaying
                ? {
                    scaleY: [1, height / 5, 1, height / 7, 1],
                    opacity: [0.5, 1, 0.6, 1, 0.5],
                  }
                : { scaleY: height / 10, opacity: 0.4 }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.5 / speed,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
            initial={{ scaleY: height / 10 }}
          />
        ))}
      </div>

      {/* Text and phonetic */}
      <div className="min-w-0">
        <span
          className={`font-black text-gray-800 block leading-none ${
            size === "sm" ? "text-xs" : "text-sm"
          }`}
        >
          {text}
        </span>
        <span
          className="text-[#0077b6] mt-0.5 block leading-none text-xs font-bold"
          style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
        >
          {phonetic}
        </span>
      </div>

      {/* Speed toggle */}
      <button
        onClick={() => setSpeed(s => s === 1 ? 0.75 : 1)}
        className="shrink-0 text-xs font-black px-2 py-1 rounded-xl border-2 transition-all"
        style={
          speed === 0.75
            ? { backgroundColor: "#1CB0F6", borderColor: "#0A92D0", color: "white", boxShadow: "0 2px 0 #0A92D0" }
            : { backgroundColor: "white", borderColor: "#1CB0F6", color: "#1CB0F6" }
        }
        title="Toggle slow playback"
      >
        {speed === 0.75 ? "0.75×" : "1×"}
      </button>
    </div>
  );
}

