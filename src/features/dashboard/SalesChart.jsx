import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;



function SalesChart({ days, bookings }) {
	const { isDarkMode } = useDarkMode();

	const colors = isDarkMode
		? {
				totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
				extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
				text: "#e5e7eb",
				background: "#18212f",
		  }
		: {
				totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
				extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
				text: "#374151",
				background: "#fff",
		  };
	const eachDay = eachDayOfInterval({
		start: subDays(new Date(), days - 1),
		end: new Date(),
	});
	const data = eachDay.map((day) => {
		return {
			label: format(day, "MMM ddd"),
			totalSales: bookings
				.filter((booking) => isSameDay(day, new Date(booking.created_at)))
				.reduce((acc, curr) => acc + curr.totalPrice, 0),
			extrasSales: bookings
				.filter((booking) => isSameDay(day, new Date(booking.created_at)))
				.reduce((acc, curr) => acc + curr.extrasPrice, 0),
		};
	});

	return (
		<StyledSalesChart>
			<Heading as="h2">Sales</Heading>
			<ResponsiveContainer height={300} width="100%">
				<AreaChart data={data}>
					<XAxis
						dataKey="label"
						tick={{ fill: colors.text }}
						tickLine={colors.text}
					/>
					<YAxis unit="$" tick={{ fill: colors.text }} tickLine={colors.text} />
					<Tooltip contentStyle={{ backgroundColor: colors.background }} />
					<Area
						type="monotone"
						dataKey="totalSales"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth="2"
						unit="$"
					/>
					<Area
						type="monotone"
						dataKey="extrasSales"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth="2"
						unit="$"
					/>
					<CartesianGrid strokeDasharray="9" />
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}

export default SalesChart;
