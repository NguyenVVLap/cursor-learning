export function Card({ children, className }) {
  return <div className={`p-6 ${className || ""}`}>{children}</div>;
}

export function CardHeader({ children, className }) {
  return <div className={`p-6 ${className || ""}`}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h3 className={className}>{children}</h3>;
}

export function CardContent({ children, className }) {
  return <div className={`p-6 ${className || ""}`}>{children}</div>;
}
