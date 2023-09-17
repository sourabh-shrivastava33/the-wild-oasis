import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
export function useChecking() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: checking, isLoading: isChecking } = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
				...breakfast,
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully Checkedin`);
			queryClient.invalidateQueries({ active: true });
			navigate("/");
		},
		onError: () => {
			toast.error("There is an error while checking in");
		},
	});
	return { checking, isChecking };
}
