import { motion, AnimatePresence } from "framer-motion";
import { X, BookMarked } from "lucide-react";
import { grammarTables } from "@/data/curriculum";

interface GrammarSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function GrammarTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mb-6">
      <h3
        className="font-semibold text-[#1E1A16] text-sm mb-3"
        style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
      >
        {title}
      </h3>
      <div className="overflow-x-auto rounded-lg border border-[#1E1A16]/8">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#8B1A1A]/5 border-b border-[#1E1A16]/8">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="text-left px-2.5 py-2 text-[#8B1A1A] font-semibold whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#1E1A16]/5 last:border-0 hover:bg-[#1E1A16]/2 transition-colors"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-2.5 py-2 text-[#1E1A16]/80 leading-snug ${
                      j === 0 ? "font-medium text-[#1E1A16]" : ""
                    }`}
                    style={
                      j > 0
                        ? { fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }
                        : undefined
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function GrammarSidebar({ isOpen, onClose }: GrammarSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay (mobile only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-[#F5EFE0] border-l border-[#1E1A16]/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E1A16]/8 shrink-0">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-[#8B1A1A]" />
                <h2
                  className="font-bold text-[#1E1A16] text-sm"
                  style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
                >
                  Grammar Reference
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#1E1A16]/8 transition-colors"
              >
                <X className="w-4 h-4 text-[#1E1A16]/60" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <GrammarTable
                title={grammarTables.nounGenders.title}
                headers={grammarTables.nounGenders.headers}
                rows={grammarTables.nounGenders.rows}
              />
              <GrammarTable
                title={grammarTables.verbEndings.title}
                headers={grammarTables.verbEndings.headers}
                rows={grammarTables.verbEndings.rows}
              />
              <GrammarTable
                title={grammarTables.cases.title}
                headers={grammarTables.cases.headers}
                rows={grammarTables.cases.rows}
              />

              {/* Folk pattern divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-[#8B1A1A]/15" />
                <svg width="24" height="12" viewBox="0 0 24 12" className="text-[#8B1A1A]/30 shrink-0">
                  <path
                    d="M0 6 L4 2 L8 6 L12 2 L16 6 L20 2 L24 6"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
                <div className="flex-1 h-px bg-[#8B1A1A]/15" />
              </div>

              <p className="text-xs text-[#1E1A16]/40 text-center leading-relaxed">
                Quick reference tables for grammar rules.
                <br />
                Open anytime during your lessons.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
