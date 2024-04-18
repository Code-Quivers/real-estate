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
    // get My all getMyAllConversations "/get-my-all-conversations",
    getMyAllConversations: builder.query({
      query: (arg) => ({
        url: `${CONVERSATION_ROUTE}/get-my-all-conversations`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.conversation],
    }),

    getSingleConversation: builder.query({
      query: ({ conversationId }) => ({
        url: `${CONVERSATION_ROUTE}/get-message/${conversationId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.conversation],
    }),
  }),
});

export const { useStartNewConversationMutation, useGetMyAllConversationsQuery, useGetSingleConversationQuery } = ConversationApi;
