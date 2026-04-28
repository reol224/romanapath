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
    <div className="mb-5">
      <h3 className="font-black text-gray-800 text-sm mb-3 tracking-tight">
        {title}
      </h3>
      <div className="overflow-x-auto rounded-2xl border-2 border-gray-100" style={{ boxShadow: "0 3px 0 #e5e7eb" }}>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#D7FFB8] border-b-2 border-gray-100">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="text-left px-3 py-2 text-[#3a8a00] font-black whitespace-nowrap"
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
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 text-gray-600 leading-snug ${
                      j === 0 ? "font-black text-gray-800" : "font-medium"
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
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-white border-l-2 border-gray-100 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b-2 border-gray-100 shrink-0 bg-[#D7FFB8]"
            >
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-[#3a8a00]" />
                <h2 className="font-black text-gray-800 text-sm tracking-tight">
                  Grammar Reference
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-white border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                style={{ boxShadow: "0 2px 0 #d1d5db" }}
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 bg-gray-50/50">
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

              <p className="text-xs text-gray-400 font-bold text-center leading-relaxed mt-4">
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

