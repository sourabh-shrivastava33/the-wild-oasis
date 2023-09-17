import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
export function useLogOut() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate("/login", { replace: true });
		},
		onError: () => {
			toast.error("Error during logout");
		},
	});
	return { logout, isLoading };
}
