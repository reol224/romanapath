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
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 0 #E5E5E5, 0 0 0 2px #E5E5E5" }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "2px solid #F0F0F0" }}>
          <div>
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>✍️ Diacritics Trainer</h2>
            <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Type ă â î ș ț correctly</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#58CC02" }}>
              {score}/{total}
            </span>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
              <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Progress dots */}
          <div className="flex gap-1.5 mb-5">
            {diacriticsExercises.map((_, i) => (
              <div
                key={i}
                className="h-2 flex-1 rounded-full transition-all"
                style={{ backgroundColor: i < current ? "#58CC02" : i === current ? "#FF9600" : "#F0F0F0" }}
              />
            ))}
          </div>

          {/* Exercise */}
          <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
            <p className="text-xs font-black mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
              {current + 1} of {diacriticsExercises.length}
            </p>
            <p className="text-lg font-black mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
              {exercise.prompt}
            </p>
            {exercise.hint && (
              <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#1CB0F6" }}>
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
              className="w-full px-4 py-3 rounded-2xl text-lg outline-none transition-all font-bold"
              style={{
                backgroundColor: submitted
                  ? correct ? "#E6F9E8" : "#FFECEC"
                  : "white",
                border: submitted
                  ? `2px solid ${correct ? "#58CC02" : "#FF4B4B"}`
                  : "2px solid #E5E5E5",
                fontFamily: "Nunito, sans-serif",
                color: "#3C3C3C",
              }}
              autoFocus
            />
            {submitted && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {correct
                  ? <Check className="w-5 h-5" style={{ color: "#58CC02" }} />
                  : <X className="w-5 h-5" style={{ color: "#FF4B4B" }} />}
              </div>
            )}
          </div>

          {/* Diacritic keyboard */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {DIACRITIC_KEYS.map(({ char, label }) => (
              <button
                key={char}
                onClick={() => insertDiacritic(char)}
                className="w-10 h-10 rounded-xl font-black text-base transition-all active:scale-95"
                style={{
                  backgroundColor: "#1CB0F6",
                  color: "white",
                  fontFamily: "Nunito, sans-serif",
                  border: "2px solid #0A90D0",
                  boxShadow: "0 3px 0 #0A90D0",
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setInput(i => i.slice(0, -1))}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5", color: "#AFAFAF", boxShadow: "0 3px 0 #E5E5E5" }}
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
                className="rounded-2xl p-4 mb-4"
                style={{
                  backgroundColor: correct ? "#E6F9E8" : "#FFECEC",
                  border: `2px solid ${correct ? "#58CC02" : "#FF4B4B"}`,
                }}
              >
                {!correct && (
                  <p className="text-sm font-black mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#FF4B4B" }}>
                    Correct answer: <span>{exercise.answer}</span>
                  </p>
                )}
                {correct && (
                  <p className="text-sm font-black mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#58CC02" }}>✓ Correct!</p>
                )}
                <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>{exercise.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="w-full py-3 rounded-2xl font-black text-sm transition-all disabled:opacity-40"
              style={{ backgroundColor: "#58CC02", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #46A302" }}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: "#1CB0F6", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #0A90D0" }}
            >
              Next Exercise <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button onClick={reset} className="w-full mt-2 py-1.5 text-xs font-black opacity-40 hover:opacity-70 transition-opacity flex items-center justify-center gap-1.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
