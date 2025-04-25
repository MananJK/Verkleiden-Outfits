
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { MessageCircle } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your personal style assistant. What occasion are you dressing for today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'll help you find the perfect outfit for that occasion! Could you tell me your style preferences (casual, formal, etc.)?",
          isBot: true,
        },
      ]);
    }, 1000);
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
        />
        <Button onClick={handleSend} className="bg-primary hover:bg-primary/90">
          Send
        </Button>
      </div>
    </Card>
  );
};

export default Chatbot;
