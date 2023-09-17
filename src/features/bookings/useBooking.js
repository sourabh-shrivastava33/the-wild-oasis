import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router";

export function useBooking() {
	const { bookingId } = useParams();
	const { isLoading, data: booking } = useQuery({
		queryKey: ["booking", bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false,
	});
	console.log(booking);
	return { isLoading, booking };
}
