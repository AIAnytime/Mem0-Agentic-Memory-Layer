import { Memory } from "mem0ai/oss";

let memoryInstance: Memory | null = null;

export interface MemoryConfig {
  enableGraph?: boolean;
  graphStore?: {
    provider: string;
    config: {
      url: string;
      username: string;
      password: string;
      database?: string;
    };
    customPrompt?: string;
  };
}

export function getMemoryInstance(): Memory {
  if (!memoryInstance) {
    const config: MemoryConfig = {
      enableGraph: true,
      graphStore: {
        provider: "neo4j",
        config: {
          url: process.env.NEO4J_URL!,
          username: process.env.NEO4J_USERNAME!,
          password: process.env.NEO4J_PASSWORD!,
          database: "neo4j",
        },
        customPrompt:
          "Please capture people, organizations, projects, preferences, and important facts mentioned by the user.",
      },
    };

    memoryInstance = new Memory(config);
  }

  return memoryInstance;
}

export const DEFAULT_USER_ID = "demo-user";
