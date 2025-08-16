import type { ReactNode } from "react";

interface AdvantagesCardProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function AdvantagesCard({
  children,
  title,
  description,
}: AdvantagesCardProps) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-[var(--primary-color)]/30 transition-all duration-300 hover:-translate-y-2">
      <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-color)]/10 to-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <div className="text-[var(--primary-color)] group-hover:text-[var(--primary-color)]">
          {children}
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--primary-color)] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--primary-color)]/20 transition-all duration-300"></div>
    </div>
  );
}
