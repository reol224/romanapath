import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { caseExamples, CaseRow } from "@/data/extras";

interface CaseDeclensionTableProps {
  isOpen: boolean;
  onClose: () => void;
}

const CASES = ["nominative", "accusative", "genitive", "dative", "vocative"] as const;
type CaseKey = typeof CASES[number];

const caseDescriptions: Record<CaseKey, string> = {
  nominative: "Subject of the sentence — who does the action",
  accusative: "Direct object — who/what receives the action",
  genitive: "Possession — belongs to",
  dative: "Indirect object — to whom",
  vocative: "Direct address — calling out to someone",
};

const genderColors: Record<string, { color: string; bg: string }> = {
  masculine: { color: "#1A3A6B", bg: "#E3EAF9" },
  feminine: { color: "#8B1A1A", bg: "#F9E8E8" },
  neuter: { color: "#2D5A27", bg: "#E8F5E3" },
};

export function CaseDeclensionTable({ isOpen, onClose }: CaseDeclensionTableProps) {
  const [hoveredCase, setHoveredCase] = useState<CaseKey | null>(null);
  const [selectedNoun, setSelectedNoun] = useState(0);
  const [showDefinite, setShowDefinite] = useState(false);

  if (!isOpen) return null;

  const noun: CaseRow = caseExamples[selectedNoun];
  const gc = genderColors[noun.gender];
  const forms = showDefinite ? noun.definite : noun.forms;

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
            <h2 className="font-bold text-xl" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>Case Declension</h2>
            <p className="text-xs mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>Hover a case to see its usage</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 transition-colors">
            <X className="w-5 h-5" style={{ color: "#1E1A16" }} />
          </button>
        </div>

        <div className="p-6">
          {/* Noun selector */}
          <div className="flex gap-2 mb-4">
            {caseExamples.map((c, i) => {
              const g = genderColors[c.gender];
              return (
                <button
                  key={c.noun}
                  onClick={() => setSelectedNoun(i)}
                  className="px-4 py-2 rounded-xl font-semibold text-sm transition-all border-2"
                  style={{
                    backgroundColor: selectedNoun === i ? g.color : "transparent",
                    color: selectedNoun === i ? "#F5EFE0" : g.color,
                    borderColor: g.color,
                  }}
                >
                  {c.noun}
                  <span className="ml-1.5 text-xs opacity-70">({c.english})</span>
                </button>
              );
            })}
          </div>

          {/* Definite toggle */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm font-medium" style={{ color: "#1E1A16", opacity: 0.7 }}>Article form:</span>
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "rgba(30,26,22,0.2)" }}>
              {["Indefinite", "Definite"].map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => setShowDefinite(i === 1)}
                  className="px-4 py-1.5 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: showDefinite === (i === 1) ? "#1E1A16" : "transparent",
                    color: showDefinite === (i === 1) ? "#F5EFE0" : "#1E1A16",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ backgroundColor: gc.bg, color: gc.color }}>
              {noun.gender}
            </span>
          </div>

          {/* Case table */}
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(30,26,22,0.1)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#1E1A16" }}>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "#F5EFE0", opacity: 0.7, width: "140px" }}>Case</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "#F5EFE0", opacity: 0.7 }}>Form</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "#F5EFE0", opacity: 0.7 }}>Usage</th>
                </tr>
              </thead>
              <tbody>
                {CASES.map((caseKey, i) => {
                  const isHovered = hoveredCase === caseKey;
                  return (
                    <motion.tr
                      key={caseKey}
                      onMouseEnter={() => setHoveredCase(caseKey)}
                      onMouseLeave={() => setHoveredCase(null)}
                      className="cursor-default transition-colors"
                      style={{
                        backgroundColor: isHovered ? gc.bg : i % 2 === 0 ? "white" : "rgba(30,26,22,0.02)",
                      }}
                    >
                      <td className="px-4 py-3">
                        <span
                          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: isHovered ? gc.color : "transparent",
                            color: isHovered ? "#F5EFE0" : gc.color,
                            transition: "all 0.15s",
                          }}
                        >
                          {caseKey}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16", fontSize: "15px" }}>
                          {forms[caseKey]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs" style={{ color: "#1E1A16", opacity: isHovered ? 0.8 : 0.45 }}>
                          {caseDescriptions[caseKey]}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Hover description */}
          <div
            className="mt-4 rounded-xl px-4 py-3 min-h-[52px] transition-all"
            style={{ backgroundColor: hoveredCase ? gc.bg : "rgba(30,26,22,0.03)", border: `1px solid ${hoveredCase ? gc.color : "rgba(30,26,22,0.08)"}` }}
          >
            {hoveredCase ? (
              <p className="text-sm" style={{ color: gc.color }}>
                <strong className="uppercase">{hoveredCase}:</strong>{" "}
                {caseDescriptions[hoveredCase]}
                {" — e.g. "}
                <span style={{ fontFamily: "Fraunces, serif" }}>{forms[hoveredCase]}</span>
              </p>
            ) : (
              <p className="text-sm" style={{ color: "#1E1A16", opacity: 0.4 }}>
                Hover over a row to see a detailed explanation of that case
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
