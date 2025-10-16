import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ItemGrid from "@/components/ItemGrid";
import TrustBanner from "@/components/TrustBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <ItemGrid />
        <TrustBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
