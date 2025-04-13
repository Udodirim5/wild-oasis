import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, cabin } = useCabins();
  if (isLoading) return <Spinner />;

  // 1 filtering
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabin;
  if (filterValue === "all") filteredCabin = cabin;
  if (filterValue === "no-discount")
    filteredCabin = cabin.filter((c) => c.discount === 0);
  if (filterValue === "with-discount")
    filteredCabin = cabin.filter((c) => c.discount > 0);

  // 2 sorting
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabin = filteredCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (!cabin.length) return <Empty resourceName="cabin" />

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
