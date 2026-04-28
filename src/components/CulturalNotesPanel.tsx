import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { culturalNotes } from "@/data/extras";

interface CulturalNotesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors: Record<string, { color: string; bg: string }> = {
  Food: { color: "#C9922A", bg: "#FFF3DC" },
  Music: { color: "#8B1A1A", bg: "#F9E8E8" },
  Clothing: { color: "#1A3A6B", bg: "#E3EAF9" },
  Tradition: { color: "#2D5A27", bg: "#E8F5E3" },
  Emotion: { color: "#8B1A1A", bg: "#F9E8E8" },
};

export function CulturalNotesPanel({ isOpen, onClose }: CulturalNotesPanelProps) {
  const [selected, setSelected] = useState<number | null>(null);

  if (!isOpen) return null;

  const note = selected !== null ? culturalNotes[selected] : null;
  const cc = note ? (categoryColors[note.category] || { color: "#8B1A1A", bg: "#F9E8E8" }) : null;

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
        className="w-full max-w-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 0 #E5E5E5, 0 0 0 2px #E5E5E5" }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between shrink-0" style={{ borderBottom: "2px solid #F0F0F0" }}>
          <div className="flex items-center gap-2">
            {selected !== null && (
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
                <ChevronLeft className="w-4 h-4" style={{ color: "#AFAFAF" }} />
              </button>
            )}
            <div>
              <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>🗺️ Cultural Notes</h2>
              <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Romanian language in cultural context</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
            <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {selected === null ? (
              /* Grid view */
              <motion.div
                key="grid"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {culturalNotes.map((note, i) => {
                  const cc = categoryColors[note.category] || { color: "#1CB0F6", bg: "#E8F4FD" };
                  return (
                    <motion.button
                      key={note.id}
                      onClick={() => setSelected(i)}
                      whileTap={{ y: 4 }}
                      className="text-left rounded-2xl p-5 transition-all"
                      style={{
                        backgroundColor: "white",
                        border: "2px solid #E5E5E5",
                        boxShadow: "0 4px 0 #E5E5E5",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-black border-2"
                          style={{ fontFamily: "Nunito, sans-serif", backgroundColor: cc.bg, color: cc.color, borderColor: cc.color }}
                        >
                          {note.category}
                        </span>
                        <ChevronRight className="w-4 h-4" style={{ color: "#AFAFAF" }} />
                      </div>
                      <p className="text-xl font-black mb-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
                        {note.word}
                      </p>
                      <p className="text-xs mb-2 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#1CB0F6" }}>
                        {note.phonetic}
                      </p>
                      <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                        {note.shortDescription}
                      </p>
                    </motion.button>
                  );
                })}
              </motion.div>
            ) : (
              /* Detail view */
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6"
              >
                {note && cc && (
                  <>
                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden mb-5 h-48 relative" style={{ border: "2px solid #E5E5E5" }}>
                      <img
                        src={`https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=75`}
                        alt={note.word}
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.85)" }}
                      />
                      <div className="absolute inset-0 flex items-end p-5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}>
                        <div>
                          <span className="px-2 py-0.5 rounded-full text-xs font-black mb-2 inline-block border-2" style={{ fontFamily: "Nunito, sans-serif", backgroundColor: cc.bg, color: cc.color, borderColor: cc.color }}>
                            {note.category}
                          </span>
                          <p className="text-3xl font-black" style={{ fontFamily: "Nunito, sans-serif", color: "white" }}>
                            {note.word}
                          </p>
                          <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "rgba(255,255,255,0.8)" }}>
                            {note.phonetic}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
                      <p className="text-sm font-bold leading-relaxed" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF", lineHeight: 1.8 }}>
                        {note.fullNote}
                      </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(s => s !== null && s > 0 ? s - 1 : culturalNotes.length - 1)}
                        className="flex-1 py-3 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all"
                        style={{ borderColor: "#E5E5E5", color: "#AFAFAF", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #E5E5E5" }}
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>
                      <button
                        onClick={() => setSelected(s => s !== null ? (s + 1) % culturalNotes.length : 0)}
                        className="flex-1 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all"
                        style={{ backgroundColor: "#1CB0F6", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #0A90D0" }}
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
