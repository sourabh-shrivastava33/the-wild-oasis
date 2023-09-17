import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isEditing, mutate: editingCabin } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin edited successfully");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
	});
	return { isEditing, editingCabin };
}
