import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, User, Plus, LogOut, Receipt } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-card border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Campus Connect</span>
            </div>
            
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for items..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button size="sm" className="bg-primary hover:bg-primary-hover" onClick={() => navigate("/sell")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Sell Item
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")}>
                  <Receipt className="h-4 w-4 mr-2" />
                  Transactions
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={() => navigate("/auth")}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
