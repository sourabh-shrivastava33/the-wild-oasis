import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const filterValue = searchParams.get("status");
	const page = Number(searchParams.get("page"));
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue, method: "eq" };
	const sortByRaw = searchParams.get("sortby") || "startDate-desc";
	const sortBy = sortByRaw.split("-") || "";
	const { isLoading, data: { data: bookings, count } = {} } = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings(filter, sortBy, page),
	});
	const pageCount = Math.ceil(count / PAGE_SIZE);

	// prefetching to avoid loading
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getBookings(filter, sortBy, page + 1),
		});
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getBookings(filter, sortBy, page - 1),
		});

	return { isLoading, bookings, count };
}
