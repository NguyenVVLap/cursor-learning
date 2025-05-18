import Link from "next/link";

const navLinks = [
  { name: "Overview", href: "/dashboards", icon: "🏠" },
  { name: "API Playground", href: "/api-playground", icon: "🧪" },
  { name: "Use Cases", href: "/use-cases", icon: "✨" },
  { name: "Billing", href: "/billing", icon: "💳" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
  {
    name: "Documentation",
    href: "https://docs.example.com",
    icon: "📄",
    external: true,
  },
  {
    name: "Tavily MCP",
    href: "https://mcp.example.com",
    icon: "🌐",
    external: true,
  },
];

export default function Sidebar() {
  // For now, hardcode 'Overview' as selected
  const selected = "/dashboards";
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg flex flex-col">
      {/* Centered and larger title */}
      <div className="flex items-center justify-center px-6 py-8">
        <span className="font-extrabold text-3xl tracking-tight text-center">
          Dani AI
        </span>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const isSelected = link.href === selected;
            return (
              <li key={link.name}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                      isSelected
                        ? "bg-blue-100 text-blue-700 font-bold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span>{link.icon}</span>
                    {link.name}
                    <span className="ml-auto text-xs">↗</span>
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                      isSelected
                        ? "bg-blue-100 text-blue-700 font-bold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span>{link.icon}</span>
                    {link.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
