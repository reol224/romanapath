import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

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
    // Simulate audio playback duration
    const duration = speed === 0.75 ? 2000 : 1500;
    setTimeout(() => setIsPlaying(false), duration);
  };

  const bars = [3, 5, 8, 6, 10, 7, 4, 9, 6, 5, 8, 4, 7, 5, 3];

  return (
    <div
      className={`inline-flex items-center gap-3 bg-[#8B1A1A]/5 border border-[#8B1A1A]/15 rounded-xl transition-all ${
        size === "sm" ? "px-3 py-2" : "px-4 py-3"
      }`}
    >
      {/* Play button */}
      <button
        onClick={handlePlay}
        className={`shrink-0 rounded-full flex items-center justify-center transition-all duration-200 ${
          isPlaying
            ? "bg-[#8B1A1A] shadow-lg scale-105"
            : "bg-[#8B1A1A]/15 hover:bg-[#8B1A1A] hover:text-white group"
        } ${size === "sm" ? "w-7 h-7" : "w-9 h-9"}`}
      >
        {isPlaying ? (
          <Pause className={`text-white ${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} />
        ) : (
          <Play className={`text-[#8B1A1A] group-hover:text-white ${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} />
        )}
      </button>

      {/* Waveform */}
      <div className="flex items-center gap-0.5 h-6">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-0.5 rounded-full bg-[#8B1A1A]"
            style={{ originY: 0.5 }}
            animate={
              isPlaying
                ? {
                    scaleY: [1, height / 5, 1, height / 7, 1],
                    opacity: [0.4, 0.9, 0.5, 1, 0.4],
                  }
                : { scaleY: height / 10, opacity: 0.25 }
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
          className={`font-semibold text-[#1E1A16] block leading-none ${
            size === "sm" ? "text-xs" : "text-sm"
          }`}
        >
          {text}
        </span>
        <span
          className={`text-[#8B1A1A]/70 mt-0.5 block leading-none ${
            size === "sm" ? "text-xs" : "text-xs"
          }`}
          style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
        >
          {phonetic}
        </span>
      </div>

      {/* Speed toggle */}
      <button
        onClick={() => setSpeed(s => s === 1 ? 0.75 : 1)}
        className={`shrink-0 text-xs font-mono px-1.5 py-0.5 rounded border transition-colors ${
          speed === 0.75
            ? "bg-[#8B1A1A]/10 border-[#8B1A1A]/30 text-[#8B1A1A] font-bold"
            : "border-[#1E1A16]/15 text-[#1E1A16]/40 hover:border-[#8B1A1A]/30 hover:text-[#8B1A1A]"
        }`}
        title="Toggle slow playback"
      >
        {speed === 0.75 ? "0.75×" : "1×"}
      </button>
    </div>
  );
}
