import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
// custom hook that gives the data of all the cabins
import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
// 	border: 1px solid var(--color-grey-200);

// 	font-size: 1.4rem;
// 	background-color: var(--color-grey-0);
// 	border-radius: 7px;
// 	overflow: hidden;
// `;

// const TableHeader = styled.header`
// 	display: grid;
// 	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
// 	column-gap: 2.4rem;
// 	align-items: center;

// 	background-color: var(--color-grey-50);
// 	border-bottom: 1px solid var(--color-grey-100);
// 	text-transform: uppercase;
// 	letter-spacing: 0.4px;
// 	font-weight: 600;
// 	color: var(--color-grey-600);
// 	padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();
	if (isLoading) return <Spinner />;
	if (!cabins.length) return <Empty resourceName="cabins" />;
	// Filtered Cabins
	const filterCabins = searchParams.get("discount") || "all";
	let filteredCabins;
	if (filterCabins === "all") filteredCabins = cabins;
	if (filterCabins === "no-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	if (filterCabins === "with-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
	// Sorted Cabins
	const sortCabins = searchParams.get("sortby") || "startDate-asc";
	const [field, direction] = sortCabins.split("-");
	console.log(field, direction);
	const modifiers = direction === "asc" ? 1 : -1;
	const sortedCabins = filteredCabins.sort(
		(a, b) => (a[field] - b[field]) * modifiers
	);

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
