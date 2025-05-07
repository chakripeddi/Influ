
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface BrandAssistantProps {
  onClose: () => void;
}

const suggestionMessages = [
  "How can I improve my campaign performance?",
  "Recommend influencers for a beauty product launch",
  "What's the best budget allocation strategy?",
  "How to optimize my ROI for current campaigns?"
];

const BrandAssistant: React.FC<BrandAssistantProps> = ({ onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          text: "Based on your campaign data, I recommend focusing on Instagram influencers with 10K-50K followers for better engagement rates. Your current ROI is highest with micro-influencers in the beauty niche.", 
          isUser: false 
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessages([...messages, { text: suggestion, isUser: true }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          text: "That's a great question! Looking at your data, I've prepared some insights and recommendations that can help optimize your strategy.", 
          isUser: false 
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 flex flex-col"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="mb-2 bg-white rounded-lg shadow-lg border w-80 sm:w-96 overflow-hidden flex flex-col"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 400, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center p-3 border-b bg-purple-50">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2 bg-purple-100">
                  <AvatarFallback className="text-purple-500">AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">Campaign Assistant</h3>
                  <p className="text-xs text-muted-foreground">Powered by AI</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 flex flex-col space-y-3">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`max-w-[90%] ${
                    message.isUser ? 'self-end bg-purple-500 text-white' : 'self-start bg-gray-100'
                  } rounded-lg p-3`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              ))}
              {isTyping && (
                <div className="self-start bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {messages.length <= 2 && !isTyping && (
              <div className="px-3 py-2">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestionMessages.map((suggestion, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm"
                      className="text-xs py-1 h-auto"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input 
                  className="flex-1"
                  placeholder="Type your question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} size="icon" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="self-end"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={() => setIsExpanded(!isExpanded)}
          size="icon"
          className={`h-12 w-12 rounded-full shadow-lg ${isExpanded ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'}`}
        >
          {isExpanded ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default BrandAssistant;
