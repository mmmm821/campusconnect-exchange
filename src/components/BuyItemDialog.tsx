import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BuyItemDialogProps {
  item: {
    id: string;
    title: string;
    price: number;
    seller_id: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COMMISSION_RATE = 0.05; // 5% commission

const BuyItemDialog = ({ item, open, onOpenChange }: BuyItemDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const commission = item.price * COMMISSION_RATE;
  const sellerPayout = item.price - commission;

  const handleBuy = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to buy items",
      });
      return;
    }

    if (user.id === item.seller_id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You cannot buy your own item",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("transactions").insert({
        item_id: item.id,
        buyer_id: user.id,
        seller_id: item.seller_id,
        amount: item.price,
        commission,
        seller_payout: sellerPayout,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transaction created! Check your transactions page.",
      });
      
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy {item.title}</DialogTitle>
          <DialogDescription>
            Review transaction details before confirming
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Item Price:</span>
            <span className="font-semibold">₹{item.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Platform Fee (5%):</span>
            <span>₹{commission.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Seller Receives:</span>
            <span>₹{sellerPayout.toFixed(2)}</span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-lg">₹{item.price}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleBuy} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyItemDialog;
