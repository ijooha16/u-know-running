import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";

const updateUserInfo = async ({ userId, updatedData }) => {
  const { error } = await supabase.from("users").update(updatedData).eq("users_uid", userId);

  if (error) {
    throw new Error(error.message);
  }
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    }
  });
};
