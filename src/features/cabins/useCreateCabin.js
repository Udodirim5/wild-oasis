import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../constants/queryKeys";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreatingCabin } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CABINS });
    },
    onError: (error) => toast.error(error.message),
  });

  return { createCabin, isCreatingCabin };
};
