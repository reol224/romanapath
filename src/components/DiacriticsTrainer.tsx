import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Delete, Check, ChevronRight, RotateCcw } from "lucide-react";
import { diacriticsExercises } from "@/data/extras";

interface DiacriticsTrainerProps {
  isOpen: boolean;
  onClose: () => void;
  onCorrect?: () => void;
}

const DIACRITIC_KEYS = [
  { char: "ă", label: "ă" },
  { char: "â", label: "â" },
  { char: "î", label: "î" },
  { char: "ș", label: "ș" },
  { char: "ț", label: "ț" },
  { char: "Ă", label: "Ă" },
  { char: "Â", label: "Â" },
  { char: "Î", label: "Î" },
  { char: "Ș", label: "Ș" },
  { char: "Ț", label: "Ț" },
];

export function DiacriticsTrainer({ isOpen, onClose, onCorrect }: DiacriticsTrainerProps) {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const exercise = diacriticsExercises[current];

  const insertDiacritic = (char: string) => {
    const el = inputRef.current;
    if (!el) return;
    const start = el.selectionStart ?? input.length;
    const end = el.selectionEnd ?? input.length;
    const newVal = input.slice(0, start) + char + input.slice(end);
    setInput(newVal);
    setTimeout(() => {
      el.setSelectionRange(start + 1, start + 1);
      el.focus();
    }, 0);
  };

  const handleSubmit = useCallback(() => {
    if (submitted || !input.trim()) return;
    const isCorrect = input.trim().toLowerCase() === exercise.answer.toLowerCase();
    setCorrect(isCorrect);
    setSubmitted(true);
    setTotal(t => t + 1);
    if (isCorrect) {
      setScore(s => s + 1);
      onCorrect?.();
    }
  }, [input, submitted, exercise.answer, onCorrect]);

  const handleNext = () => {
    setSubmitted(false);
    setInput("");
    setCorrect(false);
    setCurrent(c => (c + 1) % diacriticsExercises.length);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const reset = () => {
    setScore(0);
    setTotal(0);
    setCurrent(0);
    setInput("");
    setSubmitted(false);
    setCorrect(false);
  };

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
        className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "#F5EFE0", border: "1px solid rgba(139,26,26,0.15)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(30,26,22,0.1)" }}>
          <div>
            <h2 className="font-bold text-xl" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>Diacritics Trainer</h2>
            <p className="text-xs mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>Type ă â î ș ț correctly</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold" style={{ color: "#2D5A27" }}>
              {score}/{total}
            </span>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 transition-colors">
              <X className="w-5 h-5" style={{ color: "#1E1A16" }} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Progress dots */}
          <div className="flex gap-1.5 mb-5">
            {diacriticsExercises.map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full transition-all"
                style={{ backgroundColor: i < current ? "#8B1A1A" : i === current ? "#C9922A" : "rgba(30,26,22,0.15)" }}
              />
            ))}
          </div>

          {/* Exercise */}
          <div className="rounded-xl p-5 mb-4" style={{ backgroundColor: "rgba(139,26,26,0.04)", border: "1px solid rgba(139,26,26,0.12)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "#1E1A16", opacity: 0.6 }}>
              {current + 1} of {diacriticsExercises.length}
            </p>
            <p className="text-lg font-semibold mb-1" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>
              {exercise.prompt}
            </p>
            {exercise.hint && (
              <p className="text-sm" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#8B1A1A" }}>
                Hint: {exercise.hint}
              </p>
            )}
          </div>

          {/* Input */}
          <div className="relative mb-3">
            <input
              ref={inputRef}
              value={input}
              onChange={e => { if (!submitted) setInput(e.target.value); }}
              onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
              placeholder="Type your answer here…"
              className="w-full px-4 py-3 rounded-xl text-lg outline-none transition-all"
              style={{
                backgroundColor: submitted
                  ? correct ? "rgba(45,90,39,0.08)" : "rgba(139,26,26,0.06)"
                  : "white",
                border: submitted
                  ? `2px solid ${correct ? "#2D5A27" : "#8B1A1A"}`
                  : "2px solid rgba(30,26,22,0.15)",
                fontFamily: "IBM Plex Mono, monospace",
                color: "#1E1A16",
              }}
              autoFocus
            />
            {submitted && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {correct
                  ? <Check className="w-5 h-5" style={{ color: "#2D5A27" }} />
                  : <X className="w-5 h-5" style={{ color: "#8B1A1A" }} />}
              </div>
            )}
          </div>

          {/* Diacritic keyboard */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {DIACRITIC_KEYS.map(({ char, label }) => (
              <button
                key={char}
                onClick={() => insertDiacritic(char)}
                className="w-10 h-10 rounded-lg font-bold text-base transition-all hover:opacity-80 active:scale-95"
                style={{
                  backgroundColor: "#1E1A16",
                  color: "#F5EFE0",
                  fontFamily: "IBM Plex Mono, monospace",
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setInput(i => i.slice(0, -1))}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:bg-black/10"
              style={{ backgroundColor: "rgba(30,26,22,0.1)", color: "#1E1A16" }}
            >
              <Delete className="w-4 h-4" />
            </button>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-xl p-4 mb-4"
                style={{
                  backgroundColor: correct ? "rgba(45,90,39,0.08)" : "rgba(139,26,26,0.06)",
                  border: `1px solid ${correct ? "rgba(45,90,39,0.2)" : "rgba(139,26,26,0.2)"}`,
                }}
              >
                {!correct && (
                  <p className="text-sm font-bold mb-1" style={{ color: "#8B1A1A" }}>
                    Correct answer: <span style={{ fontFamily: "IBM Plex Mono, monospace" }}>{exercise.answer}</span>
                  </p>
                )}
                {correct && (
                  <p className="text-sm font-bold mb-1" style={{ color: "#2D5A27" }}>✓ Correct!</p>
                )}
                <p className="text-sm" style={{ color: "#1E1A16", opacity: 0.7 }}>{exercise.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: "#8B1A1A", color: "#F5EFE0" }}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#1E1A16", color: "#F5EFE0" }}
            >
              Next Exercise <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button onClick={reset} className="w-full mt-2 py-1.5 text-xs opacity-30 hover:opacity-60 transition-opacity flex items-center justify-center gap-1.5" style={{ color: "#1E1A16" }}>
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
