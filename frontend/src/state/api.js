import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products', 'Customers', 'Transactions', 'Geography'], 
    endpoints: (build) => ({ // endpoints vai pegar as funçoes do backend com o parametro build e buscar os métodos http GET, POST, PUT, DELETE
        getUser: build.query({ // getUser vai buscar a função getUser do backend q busca o user pelo id
            query: (id) => `general/user/${id}`, // url vinda do backend da rotas /general
            providesTags: ['User']
        }),
        getProducts: build.query({
            query: () => 'client/products',
            providesTags: ['Products']
        }),
        getCustomers: build.query({
            query: () => 'client/customers',
            providesTags: ['Customers']
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: '/client/transactions',
                method: 'GET',
                params: { page, pageSize, sort, search }
            }),
            providesTags: ['Transactions']
        }),
        getGeography: build.query({
            query: () => 'client/geography',
            providesTags: ['Geography']
        }),
    })
});

export const { useGetUserQuery, 
    useGetProductsQuery, 
    useGetCustomersQuery, 
    useGetTransactionsQuery,
    useGetGeographyQuery } = api;