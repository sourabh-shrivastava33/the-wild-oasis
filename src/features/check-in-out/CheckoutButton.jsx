import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
import SpinnerMini from "../../ui/SpinnerMini";
function CheckoutButton({ bookingId }) {
	const { checkout, isCheckingOut } = useCheckout();
	return (
		<Button
			variations="primary"
			sizes="small"
			onClick={() => checkout(bookingId)}
			disabled={isCheckingOut}
		>
			{isCheckingOut ? <SpinnerMini /> : "Check out"}
		</Button>
	);
}

export default CheckoutButton;
