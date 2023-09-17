import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
	const queryClient = useQueryClient();
	const { mutate: checkout, isLoading: isCheckinOut } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, { status: "checked-out" }),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} Checked out successfully`);
			queryClient.invalidateQueries({ active: true });
		},
		onError: () => {
			toast.error("There is error checking out ");
		},
	});
	return { checkout, isCheckinOut };
}