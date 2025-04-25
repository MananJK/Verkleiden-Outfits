
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Your Personal Style Assistant</h1>
          <p className="text-xl text-gray-600 mb-8">
            Get personalized outfit recommendations and discover where to buy the perfect pieces for your style.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
            Start Styling
          </Button>
        </div>

        <div className="mt-12">
          <Chatbot />
        </div>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tell Us Your Style",
                description: "Share your preferences and the occasion you're dressing for",
              },
              {
                step: "2",
                title: "Get Recommendations",
                description: "Receive personalized outfit suggestions from our AI stylist",
              },
              {
                step: "3",
                title: "Shop with Ease",
                description: "Find and purchase your perfect pieces from our curated selections",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
