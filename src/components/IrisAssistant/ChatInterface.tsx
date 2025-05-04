'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Spinner, Card, CardBody } from '@heroui/react';
import { Send } from 'lucide-react'; // Removed BrainCircuit for now
import { motion } from 'framer-motion'; // Removed AnimatePresence for now

// Define message types
interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string | null;
  name?: string;
  tool_call_id?: string;
  // Add function call/result structure later if needed
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Iris, your real estate assistant. How can I help you today? Ask me about a property address!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const userMessageContent = input.trim();
    if (!userMessageContent) return;

    const newUserMessage: Message = { role: 'user', content: userMessageContent };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare messages for API
      const apiMessages = messages
         .filter(msg => msg.role === 'user' || msg.role === 'assistant')
         .map(({ role, content }) => ({ role, content }));
      apiMessages.push({ role: 'user', content: userMessageContent });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await res.json();

      if (data.response) {
          let assistantResponse: Message;
          // Handle function call results
          if (data.response.function_name && data.response.function_result) {
              const formattedResult = JSON.stringify(data.response.function_result, null, 2);
              assistantResponse = {
                 role: 'assistant',
                 // Display formatted result in a code block
                 content: `Okay, I found the following information for that address:\n\`\`\`json\n${formattedResult}\n\`\`\``,
              };
          } else {
            // Standard text response
            assistantResponse = {
                role: 'assistant',
                content: data.response.content
            };
          }
          setMessages(prev => [...prev, assistantResponse]);
      } else {
         throw new Error('Unexpected response structure from API');
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col shadow-lg overflow-hidden h-full dark:bg-content1">
      <CardBody className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-content2'
              }`}
            >
               {/* Using <pre> for better formatting of potential code blocks */}
               <pre className="whitespace-pre-wrap text-sm font-sans">{msg.content}</pre>
            </div>
          </motion.div>
        ))}
         {isLoading && (
          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            className="flex justify-start"
          >
            <div className="max-w-[75%] p-3 rounded-lg bg-content2 flex items-center">
               <Spinner size="sm" color="current" />
               <span className="ml-2 text-sm italic">Iris is thinking...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </CardBody>
      <form onSubmit={handleSendMessage} className="p-3 flex items-center gap-2">
        <Input
          aria-label="Chat message"
          placeholder="Ask Iris about a property..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          fullWidth
        />
        <Button
           type="submit"
           color="primary"
           isIconOnly
           aria-label="Send Message"
           isLoading={isLoading}
           disabled={!input.trim()}
        >
          {!isLoading && <Send className="w-5 h-5" />}
        </Button>
      </form>
    </Card>
  );
} 