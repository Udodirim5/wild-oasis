import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";

export const useCabins = () => {
  const {
    isLoading,
    data: cabin,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });
  return { isLoading, cabin, error };
};
