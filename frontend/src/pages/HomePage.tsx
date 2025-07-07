import HomeBody from "@/components/Home/HomeBody";
import TopBar from "@/components/TopBar";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <HomeBody />
      </div>
    </>
  );
}
