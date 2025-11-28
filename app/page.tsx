"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useState, useEffect, useRef} from "react";
import FlightResults from "./flightResults";

type Message = {
  id: number;
  role: "user" | "ai";
  content: string | ReactNode;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nextId, setNextId] = useState(1);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: nextId,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNextId((id) => id + 1);
    setInput("");
    setIsLoading(true);

    try {
      const aiText = await fakeAiReply(trimmed);

      const aiMessage: Message = {
        id: nextId + 1,
        role: "ai",
        content: aiText,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setNextId((id) => id + 2);
    } catch (err) {
      const aiMessage: Message = {
        id: nextId + 1,
        role: "ai",
        content: "Sorry, something went wrong.",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setNextId((id) => id + 2);
    } finally {
      setIsLoading(false);
    }
  }

  // Replace this with a real API call (e.g. to OpenAI, your own route, etc.)
  async function fakeAiReply(prompt: string): Promise<ReactNode> {
    await new Promise((r) => setTimeout(r, 1000));
    return <FlightResults />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <Image
            src="/apex_logo.png"
            alt="APEX-GPT logo"
            width={80}
            height={60}
            className="h-11 w-auto"
          />
          <span className="text-[10px] rounded-full bg-blue-50 px-2 py-0.5 text-blue-600">
            demo
          </span>
        </div>

        <button className="m-3 rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700">
          + New chat
        </button>

        <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-3 text-xs">
          <div className="rounded-md bg-gray-100 px-3 py-2">
            <div className="font-medium">Today</div>
            <div className="mt-1 line-clamp-1 text-gray-600">
              London to Dubai Flight Booking
            </div>
          </div>

          <div className="rounded-md px-3 py-2 hover:bg-gray-50">
            <div className="font-medium">Onboarding flow</div>
            <div className="mt-1 line-clamp-1 text-gray-500">
              Help me design an AI agent…
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-3 py-3 text-[11px] text-gray-500">
          <div className="font-medium text-gray-700">Justin W</div>
          <div className="text-gray-500">demo@apex402.ai</div>
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col min-h-0">
        <header className="border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur">
          <h1 className="text-lg font-semibold">APEX-GPT</h1>
          <p className="text-xs text-gray-500">
            The First AI Agent Integrated with APEX-402
          </p>
        </header>

        <main className="flex flex-1 flex-col min-h-0">
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="text-sm text-gray-500">
                Start the conversation by typing a message below.
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-white text-gray-900 border border-gray-200"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div>{m.content}</div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-700">
                  AI is thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 bg-white/90 px-4 py-3 backdrop-blur"
          >
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-blue-600/40 flex items-center justify-center"
              >
                <svg
                  className={`h-4 w-4 ${isLoading ? "opacity-60" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4L20 12L4 20L7 12L4 4Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}