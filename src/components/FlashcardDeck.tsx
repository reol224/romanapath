import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, ChevronLeft, ChevronRight, Check, SwitchCamera } from "lucide-react";
import { flashcards, Flashcard } from "@/data/extras";

interface FlashcardDeckProps {
  isOpen: boolean;
  onClose: () => void;
  onCardReviewed?: () => void;
}

type Mode = "ro-en" | "en-ro";
type LevelFilter = "All" | "A1" | "A2" | "B1" | "B2";

export function FlashcardDeck({ isOpen, onClose, onCardReviewed }: FlashcardDeckProps) {
  const [mode, setMode] = useState<Mode>("ro-en");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("A1");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState<"left" | "right">("right");

  const filtered = levelFilter === "All"
    ? flashcards
    : flashcards.filter(f => f.level === levelFilter);

  const card: Flashcard | undefined = filtered[currentIdx];

  const handleFlip = () => setFlipped(f => !f);

  const advance = useCallback((dir: "left" | "right", known?: boolean) => {
    if (!card) return;
    setReviewedIds(s => new Set([...s, card.id]));
    if (known !== undefined) {
      if (known) setKnownIds(s => new Set([...s, card.id]));
      else setKnownIds(s => { const next = new Set(s); next.delete(card.id); return next; });
    }
    onCardReviewed?.();
    setDirection(dir);
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx(i => (i + 1) % filtered.length);
    }, 50);
  }, [card, filtered.length, onCardReviewed]);

  const prev = () => {
    setDirection("left");
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx(i => (i - 1 + filtered.length) % filtered.length);
    }, 50);
  };

  const reset = () => {
    setCurrentIdx(0);
    setFlipped(false);
    setReviewedIds(new Set());
    setKnownIds(new Set());
  };

  const progress = filtered.length > 0 ? Math.round((reviewedIds.size / filtered.length) * 100) : 0;

  if (!isOpen || !card) return null;

  const frontText = mode === "ro-en" ? card.romanian : card.english;
  const backText = mode === "ro-en" ? card.english : card.romanian;
  const backPhonetic = mode === "ro-en" ? card.phonetic : undefined;

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
            <h2 className="font-bold text-xl" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>Flashcard Deck</h2>
            <p className="text-xs mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>
              Spaced repetition vocabulary practice
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 transition-colors">
            <X className="w-5 h-5" style={{ color: "#1E1A16" }} />
          </button>
        </div>

        <div className="p-6">
          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              {(["All", "A1", "A2", "B1", "B2"] as LevelFilter[]).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => { setLevelFilter(lvl); setCurrentIdx(0); setFlipped(false); }}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all border"
                  style={{
                    backgroundColor: levelFilter === lvl ? "#8B1A1A" : "transparent",
                    color: levelFilter === lvl ? "#F5EFE0" : "#8B1A1A",
                    borderColor: "#8B1A1A",
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setMode(m => m === "ro-en" ? "en-ro" : "ro-en"); setFlipped(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:bg-black/5"
              style={{ borderColor: "rgba(30,26,22,0.2)", color: "#1E1A16" }}
            >
              <SwitchCamera className="w-3.5 h-3.5" />
              {mode === "ro-en" ? "RO → EN" : "EN → RO"}
            </button>
          </div>

          {/* Progress bar */}
          <div className="mb-5">
            <div className="flex justify-between text-xs mb-1" style={{ color: "#1E1A16", opacity: 0.5 }}>
              <span>{currentIdx + 1} / {filtered.length}</span>
              <span>{knownIds.size} known · {reviewedIds.size - knownIds.size} learning</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(30,26,22,0.1)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "#8B1A1A" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Card */}
          <div className="perspective-1000 mb-5" style={{ perspective: "1000px" }}>
            <motion.div
              className="relative cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={handleFlip}
            >
              {/* Front */}
              <div
                className="rounded-2xl p-8 min-h-[180px] flex flex-col items-center justify-center text-center"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 4px 20px rgba(30,26,22,0.1)",
                  border: "2px solid rgba(139,26,26,0.12)",
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="text-xs font-semibold mb-3 px-2 py-0.5 rounded" style={{ backgroundColor: "#F5EFE0", color: "#8B1A1A" }}>
                  {mode === "ro-en" ? "Romanian" : "English"} · {card.category}
                </span>
                <p className="text-3xl font-bold" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>
                  {frontText}
                </p>
                <p className="text-xs mt-4 opacity-40" style={{ color: "#1E1A16" }}>Tap to reveal</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl p-8 min-h-[180px] flex flex-col items-center justify-center text-center"
                style={{
                  backgroundColor: "#1E1A16",
                  boxShadow: "0 4px 20px rgba(30,26,22,0.2)",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p className="text-3xl font-bold mb-2" style={{ fontFamily: "Fraunces, serif", color: "#F5EFE0" }}>
                  {backText}
                </p>
                {backPhonetic && (
                  <p className="text-sm" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#C9922A" }}>
                    {backPhonetic}
                  </p>
                )}
                <p className="text-xs mt-3 opacity-40" style={{ color: "#F5EFE0" }}>Level {card.level} · {card.category}</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button onClick={prev} className="p-3 rounded-xl border transition-all hover:bg-black/5" style={{ borderColor: "rgba(30,26,22,0.2)" }}>
              <ChevronLeft className="w-5 h-5" style={{ color: "#1E1A16" }} />
            </button>
            {flipped ? (
              <>
                <button
                  onClick={() => advance("right", false)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 border-2"
                  style={{ borderColor: "#C9922A", color: "#C9922A" }}
                >
                  Still Learning
                </button>
                <button
                  onClick={() => advance("right", true)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: "#2D5A27", color: "#F5EFE0" }}
                >
                  <Check className="w-4 h-4" /> I Know This
                </button>
              </>
            ) : (
              <button
                onClick={handleFlip}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#8B1A1A", color: "#F5EFE0" }}
              >
                Reveal Answer
              </button>
            )}
            <button onClick={prev} className="p-3 rounded-xl border transition-all hover:bg-black/5" style={{ borderColor: "rgba(30,26,22,0.2)" }}>
              <ChevronRight className="w-5 h-5" style={{ color: "#1E1A16" }} />
            </button>
          </div>

          <button onClick={reset} className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 text-xs opacity-40 hover:opacity-70 transition-opacity" style={{ color: "#1E1A16" }}>
            <RotateCcw className="w-3.5 h-3.5" /> Reset deck
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
