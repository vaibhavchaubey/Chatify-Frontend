import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../../constants/config';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}`,
  }),
  tagTypes: ['Chat', 'User'],

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
  }),
});

export const { useMyChatsQuery, useLazySearchUserQuery } = api;

export default api;
