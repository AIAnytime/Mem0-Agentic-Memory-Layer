"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Brain,
  RefreshCw,
  Trash2,
  Database,
  Clock,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Memory {
  id: string;
  memory: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, unknown>;
}

export function MemoryPanel() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchMemories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/memories");
      const data = await res.json();
      if (data.success) {
        setMemories(data.memories || []);
      }
    } catch (error) {
      console.error("Failed to fetch memories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const deleteMemory = async (memoryId: string) => {
    setDeleting(memoryId);
    try {
      const res = await fetch("/api/memories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memoryId }),
      });
      const data = await res.json();
      if (data.success) {
        setMemories((prev) => prev.filter((m) => m.id !== memoryId));
      }
    } catch (error) {
      console.error("Failed to delete memory:", error);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <Database className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">
                Memory Store
              </CardTitle>
              <p className="text-xs text-gray-500">
                {memories.length} memories stored
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchMemories}
            disabled={loading}
            className="h-8 gap-1.5"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {loading && memories.length === 0 ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Loading memories...</p>
              </div>
            ) : memories.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  No Memories Yet
                </h4>
                <p className="text-xs text-gray-500 max-w-[200px] mx-auto">
                  Start chatting and the AI will remember important information
                  about you.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {memories.map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-white rounded-xl p-3 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {memory.memory}
                        </p>
                        {(memory.created_at || memory.updated_at) && (
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(
                                memory.updated_at || memory.created_at || ""
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 hover:bg-red-50"
                        onClick={() => deleteMemory(memory.id)}
                        disabled={deleting === memory.id}
                      >
                        {deleting === memory.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
