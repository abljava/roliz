import {api} from './api'

export const newsApi = api.injectEndpoints({
    endpoints: builder => ({
        getNews: builder.query({
            query: () => ({
                mode: "cors",
                url: "/news?populate=*",
                method: 'GET',
            })
        }),
        getNewsId: builder.query({
            query: (id) => ({
                mode: "cors",
                url: `/news/${id}/?populate=*`,
                method: "GET",
              }),
        })
    })
})

export const {useGetNewsQuery, useGetNewsIdQuery} = newsApi;