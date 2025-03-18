import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabinApi } from "../../services/apiCabins";
import { QUERY_KEYS } from "../../constants/queryKeys";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CABINS,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteCabin };
};
