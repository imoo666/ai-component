// lib/dify-client.ts
import { fetchEventSource } from "@microsoft/fetch-event-source";

const DIFY_API_KEY = "xxxxxx";
const DIFY_API_URL = "https://api.dify.ai/v1";

interface Props {
  query: string;
  chatId?: string;
  setChatId?: (id: string) => void;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: any) => void;
  changeToComponentMode: () => void;
}
export async function streamFromDify({
  query,
  chatId,
  setChatId,
  onDelta,
  onDone,
  onError,
  changeToComponentMode,
}: Props) {
  const controller = new AbortController();
  let firstMessage = true;

  await fetchEventSource(`${DIFY_API_URL}/chat-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DIFY_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      inputs: {},
      response_mode: "streaming",
      user: "demo-user",
      conversation_id: chatId,
    }),
    signal: controller.signal,
    onmessage(ev) {
      if (!ev.data) {
        return;
      }
      const json = JSON.parse(ev.data);
      if (json.event === "message" && firstMessage) {
        firstMessage = false;
        if (json.answer === "@component") {
          changeToComponentMode();
          return;
        }
      }
      if (json.event === "message_end") {
        setChatId?.(json.conversation_id);
        onDone();
        return;
      }
      onDelta(json.answer || "");
    },
    onerror(err) {
      console.log(err);
      controller.abort();
      onError(err);
      throw err;
    },
  });
}
