import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

// Mock data
const items = [
  {
    id: 1,
    title: "Calculus Textbook - 8th Edition",
    price: 550,
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400",
    seller: "Sarah M.",
    rating: 4.9,
    location: "North Campus",
    category: "Textbooks"
  },
  {
    id: 2,
    title: "MacBook Pro 2020 - 13 inch",
    price: 85000,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    seller: "Mike T.",
    rating: 5.0,
    location: "West Dorm",
    category: "Electronics"
  },
  {
    id: 3,
    title: "Mini Fridge - Perfect for Dorm",
    price: 9000,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400",
    seller: "Jessica L.",
    rating: 4.7,
    location: "South Campus",
    category: "Furniture"
  },
  {
    id: 4,
    title: "Gaming Chair - Ergonomic",
    price: 7000,
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400",
    seller: "David K.",
    rating: 4.8,
    location: "East Dorm",
    category: "Furniture"
  },
  {
    id: 6,
    title: "Chemistry Lab Manual",
    price: 250,
    condition: "New",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    seller: "Alex P.",
    rating: 5.0,
    location: "Science Building",
    category: "Textbooks"
  }
];

const ItemGrid = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recent Listings</h2>
            <p className="text-muted-foreground">Fresh deals from your campus community</p>
          </div>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group cursor-pointer overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
                  {item.condition}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary mt-1">₹{item.price}</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {item.seller[0]}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{item.seller}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold">{item.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemGrid;
