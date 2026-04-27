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
      style={{ backgroundColor: "rgba(30,26,22,0.7)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ backgroundColor: "#F5EFE0", border: "1px solid rgba(139,26,26,0.15)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between shrink-0" style={{ borderBottom: "1px solid rgba(30,26,22,0.1)" }}>
          <div className="flex items-center gap-2">
            {selected !== null && (
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors">
                <ChevronLeft className="w-4 h-4" style={{ color: "#1E1A16" }} />
              </button>
            )}
            <div>
              <h2 className="font-bold text-xl" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>Cultural Notes</h2>
              <p className="text-xs mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>Romanian language in cultural context</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 transition-colors">
            <X className="w-5 h-5" style={{ color: "#1E1A16" }} />
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
                  const cc = categoryColors[note.category] || { color: "#8B1A1A", bg: "#F9E8E8" };
                  return (
                    <motion.button
                      key={note.id}
                      onClick={() => setSelected(i)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-left rounded-2xl p-5 transition-all group"
                      style={{
                        backgroundColor: "white",
                        border: "1.5px solid rgba(30,26,22,0.1)",
                        boxShadow: "0 2px 8px rgba(30,26,22,0.06)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ backgroundColor: cc.bg, color: cc.color }}
                        >
                          {note.category}
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-70 transition-opacity" style={{ color: "#1E1A16" }} />
                      </div>
                      <p className="text-xl font-bold mb-0.5" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>
                        {note.word}
                      </p>
                      <p className="text-xs mb-2" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#8B1A1A" }}>
                        {note.phonetic}
                      </p>
                      <p className="text-sm" style={{ color: "#1E1A16", opacity: 0.6 }}>
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
                    <div className="rounded-2xl overflow-hidden mb-5 h-48 relative">
                      <img
                        src={`https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=75`}
                        alt={note.word}
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.85)" }}
                      />
                      <div className="absolute inset-0 flex items-end p-5" style={{ background: "linear-gradient(to top, rgba(30,26,22,0.8) 0%, transparent 60%)" }}>
                        <div>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold mb-2 inline-block" style={{ backgroundColor: cc.bg, color: cc.color }}>
                            {note.category}
                          </span>
                          <p className="text-3xl font-bold" style={{ fontFamily: "Fraunces, serif", color: "#F5EFE0" }}>
                            {note.word}
                          </p>
                          <p className="text-sm" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#C9922A" }}>
                            {note.phonetic}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: "white", border: "1px solid rgba(30,26,22,0.1)" }}>
                      <p className="text-sm leading-relaxed" style={{ color: "#1E1A16", lineHeight: 1.8 }}>
                        {note.fullNote}
                      </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(s => s !== null && s > 0 ? s - 1 : culturalNotes.length - 1)}
                        className="flex-1 py-3 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-black/5"
                        style={{ borderColor: "rgba(30,26,22,0.2)", color: "#1E1A16" }}
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>
                      <button
                        onClick={() => setSelected(s => s !== null ? (s + 1) % culturalNotes.length : 0)}
                        className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                        style={{ backgroundColor: "#8B1A1A", color: "#F5EFE0" }}
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
