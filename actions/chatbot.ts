"use server";

const API_URL = process.env.API_URL!;

export interface ChatbotResponse {
  answer: string;
  reasoning: string;
}

export async function sendMessageToChatbot(message: string): Promise<ChatbotResponse> {
  const res = await fetch(`${API_URL}/chatbot/response`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Terjadi kesalahan saat menghubungi server.");
  }

  const json = await res.json();
  return json.data;
}
