import { css, styled } from "styled-components";

const Heading = styled.h1`
	${(props) =>
		props.as === "h1" &&
		css`
			font-size: 30px;
			font-weight: 700;
		`}
	${(props) =>
		props.as === "h2" &&
		css`
			font-size: 24px;
			font-weigth: 600;
		`}
	${(props) =>
		props.as === "h3" &&
		css`
			font-size: 24px;

			font-weigth: 500;
		`}
	${(props) =>
		props.as === "h4" &&
		css`
			font-size: 32px;

			font-weigth: 600;
			text-align: center;
		`}
`;
export default Heading;
