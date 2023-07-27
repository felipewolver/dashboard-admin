import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products'], 
    endpoints: (build) => ({ // endpoints vai pegar as funçoes do backend onde tem métodos http GET, POST, PUT, DELETE
        getUser: build.query({ // getUser vai buscar a função getUser do backend q busca o user pelo id
            query: (id) => `general/user/${id}`, // url vinda do backend da rotas /general
            providesTags: ['User']
        }),
        getProduct: build.query({
            query: () => 'client/products',
            providesTags: ['Products']
        }),
    })
});

export const { useGetUserQuery, useGetProductQuery } = api;