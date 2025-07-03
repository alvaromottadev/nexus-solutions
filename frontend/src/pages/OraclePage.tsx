import api from "@/client/api-client";
import CustomText from "@/components/CustomText";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import OracleDispatcher from "@/oracle/OracleDispatcher";
import type { OracleMessageType } from "@/types/oracle/OracleMessageType";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function OraclePage() {
  const initialMessage: OracleMessageType[] = [
    {
      status: 200,
      header: "Olá, eu sou o Oracle!",
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
      <div className="min-h-screen flex flex-col bg-[#202124]">
        <TopBar isOracle />
        <div className="flex flex-col m-10 flex-1 mb-10 justify-center">
          <div className="flex-1 flex flex-col gap-y-2 ">
            {messages.length > 0 &&
              messages.map((message, _index) => {
                if (message.author === "user") {
                  return (
                    <div
                      className={`${message.author === "user" && "text-right"}`}
                    >
                      <CustomText className="break-words text-white font-poppins">
                        {message.message.content}
                      </CustomText>
                    </div>
                  );
                }
                return <OracleDispatcher OracleResponse={message} />;
              })}
            {waitingResponse && (
              <CustomText className="text-[#e1e1e3]">
                Oracle está pensando...
              </CustomText>
            )}
          </div>
          <div className="w-[80%] self-center flex items-center justify-between gap-x-2">
            <Textarea
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="self-end rounded-[1rem] max-h-[5rem] border-none bg-[#38393c] w-full text-white font-poppins placeholder:text-white placeholder:font-poppins resize-none"
            />
            <Button
              onClick={sendMessage}
              className="h-[4rem] w-[4rem] cursor-pointer bg-[var(--primary-color)]"
            >
              <SendHorizonal color="white" className="w-full h-full" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
