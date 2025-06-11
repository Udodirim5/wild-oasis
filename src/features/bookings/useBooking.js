import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export const useBooking = () => {
  const {bookingId} = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.BOOKINGS,
    // Fetch a specific booking, you might need to pass an ID or other parameters
    queryFn: () => getBooking(bookingId),
    retry: false, // Disable retry on failure
  });
  return { isLoading, booking, error };
};

