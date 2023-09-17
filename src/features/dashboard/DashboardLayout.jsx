import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import SalesChart from "./SalesChart";

import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;
function DashboardLayout() {
	const { cabins, isLoading: isLoadingCabinData } = useCabins();

	const { recentBookings, loadingBookings } = useRecentBookings();
	const { confirmStays, loadingStays, numDays } = useRecentStays();
	if (loadingBookings || loadingStays || isLoadingCabinData) return <Spinner />;
	return (
		<StyledDashboardLayout>
			<Stats
				bookings={recentBookings}
				stays={confirmStays}
				days={numDays}
				cabins={cabins}
			/>

			<TodayActivity />
			<DurationChart confirmStays={confirmStays} />
			<SalesChart bookings={recentBookings} days={numDays} />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
