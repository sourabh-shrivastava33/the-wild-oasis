import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useLogOut } from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
function LogOut() {
	const { logout, isLoading } = useLogOut();
	return (
		<ButtonIcon disabled={isLoading} onClick={logout}>
			{isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
		</ButtonIcon>
	);
}

export default LogOut;
