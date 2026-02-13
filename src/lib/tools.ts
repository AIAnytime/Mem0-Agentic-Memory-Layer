import { tool } from "ai";
import { z } from "zod";
import { getMemoryInstance, DEFAULT_USER_ID } from "./memory";

export const searchMemory = tool({
  description:
    "Search for relevant memories that have been previously saved. Use this to find information about the user that was mentioned in past conversations.",
  parameters: z.object({
    query: z.string().describe("The search query to find relevant memories"),
  }),
  execute: async ({ query }) => {
    try {
      const memory = getMemoryInstance();
      const results = await memory.search(query, {
        userId: DEFAULT_USER_ID,
        limit: 5,
      });

      return {
        success: true,
        memories: results.results || [],
        count: results.results?.length || 0,
        message: results.results?.length
          ? `Found ${results.results.length} relevant memories`
          : "No memories found matching your query",
      };
    } catch (error) {
      console.error("Search memory error:", error);
      return {
        success: false,
        memories: [],
        count: 0,
        message: "Failed to search memories",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

export const createMemory = tool({
  description:
    "Save important information to memory for future reference. Use this when the user shares personal details, preferences, or important facts they want you to remember.",
  parameters: z.object({
    content: z.string().describe("The information to save to memory"),
  }),
  execute: async ({ content }) => {
    try {
      console.log("Creating memory with content:", content);
      const memory = getMemoryInstance();
      const messages = [{ role: "user" as const, content }];
      const result = await memory.add(messages, { userId: DEFAULT_USER_ID });
      console.log("Memory created successfully:", result);

      return {
        success: true,
        message: "Memory saved successfully",
        result,
      };
    } catch (error) {
      console.error("Create memory error:", error);
      return {
        success: false,
        message: "Failed to save memory",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

export const getAllMemories = tool({
  description:
    "Get all memories stored for the current user. Use this when you need a complete overview of what you know about the user.",
  parameters: z.object({}),
  execute: async () => {
    try {
      const memory = getMemoryInstance();
      const results = await memory.getAll({ userId: DEFAULT_USER_ID });

      return {
        success: true,
        memories: results.results || [],
        count: results.results?.length || 0,
      };
    } catch (error) {
      console.error("Get all memories error:", error);
      return {
        success: false,
        memories: [],
        count: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

export const deleteMemory = tool({
  description: "Delete a specific memory by its ID.",
  parameters: z.object({
    memoryId: z.string().describe("The ID of the memory to delete"),
  }),
  execute: async ({ memoryId }) => {
    try {
      const memory = getMemoryInstance();
      await memory.delete(memoryId);

      return {
        success: true,
        message: `Memory ${memoryId} deleted successfully`,
      };
    } catch (error) {
      console.error("Delete memory error:", error);
      return {
        success: false,
        message: "Failed to delete memory",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

export const memoryTools = {
  searchMemory,
  createMemory,
  getAllMemories,
  deleteMemory,
};
