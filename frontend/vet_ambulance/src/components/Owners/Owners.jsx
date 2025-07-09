import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import OwnerModal from "./OwnerModal";
import { Button } from "@mui/material";
import { deleteOwner, getOwners } from "../../services/ownersService";

const Owners = () => {
  const [owners, setOwners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState({});

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

  const handleDelete = async (ownerId) => {
    try {
      const success = await deleteOwner(ownerId);
      if (success) {
        setOwners(owners.filter((owner) => owner.id !== ownerId));
        console.log("Owner deleted successfully");
      } else {
        console.error("Failed to delete owner");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedOwner(params.row);
              setModalOpen(true);
            }}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleDelete(params.row.id);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  // console.log(owners);

  const createOwner = () => {
    setSelectedOwner({});
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
