import {
	HiOutlineBriefcase,
	HiOutlineBanknotes,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, stays, days, cabins }) {
	const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);
	const checkIns = stays?.length;
	// occupancy rate = total booked night/(total cabins*num of days);
	const occupation = stays?.reduce((acc, curr) => acc + curr.numNights, 0);
	const totalCabin = cabins?.length;
	const totalDays = totalCabin * days;
	console.log(totalDays);
	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={bookings.length}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				color="indigo"
				icon={<HiOutlineCalendarDays />}
				value={checkIns}
			/>
			<Stat
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={Math.round((occupation / (cabins.length * days)) * 100) + "%"}
			/>
		</>
	);
}

export default Stats;
