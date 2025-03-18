import toast from "react-hot-toast";
import { createOrEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";

export const useUpdateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CABINS });
    },
    onError: (error) => toast.error(error.message),
  });

  return { editCabin, isEditing };
};
