import React from "react";

export default function Notification({
  message,
  open,
  onClose,
  color = "green",
}) {
  if (!open) return null;
  const bgColor = color === "red" ? "bg-red-600" : "bg-green-600";
  const textColor = color === "red" ? "text-red-50" : "text-green-50";
  const iconColor = color === "red" ? "text-red-100" : "text-green-100";
  const iconCircle = color === "red" ? "text-red-500" : "text-green-500";
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`flex items-center ${bgColor} ${textColor} px-6 py-3 rounded-lg shadow-lg min-w-[320px] max-w-full`}
      >
        <span className="mr-3">
          {color === "red" ? (
            <svg
              className={`w-5 h-5 ${iconColor}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="currentColor"
                className={iconCircle}
              />
              <line
                x1="9"
                y1="9"
                x2="15"
                y2="15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="15"
                y1="9"
                x2="9"
                y2="15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              className={`w-5 h-5 ${iconColor}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="currentColor"
                className={iconCircle}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                fill="none"
                stroke="white"
              />
            </svg>
          )}
        </span>
        <span className="flex-1 font-medium">{message}</span>
        <button
          onClick={onClose}
          className={`ml-4 ${textColor} hover:opacity-80 focus:outline-none`}
          aria-label="Close notification"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
