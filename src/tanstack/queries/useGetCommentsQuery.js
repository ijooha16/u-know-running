import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query.keys";

export const useGetCommentsQuery = () => {
    return useQuery({
        queryKey: QUERY_KEYS.COMMENTS,
        queryFn: useGetComments,
    })
}