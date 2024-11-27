import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./Dashboard.css";


const Dashboard = () => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/db.json");
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h6" color="error">
          Failed to load data.
        </Typography>
      </div>
    );
  }

  const userCount = data.users?.length || 0;

  const uniqueRoles = data.roles ? new Set(data.roles.map((role) => role.role)) : new Set();
  const activeRoles = uniqueRoles.size;

  const totalPermissions = data.permissions
    ? data.permissions.reduce(
        (total, permission) => total + (permission.permissions?.length || 0),
        0
      )
    : 0;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Typography variant="h4" className="text-gray-800 font-bold mb-6">
        Dashboard Overview
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card className="shadow-md hover:shadow-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold text-blue-600">
                Users
              </Typography>
              <Typography variant="h4" className="font-bold text-gray-800">
                {userCount}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Total registered users
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="shadow-md hover:shadow-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold text-pink-600">
                Roles
              </Typography>
              <Typography variant="h4" className="font-bold text-gray-800">
                {activeRoles}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Active roles in the system
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="shadow-md hover:shadow-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold text-green-600">
                Permissions
              </Typography>
              <Typography variant="h4" className="font-bold text-gray-800">
                {totalPermissions}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Total permissions assigned
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="mt-6">
        <Grid item xs={12} md={6}>
          <Card className="shadow-md hover:shadow-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold text-gray-700 mb-4">
                Role Distribution (Pie Chart)
              </Typography>
              {data.roles && (
                <PieChart width={300} height={300}>
                  <Pie
                    data={data.roles}
                    dataKey="id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {data.roles.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="shadow-md hover:shadow-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold text-gray-700 mb-4">
                User Distribution (Bar Chart)
              </Typography>
              {data.users && (
                <BarChart width={300} height={300} data={data.users}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="id" fill="#8884d8" />
                </BarChart>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
