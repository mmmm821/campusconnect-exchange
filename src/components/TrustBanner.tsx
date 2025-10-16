import { Shield, MessageSquare, DollarSign, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Students Only",
    description: "Campus email verification ensures safe transactions"
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description: "Chat without sharing personal contact info"
  },
  {
    icon: DollarSign,
    title: "Fair Pricing",
    description: "Only 5% platform fee on completed sales"
  },
  {
    icon: Users,
    title: "Community Ratings",
    description: "Build trust with transparent reviews"
  }
];

const TrustBanner = () => {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 text-white">
          <h2 className="text-3xl font-bold mb-3">Why CampusConnect?</h2>
          <p className="text-white/90">Safe, trusted, and built specifically for student needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white hover:bg-white/20 transition-colors"
              >
                <Icon className="h-10 w-10 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
