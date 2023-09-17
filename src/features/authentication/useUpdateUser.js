import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
	const queryClient = useQueryClient();
	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			queryClient.setQueryData(["user"], user);
			// queryClient.invalidateQueries({
			// 	queryKey: ["user"],
			// });
			toast.success("Account updated successfully");
		},
		onError: () => {
			toast.error("Error while updating account");
		},
	});
	return { updateUser, isUpdating };
}
