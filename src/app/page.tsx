import { Chat } from "@/components/chat";
import { MemoryPanel } from "@/components/memory-panel";
import { ConceptSection } from "@/components/concept-section";
import { Brain, Github, ExternalLink, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff20,transparent)]"></div>
      </div>

      <header className="border-b bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Mem0 <span className="text-purple-600">Playground</span>
                </h1>
                <p className="text-xs text-gray-500">
                  Memory Layer for Agentic AI Applications
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/mem0ai/mem0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://docs.mem0.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/25 transition-all"
              >
                Documentation
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Enterprise-Grade AI Memory
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Build AI that <span className="gradient-text">Remembers</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Mem0 provides a self-improving memory layer for Agentic AI applications,
              enabling personalized AI experiences with persistent context across
              conversations.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <Chat />
            </div>
            <div className="lg:col-span-2">
              <MemoryPanel />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <ConceptSection />
        </div>
      </section>

      <footer className="border-t bg-white/80 backdrop-blur-xl py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                Mem0 Playground
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>Built with ❤️ by AI Anytime</span>
              <span className="hidden md:inline">•</span>
              <a
                href="https://aianytime.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                aianytime.net
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
