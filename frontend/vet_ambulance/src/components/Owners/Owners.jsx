import { useEffect, useState } from "react";
import { getOwners } from "../../services/ownersService";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import OwnerModal from "./OwnerModal";

const Owners = () => {
  const [owners, setOwners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState({ name: "", phone: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOwners();
        setOwners(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
  ];

  // console.log(owners);

  const createOwner = () => {
    setSelectedOwner({ name: "", phone: "" });
    setModalOpen(true);
  };

  return (
    <>
      <h1>Owners</h1>
      <Button variant="contained" onClick={createOwner}>
        Add owner
      </Button>
      <DataGrid rows={owners} columns={columns}></DataGrid>
      <OwnerModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedOwner={selectedOwner}
      />
    </>
  );
};

export default Owners;
