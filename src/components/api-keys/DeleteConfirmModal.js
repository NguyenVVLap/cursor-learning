export function DeleteConfirmModal({ selectedKey, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative animate-fade-in">
        <h2 className="text-xl font-bold text-center mb-4">Delete API Key</h2>
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to delete the API key{" "}
          <span className="font-semibold">{selectedKey.name}</span>? This action
          cannot be undone.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition-colors"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-2 rounded-lg shadow transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
