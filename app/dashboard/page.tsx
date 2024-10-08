// app/dashboard/page.tsx
// simple user dashbaord
import { getServerSession } from "next-auth/next";
import prisma from '@/prisma';
import UserDashboardClient from "./UserDashboardClient";
import authOptions from "../auth/authOptions";

const UserDashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // Redirect to login if not authenticated
    return (
      <meta http-equiv="refresh" content="0; url=/login" />
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: {
      name: true,
      subscriptionStatus: true,
      subscriptionPlan: true,
    },
  });

  if (!user) {
    // Handle case where user is not found
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <UserDashboardClient session={session} user={user} />
  );
};

export default UserDashboard;
