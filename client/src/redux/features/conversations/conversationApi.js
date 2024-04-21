import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

const CONVERSATION_ROUTE = "/conversations";

export const ConversationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    startNewConversation: builder.mutation({
      query: ({ data, receiverId }) => ({
        url: `${CONVERSATION_ROUTE}/start-conversation/${receiverId}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.conversation],
    }),

    getMyAllConversations: builder.query({
      query: (arg) => ({
        url: `${CONVERSATION_ROUTE}/get-my-all-conversations`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.conversation],
    }),
    getMessages: builder.query({
      query: ({ conversationId }) => ({
        url: `${CONVERSATION_ROUTE}/get-message/${conversationId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.conversation],
    }),
    sendMessage: builder.mutation({
      query: ({ data, conversationId }) => ({
        url: `${CONVERSATION_ROUTE}/send-message/${conversationId}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.conversation],
    }),
  }),
});

export const { useStartNewConversationMutation, useSendMessageMutation, useGetMyAllConversationsQuery, useGetMessagesQuery } = ConversationApi;
