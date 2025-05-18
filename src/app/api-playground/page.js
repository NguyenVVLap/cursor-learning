"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkApiKeyExists } from "@/services/api-key-service";
import Notification from "@/components/Notification";

export default function ApiPlaygroundPage() {
  const [apiInput, setApiInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationColor, setNotificationColor] = useState("green");
  const router = useRouter();

  useEffect(() => {
    if (notificationOpen) {
      const timer = setTimeout(() => setNotificationOpen(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [notificationOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setNotificationOpen(false);
    try {
      const exists = await checkApiKeyExists(apiInput);
      if (exists) {
        router.push("/protect");
        return;
      }
      setResult("Key does not exist in database.");
      setNotificationColor("red");
      setNotificationOpen(true);
    } catch (err) {
      setResult("Error checking key.");
      setNotificationColor("red");
      setNotificationOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <Notification
        message={result}
        open={notificationOpen}
        color={notificationColor}
        onClose={() => setNotificationOpen(false)}
      />
      <button
        type="button"
        onClick={() => router.back()}
        className="self-start mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-8 mt-12 text-gray-900">
        API Playground
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow p-8 flex flex-col gap-4"
      >
        <label
          htmlFor="api-endpoint"
          className="text-lg font-semibold text-gray-700 mb-2"
        >
          API Key
        </label>
        <input
          id="api-endpoint"
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your API endpoint here..."
          value={apiInput}
          onChange={(e) => setApiInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition-colors mt-2"
          disabled={loading || !apiInput}
        >
          {loading ? "Checking..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
