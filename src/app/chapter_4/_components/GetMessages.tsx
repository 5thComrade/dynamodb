"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import messageService from "@/services/message.service";
import Link from "next/link";

interface Message {
  pk: string;
  sk: string;
  message: string;
}

const GetMessages = () => {
  const [messages, setMessages] = useState<Message[] | []>([]);

  const getAllMessages = async () => {
    try {
      const messages = await messageService.getAllMessagesFromDb();
      setMessages(messages.items);
    } catch (err) {
      toast.error("Please add your AWS credentials in the env file!");
    }
  };

  return (
    <div>
      <p>
        You can add new messages{" "}
        <Link href="/chapter_4" className="text-blue-500">
          here
        </Link>
      </p>
      <button
        onClick={getAllMessages}
        className="my-4 rounded bg-black px-4 py-2 text-white"
      >
        Get All Messages
      </button>
      {messages.map((item) => {
        return (
          <div key={item.sk} className="my-1 rounded bg-green-100 px-4 py-2">
            <p className="text-lg">
              <span className="font-semibold">Message ID:</span> {item.sk}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Message:</span> {item.message}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default GetMessages;
