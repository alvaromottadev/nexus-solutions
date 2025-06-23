import type { LocationType } from "@/types/LocationType";
import CustomText from "../CustomText";
import EditLocationDialog from "../Dialog/Location/EditLocation";

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
  const addressText = `${location.address.street}, ${location.address.number}, ${location.address.district}, ${location.address.city} - ${location.address.state}, ${location.address.country}`;
  return (
    <>
      <div className="p-5 flex items-center justify-between mt-[1rem] bg-[#f9f9f9] min-h-[4rem] w-full border-[1px] rounded-[0.5rem] border-black hover:translate-y-[-5px] duration-300 shadow-md">
        <div className="flex flex-col">
          <CustomText className="font-bold">{location.name}</CustomText>
          <CustomText className="break-words">{addressText}</CustomText>
        </div>
        <EditLocationDialog
          setLocations={setLocations}
          locations={locations}
          location={location}
        />
      </div>
    </>
  );
}
