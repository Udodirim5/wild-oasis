import PropTypes from "prop-types";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return <Select options={options} value={sortBy} type="white" onChange={handleChange} />;
};

SortBy.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SortBy;
