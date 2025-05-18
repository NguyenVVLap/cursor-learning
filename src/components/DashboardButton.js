"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/dashboards")}
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
    >
      Manage API Keys
    </Button>
  );
}
