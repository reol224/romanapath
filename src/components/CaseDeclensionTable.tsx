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

export function CaseDeclensionTable({ isOpen, onClose }: CaseDeclensionTableProps) {
  const [hoveredCase, setHoveredCase] = useState<CaseKey | null>(null);
  const [selectedNoun, setSelectedNoun] = useState(0);
  const [showDefinite, setShowDefinite] = useState(false);

  if (!isOpen) return null;

  const noun: CaseRow = caseExamples[selectedNoun];
  const forms = showDefinite ? noun.definite : noun.forms;

  const genderDuoColors: Record<string, { color: string; bg: string; border: string; shadow: string }> = {
    masculine: { color: "#1CB0F6", bg: "#E8F4FD", border: "#1CB0F6", shadow: "#0A90D0" },
    feminine: { color: "#FF4B4B", bg: "#FFECEC", border: "#FF4B4B", shadow: "#CC2A2A" },
    neuter: { color: "#58CC02", bg: "#E6F9E8", border: "#58CC02", shadow: "#46A302" },
  };
  const dc = genderDuoColors[noun.gender] || genderDuoColors.neuter;

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
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>📊 Case Declension</h2>
            <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Tap a row to see its usage</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
            <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
          </button>
        </div>

        <div className="p-6">
          {/* Noun selector */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {caseExamples.map((c, i) => {
              const d = genderDuoColors[c.gender] || genderDuoColors.neuter;
              return (
                <button
                  key={c.noun}
                  onClick={() => setSelectedNoun(i)}
                  className="px-4 py-2 rounded-2xl font-black text-sm transition-all border-2"
                  style={{
                    backgroundColor: selectedNoun === i ? d.color : "white",
                    color: selectedNoun === i ? "white" : d.color,
                    borderColor: d.color,
                    fontFamily: "Nunito, sans-serif",
                    boxShadow: selectedNoun === i ? `0 4px 0 ${d.shadow}` : "0 4px 0 #E5E5E5",
                  }}
                >
                  {c.noun}
                  <span className="ml-1.5 text-xs font-bold opacity-80">({c.english})</span>
                </button>
              );
            })}
          </div>

          {/* Definite toggle + gender badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Form:</span>
            <div className="flex rounded-2xl overflow-hidden border-2" style={{ borderColor: "#E5E5E5" }}>
              {["Indefinite", "Definite"].map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => setShowDefinite(i === 1)}
                  className="px-4 py-1.5 text-sm font-black transition-all"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    backgroundColor: showDefinite === (i === 1) ? "#3C3C3C" : "white",
                    color: showDefinite === (i === 1) ? "white" : "#AFAFAF",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <span className="text-xs font-black px-2.5 py-1 rounded-full border-2" style={{ fontFamily: "Nunito, sans-serif", backgroundColor: dc.bg, color: dc.color, borderColor: dc.border }}>
              {noun.gender}
            </span>
          </div>

          {/* Case table */}
          <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: "#E5E5E5" }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#3C3C3C" }}>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider" style={{ fontFamily: "Nunito, sans-serif", color: "white", width: "140px" }}>Case</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider" style={{ fontFamily: "Nunito, sans-serif", color: "white" }}>Form</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider" style={{ fontFamily: "Nunito, sans-serif", color: "white" }}>Usage</th>
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
                        backgroundColor: isHovered ? dc.bg : i % 2 === 0 ? "white" : "#FAFAFA",
                        borderBottom: "2px solid #F0F0F0",
                      }}
                    >
                      <td className="px-4 py-3">
                        <span
                          className="text-xs font-black uppercase tracking-wider px-2 py-1 rounded-lg border-2"
                          style={{
                            fontFamily: "Nunito, sans-serif",
                            backgroundColor: isHovered ? dc.color : "white",
                            color: isHovered ? "white" : dc.color,
                            borderColor: dc.color,
                            transition: "all 0.15s",
                          }}
                        >
                          {caseKey}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-black text-base" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
                          {forms[caseKey]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif", color: isHovered ? dc.color : "#AFAFAF" }}>
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
            className="mt-4 rounded-2xl px-4 py-3 min-h-[52px] transition-all border-2"
            style={{ backgroundColor: hoveredCase ? dc.bg : "#F7F7F7", borderColor: hoveredCase ? dc.border : "#E5E5E5" }}
          >
            {hoveredCase ? (
              <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: dc.color }}>
                <strong className="font-black uppercase">{hoveredCase}:</strong>{" "}
                {caseDescriptions[hoveredCase]}
                {" — e.g. "}
                <span className="font-black">{forms[hoveredCase]}</span>
              </p>
            ) : (
              <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                Hover over a row to see a detailed explanation of that case
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
