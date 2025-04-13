import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // SORT
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.BOOKINGS, filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  
  const bookings = data?.bookings ?? [];
  const count = data?.count ?? 0;
  
  return { isLoading, error, bookings, count };
  };
