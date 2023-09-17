import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
function UpdateSettingsForm() {
	const { isUpdating, updateSetting } = useUpdateSetting();
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();
	function handleSettingUpdate(e, field) {
		const { value } = e.target;
		if (!value) return;
		updateSetting({ [field]: value });
	}
	const isWorking = isLoading || isUpdating;
	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isWorking}
					onBlur={(e) => handleSettingUpdate(e, "minBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					disabled={isWorking}
					defaultValue={maxBookingLength}
					onBlur={(e) => handleSettingUpdate(e, "maxBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					disabled={isWorking}
					defaultValue={maxGuestPerBooking}
					onBlur={(e) => handleSettingUpdate(e, "maxGuestPerBooking")}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					disabled={isWorking}
					defaultValue={breakfastPrice}
					onBlur={(e) => handleSettingUpdate(e, "breakfastPrice")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
