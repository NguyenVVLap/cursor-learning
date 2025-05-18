import { useState } from "react";

export function ApiKeyModal({ mode, selectedKey, onClose, onSubmit }) {
  const [keyName, setKeyName] = useState(selectedKey?.name || "");
  const [keyType, setKeyType] = useState(selectedKey?.type || "dev");
  const [limitUsage, setLimitUsage] = useState(!!selectedKey?.usage_limit);
  const [usageLimit, setUsageLimit] = useState(
    selectedKey?.usage_limit?.toString() || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: keyName,
      type: keyType,
      usageLimit: limitUsage ? parseInt(usageLimit) : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-2">
          {mode === "create" && "Create a new API key"}
          {mode === "edit" && "Edit API key"}
          {mode === "view" && "API Key Details"}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {mode === "view"
            ? "View details for this API key."
            : "Enter a name and limit for the API key."}
        </p>
        <form onSubmit={handleSubmit}>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="keyName"
          >
            Key Name{" "}
            <span className="text-gray-400 font-normal">
              — A unique name to identify this key
            </span>
          </label>
          <input
            id="keyName"
            className="w-full mb-4 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            placeholder="Key Name"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            required
            disabled={mode === "view"}
          />
          <div className="mb-4">
            <div className="font-medium text-gray-700 mb-1">
              Key Type{" "}
              <span className="text-gray-400 font-normal">
                — Choose the environment for this key
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                  keyType === "prod"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                } cursor-pointer transition-colors`}
              >
                <input
                  type="radio"
                  name="keyType"
                  value="prod"
                  checked={keyType === "prod"}
                  onChange={() => setKeyType("prod")}
                  className="accent-blue-500"
                  disabled={mode === "view"}
                />
                <span className="font-semibold text-gray-700">Production</span>
                <span className="text-xs text-gray-400 ml-2">
                  Rate limited to 1,000 requests/minute
                </span>
              </label>
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                  keyType === "dev"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                } cursor-pointer transition-colors`}
              >
                <input
                  type="radio"
                  name="keyType"
                  value="dev"
                  checked={keyType === "dev"}
                  onChange={() => setKeyType("dev")}
                  className="accent-blue-500"
                  disabled={mode === "view"}
                />
                <span className="font-semibold text-gray-700">Development</span>
                <span className="text-xs text-gray-400 ml-2">
                  Rate limited to 100 requests/minute
                </span>
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={limitUsage}
                onChange={(e) => setLimitUsage(e.target.checked)}
                className="accent-blue-500"
                disabled={mode === "view"}
              />
              <span className="text-gray-700">Limit monthly usage*</span>
            </label>
            <input
              type="number"
              min="1"
              disabled={!limitUsage || mode === "view"}
              className="w-full mt-2 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base disabled:bg-gray-100"
              placeholder="1000"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
            />
            <div className="text-xs text-gray-400 mt-1">
              * If the combined usage of all your keys exceeds your plan's
              limit, all requests will be rejected.
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-8">
            {mode === "view" ? null : (
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition-colors"
              >
                {mode === "edit" ? "Save" : "Create"}
              </button>
            )}
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-2 rounded-lg shadow transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
