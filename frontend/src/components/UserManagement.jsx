import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    axios
      .get("https://v2vapi.aditya-bansal.tech/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://v2vapi.aditya-bansal.tech/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const handleEditOpen = (user) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setUpdatedName("");
  };

  const handleSave = () => {
    if (selectedUser) {
      axios
        .put(`https://v2vapi.aditya-bansal.tech/users/${selectedUser.id}`, {
          ...selectedUser,
          name: updatedName,
        })
        .then((response) => {
          setUsers(
            users.map((user) =>
              user.id === selectedUser.id ? response.data : user
            )
          );
          handleEditClose();
        })
        .catch((error) => {
          console.error("There was an error updating the user!", error);
        });
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEditOpen(params.row)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Management</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
      </div>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleEditClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" marginBottom={2}>
            Edit User Name
          </Typography>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            margin="normal"
          />
          <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
            <Button variant="outlined" color="error" onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UserManagement;
