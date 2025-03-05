import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query.keys";
import { getComments } from "../../services/comments";

export const useGetCommentsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMENTS,
    queryFn: getComments,
  });
};
