
// SERVER COMPONENT: Providers
// This component will eventually wrap children with context from the server (or API data)
// For now, it simply renders children directly, as AccountKit context must be provided server-side or via API
export default function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
