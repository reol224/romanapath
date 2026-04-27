import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Check, Shuffle } from "lucide-react";
import { genderWords, GenderWord } from "@/data/extras";

interface WordGenderTrainerProps {
  isOpen: boolean;
  onClose: () => void;
}

type Gender = "masculine" | "feminine" | "neuter";
type DragState = { wordId: string; gender: Gender } | null;

const GENDERS: { key: Gender; label: string; color: string; bg: string; icon: string }[] = [
  { key: "masculine", label: "Masculine", color: "#1A3A6B", bg: "#E3EAF9", icon: "♂" },
  { key: "feminine", label: "Feminine", color: "#8B1A1A", bg: "#F9E8E8", icon: "♀" },
  { key: "neuter", label: "Neuter", color: "#2D5A27", bg: "#E8F5E3", icon: "◆" },
];

export function WordGenderTrainer({ isOpen, onClose }: WordGenderTrainerProps) {
  const [shuffled, setShuffled] = useState(() => [...genderWords].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState<Record<string, Gender>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<Gender | null>(null);

  const unplaced = shuffled.filter(w => !placed[w.id]);
  const placedByGender = (gender: Gender) =>
    Object.entries(placed).filter(([, g]) => g === gender).map(([id]) => shuffled.find(w => w.id === id)!).filter(Boolean);

  const handleDragStart = (wordId: string) => setDragging(wordId);
  const handleDragOver = (e: React.DragEvent, gender: Gender) => { e.preventDefault(); setDragOver(gender); };
  const handleDrop = (gender: Gender) => {
    if (!dragging) return;
    setPlaced(p => ({ ...p, [dragging]: gender }));
    setDragging(null);
    setDragOver(null);
  };
  const handleRemove = (wordId: string) => {
    setPlaced(p => { const next = { ...p }; delete next[wordId]; return next; });
    setChecked(false);
    setScore(null);
  };

  const checkAnswers = () => {
    let correct = 0;
    shuffled.forEach(w => { if (placed[w.id] === w.gender) correct++; });
    setScore(correct);
    setChecked(true);
  };

  const reset = () => {
    setShuffled([...genderWords].sort(() => Math.random() - 0.5));
    setPlaced({});
    setChecked(false);
    setScore(null);
  };

  const isCorrect = (word: GenderWord) => checked && placed[word.id] === word.gender;
  const isWrong = (word: GenderWord) => checked && placed[word.id] !== undefined && placed[word.id] !== word.gender;

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
        className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ backgroundColor: "#F5EFE0", border: "1px solid rgba(139,26,26,0.15)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between shrink-0" style={{ borderBottom: "1px solid rgba(30,26,22,0.1)" }}>
          <div>
            <h2 className="font-bold text-xl" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>Word Gender Trainer</h2>
            <p className="text-xs mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>Drag words into the correct gender column</p>
          </div>
          <div className="flex items-center gap-2">
            {score !== null && (
              <span className="text-sm font-bold" style={{ color: score === genderWords.length ? "#2D5A27" : "#C9922A" }}>
                {score}/{genderWords.length}
              </span>
            )}
            <button onClick={reset} className="p-2 rounded-lg hover:bg-black/5 transition-colors" title="Shuffle & reset">
              <Shuffle className="w-5 h-5" style={{ color: "#1E1A16" }} />
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 transition-colors">
              <X className="w-5 h-5" style={{ color: "#1E1A16" }} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {/* Unplaced words bank */}
          {unplaced.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#1E1A16", opacity: 0.4 }}>
                Word Bank — drag into a column
              </p>
              <div className="flex flex-wrap gap-2 min-h-[48px] p-3 rounded-xl" style={{ backgroundColor: "rgba(30,26,22,0.04)", border: "1.5px dashed rgba(30,26,22,0.2)" }}>
                {unplaced.map(w => (
                  <div
                    key={w.id}
                    draggable
                    onDragStart={() => handleDragStart(w.id)}
                    onDragEnd={() => { setDragging(null); setDragOver(null); }}
                    className="px-3 py-1.5 rounded-full cursor-grab active:cursor-grabbing select-none transition-all hover:shadow-sm"
                    style={{
                      backgroundColor: "white",
                      border: "1.5px solid rgba(30,26,22,0.15)",
                      color: "#1E1A16",
                      fontFamily: "Fraunces, serif",
                      boxShadow: dragging === w.id ? "0 4px 12px rgba(30,26,22,0.15)" : undefined,
                      opacity: dragging === w.id ? 0.5 : 1,
                    }}
                  >
                    <span className="font-semibold">{w.romanian}</span>
                    <span className="text-xs ml-1.5 opacity-50">{w.english}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drop columns */}
          <div className="grid grid-cols-3 gap-3">
            {GENDERS.map(({ key, label, color, bg, icon }) => (
              <div
                key={key}
                onDragOver={e => handleDragOver(e, key)}
                onDragLeave={() => setDragOver(null)}
                onDrop={() => handleDrop(key)}
                className="rounded-xl min-h-[200px] p-3 transition-all"
                style={{
                  backgroundColor: dragOver === key ? bg : "rgba(30,26,22,0.03)",
                  border: `2px ${dragOver === key ? "solid" : "dashed"} ${dragOver === key ? color : "rgba(30,26,22,0.15)"}`,
                }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-lg" style={{ color }}>{icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{label}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {placedByGender(key).map(w => {
                    const ok = isCorrect(w);
                    const bad = isWrong(w);
                    return (
                      <motion.div
                        key={w.id}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-3 py-2 rounded-lg flex items-center justify-between group"
                        style={{
                          backgroundColor: ok ? "rgba(45,90,39,0.1)" : bad ? "rgba(139,26,26,0.1)" : "white",
                          border: `1.5px solid ${ok ? "#2D5A27" : bad ? "#8B1A1A" : "rgba(30,26,22,0.12)"}`,
                        }}
                      >
                        <div>
                          <span className="text-sm font-semibold" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>
                            {w.romanian}
                          </span>
                          <span className="text-xs ml-1.5" style={{ color: "#1E1A16", opacity: 0.5 }}>{w.english}</span>
                          {bad && checked && (
                            <p className="text-xs mt-0.5" style={{ color: "#8B1A1A" }}>→ {w.gender}</p>
                          )}
                          {checked && (
                            <p className="text-xs mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>{w.tip}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {ok && <Check className="w-3.5 h-3.5" style={{ color: "#2D5A27" }} />}
                          {bad && <X className="w-3.5 h-3.5" style={{ color: "#8B1A1A" }} />}
                          {!checked && (
                            <button
                              onClick={() => handleRemove(w.id)}
                              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-black/10 transition-all"
                              style={{ color: "#1E1A16" }}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Action */}
          <div className="mt-5 flex gap-3">
            {!checked ? (
              <button
                onClick={checkAnswers}
                disabled={Object.keys(placed).length === 0}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40"
                style={{ backgroundColor: "#8B1A1A", color: "#F5EFE0" }}
              >
                Check Answers ({Object.keys(placed).length}/{genderWords.length} placed)
              </button>
            ) : (
              <button
                onClick={reset}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#1E1A16", color: "#F5EFE0" }}
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
