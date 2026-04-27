import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TongueTwisterModule } from "./TongueTwisterModule";
import { FlashcardDeck } from "./FlashcardDeck";
import { DiacriticsTrainer } from "./DiacriticsTrainer";
import { WordGenderTrainer } from "./WordGenderTrainer";
import { CaseDeclensionTable } from "./CaseDeclensionTable";
import { VerbDriller } from "./VerbDriller";
import { SentenceBuilder } from "./SentenceBuilder";
import { AchievementBadges } from "./AchievementBadges";
import { CulturalNotesPanel } from "./CulturalNotesPanel";
import { ProverbsSection } from "./ProverbsSection";
import type { BadgeStats } from "@/data/extras";

type Tool =
  | "tongue-twister"
  | "flashcards"
  | "diacritics"
  | "gender"
  | "cases"
  | "verbs"
  | "sentences"
  | "badges"
  | "culture"
  | "proverbs";

interface ToolsHubProps {
  isOpen: boolean;
  onClose: () => void;
  stats: BadgeStats;
  onFlashcardReviewed?: () => void;
  onDiacriticsCorrect?: () => void;
  onTongueTwisterComplete?: () => void;
  onVerbDrilled?: () => void;
}

const tools: {
  id: Tool;
  icon: string;
  title: string;
  description: string;
  color: string;
  bg: string;
  tag: string;
}[] = [
  { id: "tongue-twister", icon: "👅", title: "Tongue Twisters", description: "Drill difficult Romanian sounds", color: "#8B1A1A", bg: "#F9E8E8", tag: "Pronunciation" },
  { id: "flashcards", icon: "📚", title: "Flashcard Deck", description: "Spaced repetition vocabulary", color: "#1A3A6B", bg: "#E3EAF9", tag: "Vocabulary" },
  { id: "diacritics", icon: "ș", title: "Diacritics Trainer", description: "Master ă â î ș ț", color: "#2D5A27", bg: "#E8F5E3", tag: "Writing" },
  { id: "gender", icon: "♂♀◆", title: "Gender Trainer", description: "Drag-drop noun gender sorting", color: "#C9922A", bg: "#FFF3DC", tag: "Grammar" },
  { id: "cases", icon: "📐", title: "Case Declension", description: "Interactive case tables", color: "#8B1A1A", bg: "#F9E8E8", tag: "Grammar" },
  { id: "verbs", icon: "📝", title: "Verb Driller", description: "All 6 persons, multiple tenses", color: "#1A3A6B", bg: "#E3EAF9", tag: "Grammar" },
  { id: "sentences", icon: "🔧", title: "Sentence Builder", description: "Word-order drag-and-drop", color: "#2D5A27", bg: "#E8F5E3", tag: "Grammar" },
  { id: "badges", icon: "🏆", title: "Achievements", description: "Track your milestones", color: "#C9922A", bg: "#FFF3DC", tag: "Progress" },
  { id: "culture", icon: "🇷🇴", title: "Cultural Notes", description: "Language in cultural context", color: "#8B1A1A", bg: "#F9E8E8", tag: "Culture" },
  { id: "proverbs", icon: "📖", title: "Proverbs", description: "Romanian folk wisdom", color: "#1A3A6B", bg: "#E3EAF9", tag: "Culture" },
];

export function ToolsHub({ isOpen, onClose, stats, onFlashcardReviewed, onDiacriticsCorrect, onTongueTwisterComplete, onVerbDrilled }: ToolsHubProps) {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const openTool = (id: Tool) => {
    setActiveTool(id);
  };

  const closeTool = () => setActiveTool(null);

  if (!isOpen && activeTool === null) return null;

  return (
    <>
      {/* Hub grid modal */}
      <AnimatePresence>
        {isOpen && activeTool === null && (
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
              <div className="px-6 py-5 flex items-center justify-between shrink-0" style={{ borderBottom: "1px solid rgba(30,26,22,0.1)" }}>
                <div>
                  <h2 className="font-bold text-2xl" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>
                    Learning Tools
                  </h2>
                  <p className="text-sm mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>
                    Drills, practice modules & cultural exploration
                  </p>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 transition-colors">
                  <X className="w-5 h-5" style={{ color: "#1E1A16" }} />
                </button>
              </div>

              {/* Grid */}
              <div className="overflow-y-auto flex-1 p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {tools.map((tool, i) => (
                    <motion.button
                      key={tool.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openTool(tool.id)}
                      className="text-left rounded-2xl p-4 transition-all"
                      style={{
                        backgroundColor: "white",
                        border: "1.5px solid rgba(30,26,22,0.08)",
                        boxShadow: "0 2px 8px rgba(30,26,22,0.05)",
                      }}
                    >
                      <div className="text-2xl mb-3">{tool.icon}</div>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
                        style={{ backgroundColor: tool.bg, color: tool.color }}
                      >
                        {tool.tag}
                      </span>
                      <p className="text-sm font-bold leading-tight mb-1" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>
                        {tool.title}
                      </p>
                      <p className="text-xs leading-tight" style={{ color: "#1E1A16", opacity: 0.5 }}>
                        {tool.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub-tools — render as overlays, keeping hub underneath */}
      <AnimatePresence>
        {activeTool === "tongue-twister" && (
          <TongueTwisterModule isOpen onClose={closeTool} />
        )}
        {activeTool === "flashcards" && (
          <FlashcardDeck isOpen onClose={closeTool} onCardReviewed={onFlashcardReviewed} />
        )}
        {activeTool === "diacritics" && (
          <DiacriticsTrainer isOpen onClose={closeTool} onCorrect={onDiacriticsCorrect} />
        )}
        {activeTool === "gender" && (
          <WordGenderTrainer isOpen onClose={closeTool} />
        )}
        {activeTool === "cases" && (
          <CaseDeclensionTable isOpen onClose={closeTool} />
        )}
        {activeTool === "verbs" && (
          <VerbDriller isOpen onClose={closeTool} onDrilled={onVerbDrilled} />
        )}
        {activeTool === "sentences" && (
          <SentenceBuilder isOpen onClose={closeTool} />
        )}
        {activeTool === "badges" && (
          <AchievementBadges isOpen onClose={closeTool} stats={stats} />
        )}
        {activeTool === "culture" && (
          <CulturalNotesPanel isOpen onClose={closeTool} />
        )}
        {activeTool === "proverbs" && (
          <ProverbsSection isOpen onClose={closeTool} />
        )}
      </AnimatePresence>
    </>
  );
}
