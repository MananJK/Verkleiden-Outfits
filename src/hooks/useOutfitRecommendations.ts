
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FashionItem {
  id: string;
  name: string;
  price: number;
  avg_rating: number;
  rating_count: number;
  occasion: string;
  wear_type: string;
}

export const useOutfitRecommendations = (occasion: string) => {
  return useQuery({
    queryKey: ["outfits", occasion],
    queryFn: async () => {
      // Get upperwear items
      const { data: upperwear, error: upperError } = await supabase
        .from("fashion_items")
        .select("*")
        .eq("occasion", occasion.toLowerCase())
        .eq("wear_type", "upperwear")
        .order("price", { ascending: true })
        .order("rating_count", { ascending: false })
        .order("avg_rating", { ascending: false })
        .limit(5);

      if (upperError) throw upperError;

      // Get bottomwear items
      const { data: bottomwear, error: bottomError } = await supabase
        .from("fashion_items")
        .select("*")
        .eq("occasion", occasion.toLowerCase())
        .eq("wear_type", "bottomwear")
        .order("price", { ascending: true })
        .order("rating_count", { ascending: false })
        .order("avg_rating", { ascending: false })
        .limit(5);

      if (bottomError) throw bottomError;

      return {
        upperwear: upperwear as FashionItem[],
        bottomwear: bottomwear as FashionItem[],
      };
    },
    enabled: !!occasion,
  });
};
