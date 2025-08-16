import api from "@/client/api-client";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import OracleDispatcher from "@/oracle/OracleDispatcher";
import type { OracleMessageType } from "@/types/oracle/OracleMessageType";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function OraclePage() {
  const initialMessage: OracleMessageType[] = [
    {
      status: 200,
      header: "Olá, eu sou o Oráculo!",
      message: {
        type: "text",
        schema: null,
        content: "Como posso te ajudar hoje?",
      },
      action: null,
      author: "oracle",
    },
  ];

  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<OracleMessageType[]>(initialMessage);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

  function sendMessage() {
    if (question === null || question === "") {
      toast.error("Erro ao enviar mensagem", {
        description: "Você não pode enviar mensagens vazias",
        duration: 2000,
      });
      return;
    }

    setQuestion("");
    setWaitingResponse(true);

    setMessages((prev) => [
      ...prev,
      {
        status: 200,
        header: null,
        message: { type: "text", schema: null, content: question },
        action: null,
        author: "user",
      },
    ]);

    const body = {
      question,
    };

    api
      .post(`/oracle`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const resMessage: OracleMessageType = res.data;
        setMessages((prev) => [...prev, resMessage]);
        setWaitingResponse(false);
      });
  }

  return (
    <>
      <div className="min-h-screen h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <TopBar isOracle />

        <div className="flex flex-col items-center justify-center py-6 px-6 text-center flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-poppins">
                Oráculo IA
              </h1>
              <p className="text-purple-200 font-poppins">
                Seu assistente inteligente para o almoxarifado
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-purple-300">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-poppins">
              Faça perguntas sobre produtos, localizações, movimentações e
              funcionários
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 min-h-0">
          <div className="flex-1 overflow-y-auto mb-4 space-y-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
            {messages.length > 0 &&
              messages.map((message, index) => {
                if (message.author === "user") {
                  return (
                    <div
                      key={index}
                      className="flex justify-end animate-fadeInUp"
                    >
                      <div className="flex items-end gap-3 max-w-[80%]">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-lg">
                          <p className="font-poppins text-sm leading-relaxed">
                            {message.message.content}
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={index}
                    className="flex justify-start animate-fadeInUp"
                  >
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-2xl rounded-bl-md shadow-lg">
                        <OracleDispatcher OracleResponse={message} />
                      </div>
                    </div>
                  </div>
                );
              })}

            {waitingResponse && (
              <div className="flex justify-start animate-fadeInUp">
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-2xl rounded-bl-md shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-purple-200 font-poppins text-sm">
                        Oráculo está pensando...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-xl mb-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Textarea
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Digite sua pergunta aqui..."
                  className="min-h-[3rem] max-h-[8rem] border-none bg-transparent text-white font-poppins placeholder:text-purple-300 resize-none focus:ring-0 focus:outline-none text-sm leading-relaxed"
                  rows={1}
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!question.trim() || waitingResponse}
                className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5 text-white" />
              </Button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-purple-300 font-poppins">
                Pressione Shift + Enter para nova linha, Enter para enviar
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
