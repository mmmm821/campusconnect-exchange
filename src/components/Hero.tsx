import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Buy & Sell on Your{" "}
              <span className="text-accent">Campus</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/90">
              Join thousands of students discovering great deals on textbooks, electronics, furniture, and more. Safe, local, and built for your college community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Start Browsing
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                List an Item
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Campus marketplace community"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
