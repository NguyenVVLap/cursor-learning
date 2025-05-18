import { useState } from "react";
import { maskKey } from "@/utils/api-key-utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ApiKeyTable({ apiKeys, onEdit, onDelete }) {
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [revealedKeyId, setRevealedKeyId] = useState(null);

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key.key);
    setCopiedKeyId(key.id);
    setTimeout(() => setCopiedKeyId(null), 1200);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="text-xs text-gray-400 font-bold tracking-widest uppercase bg-white w-1/5 py-3">
              Name
            </TableHead>
            <TableHead className="text-xs text-gray-400 font-bold tracking-widest uppercase bg-white w-1/5 py-3">
              Type
            </TableHead>
            <TableHead className="text-xs text-gray-400 font-bold tracking-widest uppercase bg-white w-1/5 py-3">
              Usage
            </TableHead>
            <TableHead className="text-xs text-gray-400 font-bold tracking-widest uppercase bg-white w-2/5 py-3">
              Key
            </TableHead>
            <TableHead className="text-xs text-gray-400 font-bold tracking-widest uppercase bg-white w-1/5 py-3">
              Options
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow
              key={key.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <TableCell className="py-4 text-gray-900 font-medium align-middle w-1/5">
                {key.name}
              </TableCell>
              <TableCell className="py-4 align-middle w-1/5">
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                  {key.type}
                </span>
              </TableCell>
              <TableCell className="py-4 text-gray-700 align-middle w-1/5">
                {key.usage}
              </TableCell>
              <TableCell className="py-3 align-middle w-2/5">
                <input
                  type="text"
                  value={revealedKeyId === key.id ? key.key : maskKey(key.key)}
                  readOnly
                  className="bg-gray-100 rounded-full px-4 py-2 w-full font-mono text-base font-bold border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                />
              </TableCell>
              <TableCell className="py-4 align-middle w-1/5">
                <div className="flex gap-3">
                  <button
                    title={
                      revealedKeyId === key.id ? "Hide API Key" : "Show API Key"
                    }
                    className="hover:text-blue-600 p-1 rounded transition-colors"
                    onClick={() =>
                      setRevealedKeyId(revealedKeyId === key.id ? null : key.id)
                    }
                  >
                    <span role="img" aria-label="view">
                      👁️
                    </span>
                  </button>
                  <button
                    title="Copy"
                    className="hover:text-blue-600 p-1 rounded transition-colors relative"
                    onClick={() => handleCopyKey(key)}
                  >
                    <span role="img" aria-label="copy">
                      📋
                    </span>
                    {copiedKeyId === key.id && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow">
                        Copied!
                      </span>
                    )}
                  </button>
                  <button
                    title="Edit"
                    className="hover:text-blue-600 p-1 rounded transition-colors"
                    onClick={() => onEdit(key)}
                  >
                    <span role="img" aria-label="edit">
                      ✏️
                    </span>
                  </button>
                  <button
                    title="Delete"
                    className="hover:text-red-600 p-1 rounded transition-colors"
                    onClick={() => onDelete(key)}
                  >
                    <span role="img" aria-label="delete">
                      🗑️
                    </span>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
