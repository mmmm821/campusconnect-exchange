import { ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">CampusConnect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted campus marketplace for buying and selling student essentials.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Buyers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Items</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Search</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety Tips</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Sellers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">List an Item</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Seller Dashboard</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing Guide</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 CampusConnect Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
