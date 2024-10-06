"use client";
import { useGetDashboardDataQuery } from "@/redux/api/features/dashboardApi";
import { ThemeIcon } from "@mantine/core";
import {
  IconAdjustmentsFilled,
  IconBuildingEstate,
  IconHomeFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import RecentTenProperties from "./RecentTenProperties";

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery({});
  const { data } = (dashboardData as any) || {};

  return (
    <div>
      <section className="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-8 gap-5">
        <div className="h-36 bg-white rounded p-6 space-y-4 drop-shadow">
          <div className="flex items-center gap-5">
            <ThemeIcon size="lg" color="#ede9fe">
              <IconHomeFilled
                style={{ width: "70%", height: "70%" }}
                color="#8b5cf6"
              />
            </ThemeIcon>
            <p className="font-bold text-3xl text-gray-600">
              {data?.totalProperties?._count?.toLocaleString()}
            </p>
          </div>
          <h1 className="text-gray-600">Total properties</h1>
        </div>
        <div className="h-36 bg-white rounded p-6 space-y-4 drop-shadow">
          <div className="flex items-center gap-5">
            <ThemeIcon size="lg" color="#e0e7ff">
              <IconUserFilled
                style={{ width: "70%", height: "70%" }}
                color="#6366f1"
              />
            </ThemeIcon>
            <p className="font-bold text-3xl text-gray-600">
              {data?.totalTenants?._count?.toLocaleString()}
            </p>
          </div>
          <h1 className="text-gray-600">Total tenants</h1>
        </div>
        <div className="h-36 bg-white rounded p-6 space-y-4 drop-shadow">
          <div className="flex items-center gap-5">
            <ThemeIcon size="lg" color="#dbeafe">
              <IconBuildingEstate
                style={{ width: "70%", height: "70%" }}
                color="#3b82f6"
              />
            </ThemeIcon>
            <p className="font-medium text-3xl text-gray-600">
              {data?.totalPropertyOwners?._count?.toLocaleString()}
            </p>
          </div>
          <h1 className="text-gray-600">Total property owner</h1>
        </div>
        <div className="h-36 bg-white rounded p-6 space-y-4 drop-shadow">
          <div className="flex items-center gap-5">
            <ThemeIcon size="lg" color="#f3e8ff">
              <IconAdjustmentsFilled
                style={{ width: "70%", height: "70%" }}
                color="#a855f7"
              />
            </ThemeIcon>
            <p className="font-medium text-3xl text-gray-600">
              {data?.totalServiceProviders?._count?.toLocaleString()}
            </p>
          </div>
          <h1 className="text-gray-600">Total service provider</h1>
        </div>
      </section>
      <section className="mt-10">
        <RecentTenProperties
          recentProperties={data?.recentProperties}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

export default Dashboard;
