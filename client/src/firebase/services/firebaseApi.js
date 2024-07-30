import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_URL } from "../base_URL";

export const firebaseApi = createApi({
    reducerPath: "firebaseApi",

    baseQuery: fetchBaseQuery({
        baseUrl: base_URL,
    }),

    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "categories.json",
        }),

        getProducts: builder.query({
            query: () => "products.json",
        }),

        getImage: builder.query({
            query: () => "image.json",
        }),

        putImage: builder.mutation({
            query: (image) => ({
                url: "image.json",
                method: "PUT",
                body: image,
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetProductsQuery,
    useGetImageQuery,
    usePutImageMutation,
} = firebaseApi;