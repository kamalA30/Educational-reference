import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompetitionUI from "@/components/CompetitionUI";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6">
        <CompetitionUI />
      </main>
      <Footer />
    </div>
  );
}
