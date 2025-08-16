import type { LocationType } from "@/types/LocationType";

interface OracleListLocationProps {
  header: string;
  content: LocationType[];
}

export default function OracleListLocation({
  header,
  content,
}: OracleListLocationProps) {
  return (
    <div className="flex flex-col text-white font-poppins">
      {header && (
        <h3 className="text-lg font-semibold text-purple-200 mb-3">{header}</h3>
      )}
      <div className="space-y-2">
        {content.map((location, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="font-medium text-blue-200">
                📍 {location.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
