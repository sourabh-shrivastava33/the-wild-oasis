import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { isCreating, creatingCabin } = useCreateCabin();
	const { isEditing, editingCabin } = useEditCabin();
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditingSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: editValues,
	});
	const { errors } = formState;

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEditingSession)
			editingCabin(
				{ newCabinData: { ...data, image: image }, id: editId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			creatingCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
	}
	const isWorking = isEditing || isCreating;
	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					{...register("name", {
						required: "This field is required",
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Should accomodate atleast 1 guest",
						},
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 100,
							message: "Price should be atleast 100rs",
						},
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							+value <= +getValues().regularPrice ||
							"Discount should be less than the regular price",
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditingSession ? false : "No file choosen",
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variations="secondary"
					type="reset"
					disabled={isWorking}
					onClick={onCloseModal}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditingSession ? "Edit cabin" : "Add new Cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
