import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
	const { mutate: signup, isLoading } = useMutation({
		mutationFn: signUp,
		onSuccess: (user) => {
			console.log(user);
			toast.success("New Account created! please confirm new user");
		},
		onError: () => {
			toast.error("Error while signing up");
		},
	});
	return { signup, isLoading };
}
