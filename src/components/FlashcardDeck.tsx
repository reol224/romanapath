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
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>🃏 Flashcard Deck</h2>
            <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
              Spaced repetition vocabulary practice
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
            <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
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
                  className="px-2.5 py-1 rounded-full text-xs font-black transition-all border-2"
                  style={{
                    backgroundColor: levelFilter === lvl ? "#FF4B4B" : "white",
                    color: levelFilter === lvl ? "white" : "#AFAFAF",
                    borderColor: levelFilter === lvl ? "#FF4B4B" : "#E5E5E5",
                    fontFamily: "Nunito, sans-serif",
                    boxShadow: levelFilter === lvl ? "0 3px 0 #CC2A2A" : "0 3px 0 #E5E5E5",
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setMode(m => m === "ro-en" ? "en-ro" : "ro-en"); setFlipped(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all"
              style={{ borderColor: "#E5E5E5", color: "#AFAFAF", fontFamily: "Nunito, sans-serif", boxShadow: "0 3px 0 #E5E5E5" }}
            >
              <SwitchCamera className="w-3.5 h-3.5" />
              {mode === "ro-en" ? "RO → EN" : "EN → RO"}
            </button>
          </div>

          {/* Progress bar */}
          <div className="mb-5">
            <div className="flex justify-between text-xs mb-1 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
              <span>{currentIdx + 1} / {filtered.length}</span>
              <span>{knownIds.size} known · {reviewedIds.size - knownIds.size} learning</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#F0F0F0" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "#58CC02" }}
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
                  border: "2px solid #E5E5E5",
                  boxShadow: "0 6px 0 #E5E5E5",
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="text-xs font-black mb-3 px-3 py-1 rounded-full" style={{ fontFamily: "Nunito, sans-serif", backgroundColor: "#F0F0F0", color: "#AFAFAF" }}>
                  {mode === "ro-en" ? "Romanian" : "English"} · {card.category}
                </span>
                <p className="text-3xl font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
                  {frontText}
                </p>
                <p className="text-xs mt-4 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Tap to reveal</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl p-8 min-h-[180px] flex flex-col items-center justify-center text-center"
                style={{
                  backgroundColor: "#1CB0F6",
                  border: "2px solid #0A90D0",
                  boxShadow: "0 6px 0 #0A90D0",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p className="text-3xl font-black mb-2" style={{ fontFamily: "Nunito, sans-serif", color: "white" }}>
                  {backText}
                </p>
                {backPhonetic && (
                  <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "rgba(255,255,255,0.8)" }}>
                    {backPhonetic}
                  </p>
                )}
                <p className="text-xs mt-3 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "rgba(255,255,255,0.6)" }}>Level {card.level} · {card.category}</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button onClick={prev} className="p-3 rounded-xl transition-all" style={{ border: "2px solid #E5E5E5", boxShadow: "0 3px 0 #E5E5E5" }}>
              <ChevronLeft className="w-5 h-5" style={{ color: "#AFAFAF" }} />
            </button>
            {flipped ? (
              <>
                <button
                  onClick={() => advance("right", false)}
                  className="flex-1 py-3 rounded-2xl font-black text-sm transition-all border-2"
                  style={{ borderColor: "#FF9600", color: "#FF9600", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #CC7700" }}
                >
                  Still Learning
                </button>
                <button
                  onClick={() => advance("right", true)}
                  className="flex-1 py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: "#58CC02", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #46A302" }}
                >
                  <Check className="w-4 h-4" /> I Know This
                </button>
              </>
            ) : (
              <button
                onClick={handleFlip}
                className="flex-1 py-3 rounded-2xl font-black text-sm transition-all"
                style={{ backgroundColor: "#1CB0F6", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #0A90D0" }}
              >
                Reveal Answer
              </button>
            )}
            <button onClick={prev} className="p-3 rounded-xl transition-all" style={{ border: "2px solid #E5E5E5", boxShadow: "0 3px 0 #E5E5E5" }}>
              <ChevronRight className="w-5 h-5" style={{ color: "#AFAFAF" }} />
            </button>
          </div>

          <button onClick={reset} className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 text-xs font-bold transition-opacity hover:opacity-70" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
            <RotateCcw className="w-3.5 h-3.5" /> Reset deck
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
