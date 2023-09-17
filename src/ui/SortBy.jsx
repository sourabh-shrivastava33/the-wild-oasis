import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	function handleChange(e) {
		searchParams.set("sortby", e.target.value);
		setSearchParams(searchParams);
	}

	return <Select options={options} onChange={handleChange} type="white" />;
}

export default SortBy;
