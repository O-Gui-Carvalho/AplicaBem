import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const borderClass = score > 69
    ? 'border-green-400'
    : score > 49
      ? 'border-yellow-400'
      : 'border-red-400';

  // Determine icon based on score
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Excelente!'
    : score > 49
      ? 'Bom Começo'
      : 'Precisa de Melhorias';

  return (
    <div className={`bg-[#1f1f1f] border ${borderClass} to-white rounded-2xl shadow-md w-full p-6`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">Pontuação ATS - {score}/100</h2>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <h3 className="text-xl text-white font-semibold mb-2">{subtitle}</h3>
        <p className="text-white mb-4">
          Essa pontuação representa o desempenho provável do seu currículo nos Sistemas de Rastreamento de Candidatos usados pelos empregadores.
        </p>

        {/* Suggestions list */}
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-5 h-5 mt-1"
              />
              <p className={suggestion.type === "good" ? "text-green-600" : "text-amber-600"}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-white italic">
        Continue refinando seu currículo para aumentar suas chances de passar pelos filtros do ATS e chegar às mãos dos recrutadores.
      </p>
    </div>
  )
}

export default ATS