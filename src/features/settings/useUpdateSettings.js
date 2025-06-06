import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettingsApi } from "../../services/apiSettings";
import { QUERY_KEYS } from "../../constants/queryKeys";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SETTINGS }); 
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateSettings, isUpdating };
};
