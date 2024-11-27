import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({ id: null, name: "", email: "", role: "" });

  const theme = useTheme(); 
  const isDarkMode = theme.palette.mode === "dark"; 

  const primary = "black";  
  const secondary = "#FFFFFF";  

  useEffect(() => {
    axios
      .get("https://v2vapi.aditya-bansal.tech/Roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  const handleOpen = (role = { id: null, name: "", email: "", role: "" }) => {
    setCurrentRole(role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRole({ id: null, name: "", email: "", role: "" });
  };

  const handleSave = () => {
    if (currentRole.name.trim() === "" || currentRole.email.trim() === "" || currentRole.role.trim() === "") {
      alert("All fields are required!");
      return;
    }

    if (currentRole.id) {
      axios
        .put(`https://v2vapi.aditya-bansal.tech/Roles/${currentRole.id}`, currentRole)
        .then(() => {
          setRoles((prevRoles) =>
            prevRoles.map((role) => (role.id === currentRole.id ? currentRole : role))
          );
          handleClose();
        })
        .catch((error) => {
          console.error("Error updating the role:", error);
        });
    } else {
      axios
        .post("https://v2vapi.aditya-bansal.tech/Roles", currentRole)
        .then((response) => {
          setRoles((prevRoles) => [...prevRoles, response.data]);
          handleClose();
        })
        .catch((error) => {
          console.error("Error adding the role:", error);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      axios
        .delete(`https://v2vapi.aditya-bansal.tech/Roles/${id}`)
        .then(() => {
          setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting the role:", error);
        });
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpen(params.row)}
            style={{ backgroundColor: "blue" }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        color: isDarkMode ? theme.palette.secondary.contrastText : primary,
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: isDarkMode ? theme.palette.secondary.contrastText : primary,
        }}
      >
        Role Management
      </h2>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={roles}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row.id}
          sx={{
            "& .MuiDataGrid-cell": {
              textAlign: "center",
              color: isDarkMode ? secondary: primary,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: grey,
              color: isDarkMode ? theme.palette.secondary.contrastText : primary,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
            },
          }}
        />
      </div>

      {/* Role Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            color: isDarkMode ? theme.palette.secondary.contrastText : primary,
          }}
        >
          {currentRole.id ? "Edit Role" : "Add Role"}
        </DialogTitle>
        <DialogContent
          style={{
            color: isDarkMode ? theme.palette.secondary.contrastText : primary,
          }}
        >
          <TextField
            label="Name"
            value={currentRole.name}
            onChange={(e) =>
              setCurrentRole({ ...currentRole, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={currentRole.email}
            onChange={(e) =>
              setCurrentRole({ ...currentRole, email: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            value={currentRole.role}
            onChange={(e) =>
              setCurrentRole({ ...currentRole, role: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" style={{ color: secondary }}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" style={{ backgroundColor: primary }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
