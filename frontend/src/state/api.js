import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
    reducerPath: 'adminApi',
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query({ // getUser vai buscar a função getUser do backend q tem vai buscar o user pelo id
            query: (id) => `general/user/${id}`, // url vinda do backend da rotas /general
            providesTags: ['User']
        })
    })
});

export const { useGetUserQuery } = api;