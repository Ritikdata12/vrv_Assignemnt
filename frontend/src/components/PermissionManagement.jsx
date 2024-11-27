
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const PermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({ id: null, name: "", permissions: [] });
  const [permissionsList] = useState(["Read", "Write", "Delete"]);

  useEffect(() => {
    axios.get("https://v2vapi.aditya-bansal.tech/Permissions")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the roles!", error);
      });
  }, []);

  const handleOpen = (role = { id: null, name: "", permissions: [] }) => {
    setCurrentRole(role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRole({ id: null, name: "", permissions: [] });
  };

  const handleSave = () => {
    if (currentRole.id) {
      axios.put(`https://v2vapi.aditya-bansal.tech/Permissions/${currentRole.id}`, currentRole)
        .then(() => {
          setRoles(
            roles.map((role) => (role.id === currentRole.id ? currentRole : role))
          );
          handleClose();
        })
        .catch((error) => {
          console.error("There was an error updating the role!", error);
        });
    } else {
      axios.post("https://v2vapi.aditya-bansal.tech/Permissions", currentRole)
        .then((response) => {
          setRoles([...roles, response.data]);
          handleClose();
        })
        .catch((error) => {
          console.error("There was an error adding the role!", error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://v2vapi.aditya-bansal.tech/Permissions/${id}`)
      .then(() => {
        setRoles(roles.filter((role) => role.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the role!", error);
      });
  };

  const handlePermissionChange = (permission) => {
    setCurrentRole((prevRole) => ({
      ...prevRole,
      permissions: prevRole.permissions.includes(permission)
        ? prevRole.permissions.filter((perm) => perm !== permission)
        : [...prevRole.permissions, permission],
    }));
  };

  const columns = [
    { field: "name", headerName: "Role Name", width: 200, headerAlign: "center", align: "center" },
    {
      field: "permissions",
      headerName: "Permissions",
      width: 300,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.permissions.join(", "),
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
    <div>
       <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Permission Management</h2>
    
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={roles}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell": {
              textAlign: "center",
            },
          }}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentRole.id ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            value={currentRole.name}
            onChange={(e) =>
              setCurrentRole({ ...currentRole, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <div>
            <h4>Permissions:</h4>
            {permissionsList.map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={currentRole.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                }
                label={permission}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PermissionManagement;

