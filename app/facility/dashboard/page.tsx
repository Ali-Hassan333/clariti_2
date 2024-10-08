// app/facility/dashboard/page.tsx

import React from "react";
import FacilityDashboard from "./FacilityDashboard";
import { getServerSession } from "next-auth/next";

import { redirect } from "next/navigation";
import authOptions from "@/app/auth/authOptions";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "FACILITY") {
    // Redirect unauthorized users to the sign-in page or an error page
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Facility Dashboard</h1>
      <FacilityDashboard />
    </div>
  );
};

export default DashboardPage;
