import CustomText from "@/components/CustomText";
import HomeBody from "@/components/Home/HomeBody";
import TopBar from "@/components/TopBar";
import type { CompanyType } from "@/types/CompanyType";

interface HomePageProps {
  company: CompanyType;
}

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen">
        <TopBar />
        <HomeBody />
      </div>
    </>
  );
}
