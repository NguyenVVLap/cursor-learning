"use client";
import { useRouter } from "next/navigation";

export default function ProtectPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 relative">
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-4 left-4 lg:top-6 lg:left-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow"
      >
        ← Back
      </button>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Protected</h1>
      <p className="text-lg text-gray-700">
        This API exists and you have successfully accessed the protected page.
      </p>
    </div>
  );
}
