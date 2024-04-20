import { z } from "zod";

const startConversation = z.object({
  body: z.object({
    text: z.string().optional(),
  }),
});
const sendMessage = z.object({
  text: z.string().optional(),
});

export const ConversationsValidation = {
  startConversation,
  sendMessage,
};
