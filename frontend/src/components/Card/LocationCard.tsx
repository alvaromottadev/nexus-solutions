import type { LocationType } from "@/types/LocationType";
import EditLocationDialog from "../Dialog/Location/EditLocation";
import { MapPin, Building2, Calendar } from "lucide-react";

interface LocationCardProps {
  location: LocationType;
  setLocations: (locations: LocationType[]) => void;
  locations: LocationType[];
}

export default function LocationCard({
  location,
  setLocations,
  locations,
}: LocationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatAddress = (address: LocationType["address"]) => {
    const parts = [
      address.street,
      address.number,
      address.complement,
      address.district,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ].filter(Boolean);

    return parts.join(", ");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Building2 className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--primary-color)] transition-colors duration-300">
                {location.name}
              </h3>
            </div>

            <div className="flex items-start space-x-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">
                {formatAddress(location.address)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Criado em {formatDate(location.createdAt)}</span>
          </div>

          {location.updatedAt && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>Atualizado em {formatDate(location.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            ID: {location.id.slice(0, 8)}...
          </div>
          <EditLocationDialog
            setLocations={setLocations}
            locations={locations}
            location={location}
          />
        </div>
      </div>
    </div>
  );
}
