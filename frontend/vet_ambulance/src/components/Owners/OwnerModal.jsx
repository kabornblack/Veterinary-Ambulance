import { Modal, Box, Typography, TextField, Button } from "@mui/material";
// import { createOwner, updateOwner } from "../../services/ownerService";
import { useState, useEffect } from "react";
import { createOwner, updateOwner } from "../../services/ownersService";

const OwnerModal = ({ modalOpen, setModalOpen, selectedOwner }) => {
  const isCreate = selectedOwner.id === undefined;
  const [formData, setFormData] = useState({ name: "", phone: "" });

  useEffect(() => {
    setFormData({
      name: selectedOwner.name || "",
      phone: selectedOwner.phone || "",
    });
  }, [selectedOwner, setModalOpen]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    bgcolor: "white",
    width: 300,
    height: 300,
    transform: "translate(-50%, -50%)",
    p: 3,
    borderRadius: 1,
    boxShadow: 24,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isCreate) {
        await createOwner(formData);
      } else {
        await updateOwner(selectedOwner.id, formData);
      }
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box sx={style}>
        <Typography>
          {isCreate ? "Creating Owner" : "Updating Owner"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">
            {isCreate ? "Create" : "Update"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default OwnerModal;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import { createOwner, updateOwner } from "../../services/ownersService";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import Modal from "@mui/material/Modal";

// const OwnerModal = ({ modalOpen, setModalOpen, selectedOwner }) => {
//   const isCreate = selectedOwner.id === undefined;
//   const [formData, setFormData] = useState({ name: "", phone: "" });

//   useEffect(() => {
//     setFormData({
//       name: selectedOwner.name || "",
//       phone: selectedOwner.phone || "",
//     });
//   }, [selectedOwner, setModalOpen]);

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     bgcolor: "white",
//     width: 300,
//     height: 300,
//     transform: "translate(-50%, -50% )",
//     p: 3,
//     borderRadius: 1,
//     boxShadow: 24,
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isCreate) {
//         await createOwner(formData);
//       } else {
//         await updateOwner(selectedOwner.id, formData);
//       }
//       setModalOpen(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//       <Box sx={style}>
//         <Typography sx={{ mb: 2 }}>
//           {isCreate ? "Creating new owner" : "Updating owner"}
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             fullWidth
//             sx={{ mb: 1 }}
//           />
//           <TextField
//             label="phone"
//             value={formData.phone}
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//             fullWidth
//             sx={{ mb: 1 }}
//           />
//           <Button type="submit" variant="contained">
//             {isCreate ? "Create" : "Update"}
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default OwnerModal;
