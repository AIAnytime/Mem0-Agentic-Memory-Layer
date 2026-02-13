"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Bot,
  User,
  Loader2,
  Brain,
  Search,
  Plus,
  Database,
  Trash2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ToolInvocation {
  toolName: string;
  args: Record<string, unknown>;
  result?: unknown;
  state: "call" | "result";
}

interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "data";
  content: string;
  toolInvocations?: ToolInvocation[];
}

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
      onError: (error) => {
        console.error("Chat error:", error);
      },
    });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showToolDetails, setShowToolDetails] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      console.error("Chat error state:", error);
    }
  }, [error]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getToolIcon = (toolName: string) => {
    switch (toolName) {
      case "searchMemory":
        return <Search className="h-3.5 w-3.5" />;
      case "createMemory":
        return <Plus className="h-3.5 w-3.5" />;
      case "getAllMemories":
        return <Database className="h-3.5 w-3.5" />;
      case "deleteMemory":
        return <Trash2 className="h-3.5 w-3.5" />;
      default:
        return <Brain className="h-3.5 w-3.5" />;
    }
  };

  const getToolLabel = (toolName: string) => {
    switch (toolName) {
      case "searchMemory":
        return "Searching Memories";
      case "createMemory":
        return "Creating Memory";
      case "getAllMemories":
        return "Fetching All Memories";
      case "deleteMemory":
        return "Deleting Memory";
      default:
        return toolName;
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI Assistant with Memory</h3>
          <p className="text-xs text-gray-500">Powered by Mem0 + Neo4j Graph Store</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Connected
          </span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Start a Conversation
              </h4>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Share something about yourself and I&apos;ll remember it! Try telling me
                your name, interests, or any important information.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {[
                  "My name is...",
                  "I work at...",
                  "I'm interested in...",
                  "What do you know about me?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    className="text-xs px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                    onClick={() => {
                      const event = {
                        target: { value: suggestion },
                      } as React.ChangeEvent<HTMLInputElement>;
                      handleInputChange(event);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {messages.map((message: Message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[80%] space-y-2",
                    message.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  {message.toolInvocations && message.toolInvocations.length > 0 && (
                    <div className="space-y-1.5">
                      {message.toolInvocations.map((tool, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-2 text-xs bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200/50 cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors"
                          onClick={() =>
                            setShowToolDetails(
                              showToolDetails === `${message.id}-${idx}`
                                ? null
                                : `${message.id}-${idx}`
                            )
                          }
                        >
                          {tool.state === "call" ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            getToolIcon(tool.toolName)
                          )}
                          <span className="font-medium">
                            {getToolLabel(tool.toolName)}
                          </span>
                          {tool.state === "result" && (
                            <span className="text-emerald-600">✓</span>
                          )}
                        </motion.div>
                      ))}
                      {showToolDetails &&
                        message.toolInvocations.map(
                          (tool, idx) =>
                            showToolDetails === `${message.id}-${idx}` && (
                              <motion.div
                                key={`detail-${idx}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs bg-gray-50 rounded-lg p-3 font-mono overflow-x-auto border"
                              >
                                <div className="text-gray-500 mb-1">Arguments:</div>
                                <pre className="text-gray-700">
                                  {JSON.stringify(tool.args, null, 2)}
                                </pre>
                                {tool.result && (
                                  <>
                                    <div className="text-gray-500 mt-2 mb-1">
                                      Result:
                                    </div>
                                    <pre className="text-gray-700">
                                      {JSON.stringify(tool.result, null, 2)}
                                    </pre>
                                  </>
                                )}
                              </motion.div>
                            )
                        )}
                    </div>
                  )}

                  {message.content && (
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 shadow-sm",
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md"
                          : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 items-start"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <span
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50/50">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Tell me something about yourself..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-gray-400 transition-all"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-xl px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
