import type { MovementType } from "@/types/MovementType";

interface OracleListMovementProps {
  header: string;
  content: MovementType[];
}

export default function OracleListMovement({
  header,
  content,
}: OracleListMovementProps) {
  return (
    <div className="flex flex-col text-white font-poppins">
      {header && (
        <h3 className="text-lg font-semibold text-purple-200 mb-3">
          {header}
        </h3>
      )}
      <div className="space-y-2">
        {content.map((movement, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="font-medium text-green-200">🔄 {movement.type}</span>
            </div>
            <div className="mt-2 space-y-1 ml-4">
              <p className="text-xs text-gray-300">
                <span className="text-purple-300">Produto:</span> {movement.product?.name || 'N/A'}
              </p>
              <p className="text-xs text-gray-300">
                <span className="text-purple-300">Quantidade:</span> {movement.quantity}
              </p>
              {movement.date && (
                <p className="text-xs text-gray-300">
                  <span className="text-purple-300">Data:</span> {new Date(movement.date).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
