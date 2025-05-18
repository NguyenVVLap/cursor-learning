"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiKeyTable } from "@/components/api-keys/ApiKeyTable";
import { ApiKeyModal } from "@/components/api-keys/ApiKeyModal";
import { DeleteConfirmModal } from "@/components/api-keys/DeleteConfirmModal";
import {
  fetchApiKeys,
  createApiKey,
  updateApiKey,
  deleteApiKey,
} from "@/services/api-key-service";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedKey, setSelectedKey] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    loadApiKeys();
  }, []);

  async function loadApiKeys() {
    try {
      setLoading(true);
      const data = await fetchApiKeys();
      setApiKeys(data);
    } catch (error) {
      console.error("Error fetching API keys:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateKey(data) {
    try {
      const newKey = await createApiKey(data.name, data.type, data.usageLimit);
      setApiKeys((prev) => [newKey, ...prev]);
      closeModal();
    } catch (error) {
      console.error("Error creating API key:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  }

  async function handleEditKey(data) {
    if (!selectedKey) return;
    try {
      const updatedKey = await updateApiKey(selectedKey.id, {
        name: data.name,
        type: data.type,
        usage_limit: data.usageLimit,
      });
      setApiKeys((prev) =>
        prev.map((k) => (k.id === updatedKey.id ? updatedKey : k))
      );
      closeModal();
    } catch (error) {
      console.error("Error updating API key:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  }

  async function handleDeleteKey() {
    if (!selectedKey) return;
    try {
      await deleteApiKey(selectedKey.id);
      setApiKeys((prev) => prev.filter((k) => k.id !== selectedKey.id));
      setShowDeleteConfirm(false);
      setSelectedKey(null);
    } catch (error) {
      console.error("Error deleting API key:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  }

  function openCreateModal() {
    setModalMode("create");
    setShowModal(true);
    setSelectedKey(null);
  }

  function openEditModal(key) {
    setModalMode("edit");
    setShowModal(true);
    setSelectedKey(key);
  }

  function openViewModal(key) {
    setModalMode("view");
    setShowModal(true);
    setSelectedKey(key);
  }

  function openDeleteConfirm(key) {
    setSelectedKey(key);
    setShowDeleteConfirm(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedKey(null);
  }

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <div>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        <div
          className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 flex-1 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        {/* Toggle button */}
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow border border-gray-200"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="container mx-auto p-0 sm:p-6 flex flex-col items-center">
          {/* Header Section */}
          <div className="w-full max-w-5xl mb-6">
            <div className="mb-2 text-sm text-gray-400 font-medium">
              Pages / Overview
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              Overview
            </h1>
            {/* Banner */}
            <div className="rounded-2xl mb-10 p-8 bg-gradient-to-tr from-[#e7b9a7] via-[#b7a7e7] to-[#7bb7e7] relative overflow-hidden shadow-md flex flex-col md:flex-row md:items-center md:justify-between min-h-[260px]">
              <div className="flex flex-col gap-2 z-10">
                <span className="bg-white/40 text-xs font-semibold text-gray-800 rounded px-3 py-1 w-fit mb-2">
                  CURRENT PLAN
                </span>
                <span className="text-4xl font-extrabold text-white drop-shadow">
                  Researcher
                </span>
                <div className="mt-6 flex flex-col gap-2">
                  <span className="text-white font-semibold text-lg">
                    API Usage{" "}
                    <span
                      className="ml-1 text-white/80 text-base align-middle cursor-pointer"
                      title="API usage info"
                    >
                      ⓘ
                    </span>
                  </span>
                  <span className="text-white/90 text-sm">Plan</span>
                  <div className="w-64 h-2 bg-white/30 rounded-full mt-1 mb-1">
                    <div
                      className="h-2 bg-white/80 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <label className="flex items-center cursor-pointer">
                      <span className="relative inline-block w-8 h-5 mr-2">
                        <input type="checkbox" className="sr-only peer" />
                        <span className="absolute left-0 top-0 w-8 h-5 bg-white/40 rounded-full peer-checked:bg-blue-500 transition-colors"></span>
                        <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow peer-checked:translate-x-3 transition-transform"></span>
                      </span>
                      <span className="text-white/90 text-sm">
                        Pay as you go{" "}
                        <span
                          className="ml-1 text-white/80 text-xs align-middle cursor-pointer"
                          title="Pay as you go info"
                        >
                          ⓘ
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="absolute right-8 top-8 z-10">
                <button className="flex items-center gap-2 bg-white/30 hover:bg-white/50 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors text-base">
                  <span className="inline-block align-middle">🗂️</span> Manage
                  Plan
                </button>
              </div>
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 80% 20%, #7bb7e7 0%, transparent 70%)",
                }}
              ></div>
            </div>
          </div>

          {/* API Keys Card */}
          <div className="w-full max-w-5xl">
            <Card className="rounded-3xl shadow-xl border border-gray-100 bg-white">
              <CardHeader className="pb-0 bg-white rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    API Keys
                  </CardTitle>
                  <button
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Create New API Key"
                    onClick={openCreateModal}
                  >
                    <span className="text-2xl leading-none font-bold">+</span>
                  </button>
                </div>
              </CardHeader>
              <CardContent className="bg-white rounded-b-3xl pt-2">
                <p className="mb-5 text-gray-600 text-base">
                  The key is used to authenticate your requests to the{" "}
                  <a
                    href="#"
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    Research API
                  </a>
                  . To learn more, see the{" "}
                  <a
                    href="#"
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    documentation
                  </a>{" "}
                  page.
                </p>
                <ApiKeyTable
                  apiKeys={apiKeys}
                  onEdit={openEditModal}
                  onDelete={openDeleteConfirm}
                />
              </CardContent>
            </Card>
          </div>

          {/* Modals */}
          {showModal && (
            <ApiKeyModal
              mode={modalMode}
              selectedKey={selectedKey}
              onClose={closeModal}
              onSubmit={modalMode === "edit" ? handleEditKey : handleCreateKey}
            />
          )}

          {showDeleteConfirm && selectedKey && (
            <DeleteConfirmModal
              selectedKey={selectedKey}
              onConfirm={handleDeleteKey}
              onCancel={() => setShowDeleteConfirm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
