
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

interface Outfit {
  upperwear: {
    name: string;
    price: number;
    avg_rating: number;
    ratingCount: number;
  };
  bottomwear: {
    name: string;
    price: number;
    avg_rating: number;
    ratingCount: number;
  };
}

const RecommendedOutfits = () => {
  // In a real implementation, this would come from your backend
  const outfits: Outfit[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Recommended Outfits</h1>
        {outfits.length === 0 ? (
          <div className="text-center text-gray-600">
            No recommendations available yet.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {outfits.map((outfit, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-4">Outfit {index + 1}</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-medium">Upperwear</h4>
                    <p className="text-lg">{outfit.upperwear.name}</p>
                    <p className="text-primary">₹{outfit.upperwear.price}</p>
                    <p className="text-sm text-gray-600">
                      {outfit.upperwear.avg_rating}⭐ ({outfit.upperwear.ratingCount} reviews)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Bottomwear</h4>
                    <p className="text-lg">{outfit.bottomwear.name}</p>
                    <p className="text-primary">₹{outfit.bottomwear.price}</p>
                    <p className="text-sm text-gray-600">
                      {outfit.bottomwear.avg_rating}⭐ ({outfit.bottomwear.ratingCount} reviews)
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RecommendedOutfits;
