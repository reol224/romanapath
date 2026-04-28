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
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-3xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 0 #E5E5E5, 0 0 0 2px #E5E5E5" }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between shrink-0" style={{ borderBottom: "2px solid #F0F0F0" }}>
          <div>
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>⚧ Word Gender Trainer</h2>
            <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Drag words into the correct gender column</p>
          </div>
          <div className="flex items-center gap-2">
            {score !== null && (
              <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: score === genderWords.length ? "#58CC02" : "#FF9600" }}>
                {score}/{genderWords.length}
              </span>
            )}
            <button onClick={reset} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" title="Shuffle & reset" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
              <Shuffle className="w-4 h-4" style={{ color: "#AFAFAF" }} />
            </button>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
              <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {/* Unplaced words bank */}
          {unplaced.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-black mb-2 uppercase tracking-wider" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                Word Bank — drag into a column
              </p>
              <div className="flex flex-wrap gap-2 min-h-[48px] p-3 rounded-2xl" style={{ backgroundColor: "#F7F7F7", border: "2px dashed #E5E5E5" }}>
                {unplaced.map(w => (
                  <div
                    key={w.id}
                    draggable
                    onDragStart={() => handleDragStart(w.id)}
                    onDragEnd={() => { setDragging(null); setDragOver(null); }}
                    className="px-3 py-1.5 rounded-full cursor-grab active:cursor-grabbing select-none transition-all"
                    style={{
                      backgroundColor: "white",
                      border: "2px solid #E5E5E5",
                      color: "#3C3C3C",
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 700,
                      boxShadow: dragging === w.id ? "0 4px 12px rgba(0,0,0,0.15)" : "0 3px 0 #E5E5E5",
                      opacity: dragging === w.id ? 0.5 : 1,
                    }}
                  >
                    <span className="font-bold">{w.romanian}</span>
                    <span className="text-xs ml-1.5 font-bold" style={{ color: "#AFAFAF" }}>{w.english}</span>
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
                className="rounded-2xl min-h-[200px] p-3 transition-all"
                style={{
                  backgroundColor: dragOver === key ? bg : "#F7F7F7",
                  border: `2px ${dragOver === key ? "solid" : "dashed"} ${dragOver === key ? color : "#E5E5E5"}`,
                }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-lg" style={{ color }}>{icon}</span>
                  <span className="text-xs font-black uppercase tracking-wider" style={{ fontFamily: "Nunito, sans-serif", color }}>{label}</span>
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
                        className="px-3 py-2 rounded-xl flex items-center justify-between group"
                        style={{
                          backgroundColor: ok ? "#E6F9E8" : bad ? "#FFECEC" : "white",
                          border: `2px solid ${ok ? "#58CC02" : bad ? "#FF4B4B" : "#E5E5E5"}`,
                        }}
                      >
                        <div>
                          <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
                            {w.romanian}
                          </span>
                          <span className="text-xs ml-1.5 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>{w.english}</span>
                          {bad && checked && (
                            <p className="text-xs mt-0.5 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#FF4B4B" }}>→ {w.gender}</p>
                          )}
                          {checked && (
                            <p className="text-xs mt-0.5 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>{w.tip}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {ok && <Check className="w-3.5 h-3.5" style={{ color: "#58CC02" }} />}
                          {bad && <X className="w-3.5 h-3.5" style={{ color: "#FF4B4B" }} />}
                          {!checked && (
                            <button
                              onClick={() => handleRemove(w.id)}
                              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-black/10 transition-all"
                              style={{ color: "#AFAFAF" }}
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
                className="flex-1 py-3 rounded-2xl font-black text-sm transition-all disabled:opacity-40"
                style={{ backgroundColor: "#58CC02", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #46A302" }}
              >
                Check Answers ({Object.keys(placed).length}/{genderWords.length} placed)
              </button>
            ) : (
              <button
                onClick={reset}
                className="flex-1 py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: "#1CB0F6", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #0A90D0" }}
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
