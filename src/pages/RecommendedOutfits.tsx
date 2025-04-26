
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useOutfitRecommendations } from "@/hooks/useOutfitRecommendations";
import { Button } from "@/components/ui/button";

const occasions = ["Formal", "Party", "Casual", "Wedding", "Traditional"];

const RecommendedOutfits = () => {
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const { data: outfits, isLoading } = useOutfitRecommendations(selectedOccasion);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Recommended Outfits</h1>
        
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {occasions.map((occasion) => (
            <Button
              key={occasion}
              variant={selectedOccasion === occasion ? "default" : "outline"}
              onClick={() => setSelectedOccasion(occasion)}
            >
              {occasion}
            </Button>
          ))}
        </div>

        {!selectedOccasion && (
          <div className="text-center text-gray-600">
            Select an occasion to see outfit recommendations
          </div>
        )}

        {isLoading && selectedOccasion && (
          <div className="text-center text-gray-600">
            Loading recommendations...
          </div>
        )}

        {outfits && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {outfits.upperwear.map((upper, index) => {
              const bottom = outfits.bottomwear[index];
              if (!bottom) return null;

              return (
                <Card key={upper.id} className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Outfit {index + 1}</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-medium">Upperwear</h4>
                      <p className="text-lg">{upper.name}</p>
                      <p className="text-primary">₹{upper.price}</p>
                      <p className="text-sm text-gray-600">
                        {upper.avg_rating}⭐ ({upper.rating_count} reviews)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Bottomwear</h4>
                      <p className="text-lg">{bottom.name}</p>
                      <p className="text-primary">₹{bottom.price}</p>
                      <p className="text-sm text-gray-600">
                        {bottom.avg_rating}⭐ ({bottom.rating_count} reviews)
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default RecommendedOutfits;
