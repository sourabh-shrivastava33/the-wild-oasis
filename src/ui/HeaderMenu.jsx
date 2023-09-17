import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import LogOut from "./LogOut";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router";
import DarkMode from "./DarkMode";
const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 0.4rem;
`;

function HeaderMenu() {
	const navigate = useNavigate();
	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon onClick={() => navigate("/account")}>
					<HiOutlineUser />
				</ButtonIcon>
			</li>
			<li>
				<DarkMode />
			</li>
			<li>
				<LogOut />
			</li>
		</StyledHeaderMenu>
	);
}

export default HeaderMenu;
