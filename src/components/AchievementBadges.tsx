import { motion } from "framer-motion";
import { X, Trophy, Lock } from "lucide-react";
import { badges, Badge, BadgeStats } from "@/data/extras";

interface AchievementBadgesProps {
  isOpen: boolean;
  onClose: () => void;
  stats: BadgeStats;
}

export function AchievementBadges({ isOpen, onClose, stats }: AchievementBadgesProps) {
  const unlockedCount = badges.filter(b => b.condition(stats)).length;

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
        className="w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 0 #E5E5E5, 0 0 0 2px #E5E5E5" }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "2px solid #F0F0F0" }}>
          <div>
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>🏆 Achievement Badges</h2>
            <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
              {unlockedCount} of {badges.length} unlocked
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2" style={{ borderColor: "#FF9600", backgroundColor: "#FFF3DC" }}>
              <Trophy className="w-4 h-4" style={{ color: "#FF9600" }} />
              <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#FF9600" }}>{unlockedCount}/{badges.length}</span>
            </div>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
              <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Progress</span>
              <span className="text-xs font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#FF9600" }}>{Math.round((unlockedCount / badges.length) * 100)}%</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden border-2" style={{ backgroundColor: "#F0F0F0", borderColor: "#E5E5E5" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "#FF9600" }}
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
              return (
                <motion.div
                  key={badge.id}
                  whileTap={unlocked ? { y: 4 } : {}}
                  className="rounded-2xl p-4 flex flex-col items-center text-center relative"
                  style={{
                    backgroundColor: unlocked ? badge.bgColor : "#F7F7F7",
                    border: `2px solid ${unlocked ? badge.color : "#E5E5E5"}`,
                    boxShadow: unlocked ? `0 4px 0 ${badge.color}80` : "0 4px 0 #E5E5E5",
                    opacity: unlocked ? 1 : 0.6,
                  }}
                >
                  {!unlocked && (
                    <Lock className="absolute top-2 right-2 w-3.5 h-3.5" style={{ color: "#AFAFAF" }} />
                  )}
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p
                    className="text-xs font-black leading-tight mb-1"
                    style={{ fontFamily: "Nunito, sans-serif", color: unlocked ? badge.color : "#AFAFAF" }}
                  >
                    {badge.title}
                  </p>
                  <p className="text-xs font-bold leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                    {badge.description}
                  </p>
                  {unlocked && (
                    <div
                      className="mt-2 px-2 py-0.5 rounded-full text-xs font-black border-2"
                      style={{ fontFamily: "Nunito, sans-serif", backgroundColor: badge.bgColor, color: badge.color, borderColor: badge.color }}
                    >
                      ✓ Unlocked
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Stats summary */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Lessons Done", value: stats.completedLessons, color: "#58CC02", bg: "#E6F9E8", border: "#58CC02", shadow: "#46A302" },
              { label: "Day Streak", value: stats.streak, color: "#FF9600", bg: "#FFF3DC", border: "#FF9600", shadow: "#CC7700" },
              { label: "Cards Reviewed", value: stats.flashcardsReviewed, color: "#1CB0F6", bg: "#E8F4FD", border: "#1CB0F6", shadow: "#0A90D0" },
            ].map(({ label, value, color, bg, border, shadow }) => (
              <div key={label} className="rounded-2xl p-3 text-center border-2" style={{ backgroundColor: bg, borderColor: border, boxShadow: `0 4px 0 ${shadow}` }}>
                <p className="text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif", color }}>{value}</p>
                <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
