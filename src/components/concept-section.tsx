"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Search,
  Plus,
  Database,
  Network,
  Zap,
  Code2,
  GitBranch,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Plus,
    title: "Add Memory",
    description:
      "Store conversations and important user information for future reference.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Search,
    title: "Search Memory",
    description:
      "Find relevant information using semantic search across all stored memories.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Database,
    title: "Get & Update",
    description:
      "Retrieve specific memories by ID and modify existing memory contents.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Network,
    title: "Graph Relations",
    description:
      "Store and query relationships between entities using Neo4j graph database.",
    color: "from-orange-500 to-red-600",
  },
];

const codeExamples = {
  setup: `import { Memory } from "mem0ai/oss";

// Initialize with Neo4j Graph Store
const config = {
  enableGraph: true,
  graphStore: {
    provider: "neo4j",
    config: {
      url: process.env.NEO4J_URL,
      username: process.env.NEO4J_USERNAME,
      password: process.env.NEO4J_PASSWORD,
    },
  },
};

const memory = new Memory(config);`,

  add: `// Save information to memory
const messages = [
  { role: "user", content: "I work at Studist as an AI Engineer" }
];

const result = await memory.add(messages, { 
  userId: "demo-user" 
});

// Result includes extracted memories and relations:
// {
//   results: [{ memory: "Works at Studist as AI Engineer" }],
//   relations: [
//     { source: "user", relationship: "works_at", destination: "studist" }
//   ]
// }`,

  search: `// Semantic search across memories
const results = await memory.search(
  "Where does the user work?",
  { 
    userId: "demo-user",
    limit: 5,
    rerank: true  // Use reranking for better results
  }
);

// Returns memories with relevance scores
results.results.forEach((hit) => {
  console.log(hit.memory, hit.score);
});`,

  tools: `// AI SDK Tool Integration
import { tool } from "ai";
import { z } from "zod";

export const searchMemory = tool({
  description: "Search for relevant memories",
  parameters: z.object({
    query: z.string().describe("Search query"),
  }),
  execute: async ({ query }) => {
    const results = await memory.search(query, { 
      userId: "demo-user" 
    });
    return { memories: results.results };
  },
});

// Use in streamText
const result = streamText({
  model: openai("gpt-4o"),
  tools: { searchMemory, createMemory },
  system: "You can search and create memories.",
});`,
};

export function ConceptSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            How <span className="gradient-text">Mem0</span> Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mem0 provides a self-improving memory layer for Agentic AI applications,
            enabling persistent memory capabilities for personalized AI experiences.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
              <CardContent className="p-5">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-lg`}
                >
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex items-center gap-3">
            <Code2 className="h-5 w-5 text-purple-400" />
            <span className="text-white font-medium">Implementation Guide</span>
          </div>
          <CardContent className="p-0">
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-gray-50 p-0 h-auto">
                {[
                  { value: "setup", label: "Setup", icon: GitBranch },
                  { value: "add", label: "Add Memory", icon: Plus },
                  { value: "search", label: "Search", icon: Search },
                  { value: "tools", label: "AI SDK Tools", icon: Zap },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-white px-6 py-3 gap-2"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(codeExamples).map(([key, code]) => (
                <TabsContent key={key} value={key} className="m-0">
                  <div className="relative">
                    <pre className="p-6 overflow-x-auto text-sm bg-gray-950 text-gray-100">
                      <code className="font-mono">{code}</code>
                    </pre>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Vector Store
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Stores memories as embeddings using OpenAI&apos;s text-embedding-3-small
                model, enabling powerful semantic search capabilities across all
                stored information.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg">
                <Network className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Neo4j Graph Store
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Automatically extracts and stores relationships between entities.
                Query &quot;Teachme AI&quot; to retrieve connected information about
                &quot;Studist&quot; through graph relationships.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                LLM Integration
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Uses GPT-4 for intelligent information extraction and structuring.
                Automatically identifies important facts from conversations to
                store as memories.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
