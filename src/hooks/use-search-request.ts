import { AppEndpoints } from '@/constants/endpoints'
import { MutlSearchRoot } from '@/models/multi-search'
import { api } from '@/store/slice/request'

type SearchContentSearchType = {
    page: number,
    searchTerm: string
}

export const searchApi = api.injectEndpoints({
    endpoints: build => ({
        searchContent: build.query<MutlSearchRoot, SearchContentSearchType>({
            query: ({ page, searchTerm }) => ({
                url: AppEndpoints.searchContent(searchTerm, page).url,
                method: AppEndpoints.searchContent(searchTerm, page).method,
            }),
            serializeQueryArgs: ({ queryArgs }) => queryArgs.searchTerm,
            merge: (currentCache, newItems) => {
                if (newItems.page === 1) {
                    currentCache.results = newItems.results
                } else {
                    currentCache.results.push(...newItems.results)
                }
                currentCache.page = newItems.page
                currentCache.total_pages = newItems.total_pages
            },
            forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
        })
    })
})

export const {
    useSearchContentQuery
} = searchApi
