import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useDeletingBooking() {
	const queryClient = useQueryClient();
	const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
		mutationFn: deleteBookingApi,
		onSuccess: () => {
			toast.success(`Successfully deleted  booking `);
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
		},
		onError: () => {
			toast.error("There is some error deleting this booking");
		},
	});
	return { deleteBooking, isDeletingBooking };
}
