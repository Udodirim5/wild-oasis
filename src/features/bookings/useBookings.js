import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PAGE_LIMIT, QUERY_KEYS } from "../../constants/queryKeys";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const queryClient = useQueryClient();

  // Get search params from the URL
  // This allows us to filter, sort, and paginate bookings based on URL parameters
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

  //  // Pagination
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || PAGE_LIMIT;

  // Query
  const { isLoading, data, error } = useQuery({
    queryKey: [QUERY_KEYS.BOOKINGS, filter, sortBy, page, pageSize],
    queryFn: () => getBookings({ filter, sortBy, page, pageSize }),
  });

  const bookings = data?.bookings ?? [];
  const count = data?.count ?? 0;
  // Pre fetch data
  const pageCount = Math.ceil(count / pageSize);
  // If the current page is less than the total number of pages,
  if (page < pageCount) {
    // Prefetch the next page of bookings to improve user experience
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.BOOKINGS, filter, sortBy, page + 1, pageSize],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1, pageSize }),
    });
  }
  // If the current page is greater than 1, prefetch the previous page
  if (page > 1) {
    // Prefetch the previous page of bookings to improve user experience
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.BOOKINGS, filter, sortBy, page - 1, pageSize],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1, pageSize }),
    });
  }

  return { isLoading, error, bookings, count };
};
