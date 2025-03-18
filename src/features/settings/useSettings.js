import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { QUERY_KEYS } from "../../constants/queryKeys";

export const useSettings = () => {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.SETTINGS,
    queryFn: getSettings,
  });
  return { isLoading, settings, error };
};
