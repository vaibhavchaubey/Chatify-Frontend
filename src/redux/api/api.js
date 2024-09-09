import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../../constants/config';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1`,
  }),
  tagTypes: ['Chat', 'User', 'Message'],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: `/chat/my`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Chat'],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/user/sendrequest`,
        method: 'PUT',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getNotifications: builder.query({
      query: () => ({
        url: 'user/notifications',
        method: 'GET',
        credentials: 'include',
      }),
      /* This setting determines how long (in seconds) the cached data should be kept in the store after the last component using it is unmounted. A value of 0 means the data will be removed from the cache immediately once it is no longer used. */
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/user/acceptrequest`,
        method: 'PUT',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chat/${chatId}`;
        if (populate) {
          url += '?populate=true';
        }
        return {
          url,
          method: 'GET',
          credentials: 'include',
        };
      },
      providesTags: ['Chat'],
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chat/message/${chatId}?page=${page}`,
        method: 'GET',
        credentials: 'include',
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
} = api;

export default api;
