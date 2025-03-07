import Dashboard from "@/modules/Dashboard";
import { DashboardProvider } from "@/modules/Dashboard/context";
import { FC } from "react";

const DashboardPage: FC = async () => {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
};

export default DashboardPage;
