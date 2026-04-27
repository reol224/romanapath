import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Lock } from "lucide-react";
import { badges, Badge, BadgeStats } from "@/data/extras";

interface AchievementBadgesProps {
  isOpen: boolean;
  onClose: () => void;
  stats: BadgeStats;
}

export function AchievementBadges({ isOpen, onClose, stats }: AchievementBadgesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const unlockedCount = badges.filter(b => b.condition(stats)).length;

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
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "#F5EFE0", border: "1px solid rgba(139,26,26,0.15)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(30,26,22,0.1)" }}>
          <div>
            <h2 className="font-bold text-xl" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>Achievement Badges</h2>
            <p className="text-xs mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>
              {unlockedCount} of {badges.length} unlocked
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4" style={{ color: "#C9922A" }} />
              <span className="text-sm font-bold" style={{ color: "#C9922A" }}>{unlockedCount}/{badges.length}</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 transition-colors">
              <X className="w-5 h-5" style={{ color: "#1E1A16" }} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(30,26,22,0.1)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #C9922A, #8B1A1A)" }}
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / badges.length) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Badge grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {badges.map(badge => {
              const unlocked = badge.condition(stats);
              const isHovered = hoveredId === badge.id;
              return (
                <motion.div
                  key={badge.id}
                  onMouseEnter={() => setHoveredId(badge.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ scale: unlocked ? 1.05 : 1.02 }}
                  className="rounded-2xl p-4 flex flex-col items-center text-center transition-all cursor-default relative"
                  style={{
                    backgroundColor: unlocked ? badge.bgColor : "rgba(30,26,22,0.04)",
                    border: `2px solid ${unlocked ? badge.color : "rgba(30,26,22,0.12)"}`,
                    opacity: unlocked ? 1 : 0.55,
                    boxShadow: unlocked && isHovered ? `0 4px 16px ${badge.color}30` : undefined,
                  }}
                >
                  {!unlocked && (
                    <Lock className="absolute top-2 right-2 w-3 h-3" style={{ color: "#1E1A16", opacity: 0.3 }} />
                  )}
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p
                    className="text-xs font-bold leading-tight mb-1"
                    style={{ color: unlocked ? badge.color : "#1E1A16", opacity: unlocked ? 1 : 0.5 }}
                  >
                    {badge.title}
                  </p>
                  <p className="text-xs leading-tight" style={{ color: "#1E1A16", opacity: 0.5 }}>
                    {badge.description}
                  </p>
                  {unlocked && (
                    <div
                      className="mt-2 px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ backgroundColor: badge.color, color: "#F5EFE0" }}
                    >
                      Unlocked
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Stats summary */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Lessons Done", value: stats.completedLessons },
              { label: "Day Streak", value: stats.streak },
              { label: "Cards Reviewed", value: stats.flashcardsReviewed },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3 text-center" style={{ backgroundColor: "rgba(30,26,22,0.04)", border: "1px solid rgba(30,26,22,0.1)" }}>
                <p className="text-2xl font-bold" style={{ fontFamily: "Fraunces, serif", color: "#8B1A1A" }}>{value}</p>
                <p className="text-xs mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
