
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserProfile from "@/components/UserProfile";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <UserProfile />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
