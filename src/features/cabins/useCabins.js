import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";
import { QUERY_KEYS } from "../../constants/queryKeys";

export const useCabins = () => {
  const {
    isLoading,
    data: cabin,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.CABINS,
    queryFn: getCabin,
  });
  return { isLoading, cabin, error };
};
