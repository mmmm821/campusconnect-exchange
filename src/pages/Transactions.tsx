import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  item_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  commission: number;
  seller_payout: number;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
  completed_at: string | null;
  items: {
    title: string;
    photos: string[];
  };
  buyer_profile: {
    full_name: string;
  };
  seller_profile: {
    full_name: string;
  };
}

const Transactions = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select(`
          *,
          items (title, photos),
          buyer_profile:profiles!transactions_buyer_id_fkey (full_name),
          seller_profile:profiles!transactions_seller_id_fkey (full_name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTransactions(data as any || []);
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

  const updateTransactionStatus = async (id: string, status: "completed" | "cancelled") => {
    try {
      const { error } = await supabase
        .from("transactions")
        .update({ 
          status, 
          completed_at: status === "completed" ? new Date().toISOString() : null 
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Transaction ${status}`,
      });
      
      fetchTransactions();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Transactions</h1>
        
        {transactions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No transactions yet</p>
              <Button onClick={() => navigate("/")}>Browse Items</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{transaction.items.title}</CardTitle>
                      <CardDescription>
                        {user?.id === transaction.buyer_id ? "Buying from" : "Selling to"}{" "}
                        {user?.id === transaction.buyer_id
                          ? transaction.seller_profile.full_name
                          : transaction.buyer_profile.full_name}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-semibold">${transaction.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Commission:</span>
                      <span>${transaction.commission}</span>
                    </div>
                    {user?.id === transaction.seller_id && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Your Payout:</span>
                        <span className="font-semibold">${transaction.seller_payout}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    {transaction.status === "pending" && (
                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => updateTransactionStatus(transaction.id, "completed")}
                          className="flex-1"
                        >
                          Mark Complete
                        </Button>
                        <Button
                          onClick={() => updateTransactionStatus(transaction.id, "cancelled")}
                          variant="destructive"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Transactions;
