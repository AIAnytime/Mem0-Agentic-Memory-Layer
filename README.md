# Mem0 Playground

Enterprise-grade demonstration of [Mem0](https://mem0.ai) - A self-improving memory layer for Agentic AI applications with Neo4j Graph Store integration.

## Features

- **Persistent Memory Layer**: Store and retrieve AI memories with semantic search
- **Neo4j Graph Store**: Visualize entity relationships in a knowledge graph
- **Interactive Chat**: Real-time AI conversations with memory capabilities
- **Memory Management**: View, search, and delete stored memories
- **Educational Content**: Learn about Mem0's features with live code examples
- **Beautiful UI**: Modern, responsive design with TailwindCSS and Framer Motion

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: TailwindCSS, Radix UI, Framer Motion
- **AI**: OpenAI API, Vercel AI SDK
- **Memory**: Mem0 with Neo4j Graph Store
- **Database**: Neo4j for graph-based memory storage

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AIAnytime/Mem0-Agentic-GraphRAG-.git
cd Mem0-Agentic-GraphRAG-
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEO4J_URL=your_neo4j_url_here
NEO4J_USERNAME=your_neo4j_username_here
NEO4J_PASSWORD=your_neo4j_password_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Chat Interface
- Type messages in the chat input
- The AI will automatically create memories from your conversations
- Use memory tools to search, create, or manage memories

### Memory Panel
- View all stored memories in real-time
- Refresh to see the latest memories
- Delete individual memories with one click

### Concept Section
- Explore Mem0's core features
- View code examples for each operation
- Understand how memory operations work

## Key Concepts

### Memory Operations

**Add Memory**
```typescript
await memory.add("User prefers dark mode", { user_id: "user123" });
```

**Search Memory**
```typescript
const results = await memory.search("user preferences", { user_id: "user123" });
```

**Get All Memories**
```typescript
const memories = await memory.getAll({ user_id: "user123" });
```

**Delete Memory**
```typescript
await memory.delete(memoryId);
```

## Neo4j Graph Store

The application uses Neo4j to store entity relationships, enabling:
- Complex relationship queries
- Entity extraction from conversations
- Knowledge graph visualization
- Contextual memory retrieval

## Learn More

- [Mem0 Documentation](https://docs.mem0.ai)
- [Neo4j Documentation](https://neo4j.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License

## Links

- Website: [aianytime.net](https://aianytime.net)
- YouTube: [AI Anytime](https://www.youtube.com/@AIAnytime)

---

Built with ❤️ by [AI Anytime](https://aianytime.net)
