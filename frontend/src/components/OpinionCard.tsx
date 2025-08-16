import { Star, Quote } from "lucide-react";

interface OpinionCardProps {
  text: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export default function OpinionCard({
  text,
  author,
  role,
  company,
  rating,
}: OpinionCardProps) {
  return (
    <div className="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
      <div className="mb-6">
        <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center">
          <Quote className="w-6 h-6 text-[var(--primary-color)]" />
        </div>
      </div>

      <div className="flex items-center gap-1 mb-4">
        {[...Array(rating)].map((_, index) => (
          <Star
            key={index}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
        "{text}"
      </blockquote>

      <div className="border-t border-gray-100 pt-4">
        <div className="font-semibold text-gray-900">{author}</div>
        <div className="text-sm text-gray-600">{role}</div>
        <div className="text-sm text-[var(--primary-color)] font-medium">
          {company}
        </div>
      </div>
    </div>
  );
}
