import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useChecking";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmCheckin, setConfirmCheckin] = useState(false);
	const [addBreakFast, setAddBreakFast] = useState(false);
	const moveBack = useMoveBack();
	const { isLoading, booking } = useBooking();
	const { checking, isChecking } = useChecking();
	const { settings, isLoading: isLoadingSettings } = useSettings();
	useEffect(() => setConfirmCheckin(booking?.isPaid ?? false), [booking]);
	if (isLoading || isLoadingSettings) return <Spinner />;
	const {
		id: bookingId,
		Guests: guests,
		totalPrice,
		numGuests,
		hasBreakfast,
		numNights,
	} = booking;
	const optionalBreakFastPrice =
		settings.breakfastPrice * numNights * numGuests;
	function handleCheckin() {
		if (!confirmCheckin) return;
		if (addBreakFast) {
			checking({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakFastPrice,
					totalPrice: totalPrice + optionalBreakFastPrice,
				},
			});
		} else {
			checking({ bookingId, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />
			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakFast}
						onChange={() => {
							setAddBreakFast((add) => !add);
							setConfirmCheckin(false);
						}}
						id="breakfast"
					>
						Want to add breakfast for {formatCurrency(optionalBreakFastPrice)}?
					</Checkbox>
				</Box>
			)}
			<Box>
				<Checkbox
					checked={confirmCheckin}
					onChange={() => setConfirmCheckin((confirm) => !confirm)}
					disabled={confirmCheckin || isChecking}
					id="confirm"
				>
					I confirm that {guests.fullName} has paid the total amount of{" "}
					{!addBreakFast
						? formatCurrency(totalPrice)
						: `
            ${formatCurrency(
							totalPrice + optionalBreakFastPrice
						)}(${formatCurrency(totalPrice)}+
              ${formatCurrency(optionalBreakFastPrice)})`}
				</Checkbox>
			</Box>
			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmCheckin || isChecking}
				>
					Check in booking #{bookingId}
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
