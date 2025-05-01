import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface Message {
  text: string;
  isBot: boolean;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { text: "What kind of clothing do you need today? Options: Formal, Wedding, Casual, Party, Traditional", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // add user message
    setMessages((prev) => [...prev, { text: input.trim(), isBot: false }]);
    setInput("");

    // bot loading message
    setMessages((prev) => [...prev, { text: "Generating recommendations...", isBot: true }]);
    setLoading(true);

    // call the backend
    fetch('http://localhost:5000/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ occasion: input.trim().toLowerCase() }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          localStorage.setItem('outfitRecommendations', JSON.stringify(data.outfits));
          navigate('/recommendations');
        } else {
          toast.error(data.message || 'No recommendations found.');
          setMessages((prev) => [...prev, { text: data.message || "Sorry, I couldn't find any outfits.", isBot: true }]);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Failed to fetch recommendations.');
        setMessages((prev) => [...prev, { text: 'An error occurred. Please try again later.', isBot: true }]);
      });
  };

  return (
    <Card className="w-full max-w-md mx-auto h-[500px] flex flex-col">
      <div className="p-4 bg-primary text-white flex items-center gap-2">
        <MessageCircle size={20} />
        <span>Style Assistant</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.isBot
                  ? "bg-gray-100"
                  : "bg-primary text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <Button 
          onClick={handleSend} 
          className="bg-primary hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </Card>
  );
};

export default Chatbot;