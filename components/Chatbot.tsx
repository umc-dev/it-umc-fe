"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Maximize2, Minimize2, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendMessageToChatbot } from "@/actions/chatbot";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  isError?: boolean;
}

const suggestions = [
  "Siapa saja dosen Teknik Informatika?",
  "Apa saja fasilitas yang tersedia?",
  "Bagaimana cara mendaftar di UMC?",
  "Ada berita terbaru apa?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Halo! 👋 Saya asisten virtual Teknik Informatika Universitas Muhammadiyah Cirebon. Tanyakan apa saja seputar prodi, dosen, fasilitas, berita, dan lainnya!",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isFullScreen, isLoading]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && isOpen) {
        setIsFullScreen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsFullScreen(false);
      setIsClosing(false);
    }, 250);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    setInput("");
    const userMsgId = Date.now().toString();
    setMessages((prev) => [...prev, { id: userMsgId, role: "user", content: text }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToChatbot(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "bot", content: response.answer },
      ]);
    } catch (error: unknown) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          id: Date.now().toString(), 
          role: "bot", 
          content: "Mohon maaf, server AI PMB sedang sibuk atau terjadi gangguan jaringan. Ayo coba sebentar lagi!",
          isError: true 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <>
      {/* FAB Button — selalu tampil, hidden saat chat dibuka */}
      {!isOpen && !isClosing && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-2xl hover:bg-primary/90 flex items-center justify-center transition-all duration-300 z-40 hover:scale-105 notranslate"
          translate="no"
          aria-label="Tanya AI Teknik Informatika UMC"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Backdrop overlay — hanya tampil saat fullscreen */}
      {(isOpen || isClosing) && isFullScreen && (
        <div
          className={`fixed inset-0 bg-black/30 z-60 ${isClosing ? "chatbot-backdrop-exit" : "chatbot-backdrop-enter"}`}
        />
      )}

      {/* Chat Panel — selalu ada di DOM saat open, dikontrol via animasi */}
      {(isOpen || isClosing) && (
        <div
          className={`fixed z-70 bg-white flex flex-col shadow-2xl transition-all duration-300 ease-in-out overflow-hidden notranslate
            ${isClosing ? "chatbot-exit" : "chatbot-enter"}
            ${isFullScreen
              ? "inset-0 w-full h-full rounded-none"
              : "bottom-6 right-6 w-[380px] sm:w-[420px] h-[600px] rounded-2xl max-h-[calc(100vh-48px)] max-w-[calc(100vw-48px)]"
            }
            max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:rounded-none max-sm:bottom-0 max-sm:right-0 max-sm:max-h-full max-sm:max-w-full
          `}
          translate="no"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {/* Header Panel */}
          <div className="bg-linear-to-r from-primary to-primary/90 text-white p-4 flex items-center justify-between shrink-0 shadow-sm relative overflow-hidden">
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/4"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20 shadow-sm">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[15px] tracking-wide">Teknik Informatika Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <p className="text-xs text-white/90">Online & Siap Membantu</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-0.5 relative z-10 bg-white/10 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-1.5 hover:bg-white/20 rounded-md transition-colors hidden sm:block"
                title={isFullScreen ? "Keluar Full Screen" : "Mode Full Screen"}
              >
                {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <div className="w-px h-4 bg-white/20 mx-1 hidden sm:block"></div>

              <button
                onClick={handleClose}
                className="p-1.5 hover:bg-red-500/80 rounded-md transition-colors text-white"
                title="Tutup Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Message Timeline */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-5 bg-slate-50/50 space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 message-bubble ${
                  msg.role === "user" ? "ml-auto flex-row-reverse max-w-[85%]" : "max-w-[95%] sm:max-w-[92%]"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm
                  ${msg.role === "user" ? "bg-accent text-white" : "bg-white border border-border text-primary"}
                `}>
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div className={`flex flex-col gap-1 min-w-0 ${msg.role === "user" ? "items-end" : "items-start flex-1"}`}>
                  <div className={`px-4 py-3 rounded-2xl text-[14px] md:text-[15px] leading-relaxed relative w-full overflow-hidden
                    ${msg.role === "user"
                      ? "bg-primary text-white rounded-tr-sm shadow-md shadow-primary/10"
                      : msg.isError
                        ? "bg-red-50 text-red-600 border border-red-100 rounded-tl-sm shadow-sm"
                        : "bg-white border border-border/60 shadow-sm text-foreground rounded-tl-sm"
                    }
                  `}>
                    {msg.role === "user" ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      <div className="markdown-prose wrap-break-word">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({node, ...props}) => { void node; return <p className="mb-2.5 last:mb-0 leading-[1.6]" {...props} />; },
                            a: ({node, ...props}) => { void node; return <a className="text-accent underline hover:text-accent/80 font-medium break-all" {...props} />; },
                            ul: ({node, ...props}) => { void node; return <ul className="list-disc pl-5 mb-2.5 space-y-1" {...props} />; },
                            ol: ({node, ...props}) => { void node; return <ol className="list-decimal pl-5 mb-2.5 space-y-1" {...props} />; },
                            li: ({node, ...props}) => { void node; return <li className="mb-0.5" {...props} />; },
                            h3: ({node, ...props}) => { void node; return <h3 className="font-bold text-gray-800 text-base mb-2 mt-3" {...props} />; },
                            h4: ({node, ...props}) => { void node; return <h4 className="font-semibold text-gray-800 text-[15px] mb-1.5 mt-2" {...props} />; },
                            strong: ({node, ...props}) => { void node; return <strong className="font-bold text-gray-900" {...props} />; },
                            table: ({node, ...props}) => { void node; return <div className="overflow-x-auto my-3"><table className="w-full text-left border-collapse border border-border/80 text-[13px] md:text-[14px]" {...props} /></div>; },
                            thead: ({node, ...props}) => { void node; return <thead className="bg-muted/60 text-foreground font-semibold" {...props} />; },
                            tbody: ({node, ...props}) => { void node; return <tbody className="divide-y divide-border/60" {...props} />; },
                            tr: ({node, ...props}) => { void node; return <tr className="hover:bg-muted/30 transition-colors" {...props} />; },
                            th: ({node, ...props}) => { void node; return <th className="p-2 border border-border/80" {...props} />; },
                            td: ({node, ...props}) => { void node; return <td className="p-2 border border-border/80 align-top" {...props} />; }
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground px-1 opacity-70">
                    {msg.role === "user" ? "Anda" : "Assistant"}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[85%] message-bubble">
                <div className="w-8 h-8 rounded-full bg-white border border-border text-primary flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot size={16} />
                </div>
                <div className="bg-white border border-border/60 shadow-sm px-5 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-2.5">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium ml-1">Mencari jawaban...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Feature: Suggestions */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 pb-3 bg-slate-50/50">
              <p className="text-[11px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider ml-1">Coba Tanyakan:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    className="text-xs text-left bg-white border border-border/80 text-primary hover:border-accent hover:text-accent px-3 py-2 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Control */}
          <div className="p-3 sm:p-4 bg-white border-t border-border mt-auto shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 bg-slate-50 rounded-2xl p-1.5 pl-4 border border-border focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanyakan seputar Teknik Informatika UMC..."
                className="flex-1 bg-transparent text-[14px] md:text-[15px] text-foreground focus:outline-none placeholder:text-muted-foreground/70 py-2.5 min-w-0"
                disabled={isLoading}
                autoComplete="off"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 bg-accent text-white rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40 disabled:scale-95 hover:bg-accent/90 transition-all shadow-sm active:scale-95"
                title="Kirim Pesan"
              >
                <Send size={18} className="-translate-x-px translate-y-px" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground mt-3 opacity-80">
              <Bot size={11} className="text-primary/70" />
              <span>Ditenagai oleh UMC AI Groq. Jawaban bisa keliru.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
