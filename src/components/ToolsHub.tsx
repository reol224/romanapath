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
  iconBg: string;
  shadowColor: string;
  tag: string;
  tagColor: string;
  tagBg: string;
}[] = [
  { id: "tongue-twister", icon: "👅", title: "Tongue Twisters", description: "Drill difficult sounds", iconBg: "#DDF4FF", shadowColor: "#84D8FF", tag: "Pronunciation", tagColor: "#1CB0F6", tagBg: "#DDF4FF" },
  { id: "flashcards", icon: "📚", title: "Flashcards", description: "Spaced repetition vocab", iconBg: "#FFF0D4", shadowColor: "#FFCC85", tag: "Vocabulary", tagColor: "#FF9600", tagBg: "#FFF0D4" },
  { id: "diacritics", icon: "ș", title: "Diacritics Trainer", description: "Master ă â î ș ț", iconBg: "#D7FFB8", shadowColor: "#89E219", tag: "Writing", tagColor: "#58CC02", tagBg: "#D7FFB8" },
  { id: "gender", icon: "⚡", title: "Gender Trainer", description: "Noun gender sorting", iconBg: "#FFF0D4", shadowColor: "#FFCC85", tag: "Grammar", tagColor: "#FF9600", tagBg: "#FFF0D4" },
  { id: "cases", icon: "📐", title: "Case Declension", description: "Interactive case tables", iconBg: "#F0D9FF", shadowColor: "#CE82FF", tag: "Grammar", tagColor: "#9B59F5", tagBg: "#F0D9FF" },
  { id: "verbs", icon: "📝", title: "Verb Driller", description: "All 6 persons & tenses", iconBg: "#DDF4FF", shadowColor: "#84D8FF", tag: "Grammar", tagColor: "#1CB0F6", tagBg: "#DDF4FF" },
  { id: "sentences", icon: "🔧", title: "Sentence Builder", description: "Word-order drag & drop", iconBg: "#D7FFB8", shadowColor: "#89E219", tag: "Grammar", tagColor: "#58CC02", tagBg: "#D7FFB8" },
  { id: "badges", icon: "🏆", title: "Achievements", description: "Track your milestones", iconBg: "#FFF0D4", shadowColor: "#FFCC85", tag: "Progress", tagColor: "#FF9600", tagBg: "#FFF0D4" },
  { id: "culture", icon: "🇷🇴", title: "Cultural Notes", description: "Language in context", iconBg: "#FFE0E0", shadowColor: "#FF9090", tag: "Culture", tagColor: "#FF4B4B", tagBg: "#FFE0E0" },
  { id: "proverbs", icon: "📖", title: "Proverbs", description: "Romanian folk wisdom", iconBg: "#F0D9FF", shadowColor: "#CE82FF", tag: "Culture", tagColor: "#9B59F5", tagBg: "#F0D9FF" },
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
                <div>
                  <h2 className="font-black text-2xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
                    🛠️ Learning Tools
                  </h2>
                  <p className="text-sm font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                    Drills, practice & cultural exploration
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                  style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}
                >
                  <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
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
                      whileTap={{ y: 4 }}
                      onClick={() => openTool(tool.id)}
                      className="text-left rounded-2xl p-4 transition-colors"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #E5E5E5",
                        boxShadow: `0 4px 0 #E5E5E5`,
                      }}
                    >
                      {/* Icon bubble */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3"
                        style={{ backgroundColor: tool.iconBg }}
                      >
                        {tool.icon}
                      </div>
                      {/* Tag */}
                      <span
                        className="text-xs font-black px-2 py-0.5 rounded-full mb-2 inline-block uppercase tracking-wide"
                        style={{ backgroundColor: tool.tagBg, color: tool.tagColor, fontFamily: "Nunito, sans-serif" }}
                      >
                        {tool.tag}
                      </span>
                      <p className="text-sm font-black leading-tight mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
                        {tool.title}
                      </p>
                      <p className="text-xs font-bold leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
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
