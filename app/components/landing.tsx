// This component previously used @account-kit/react, which is not compatible with Next.js Turbopack in client code.
// TODO: Refactor to use server-side logic or API routes for authentication and wallet status.
const Landing: React.FC = () => {
  return (
    <div className="p-4 border rounded bg-yellow-50 text-yellow-900">
      <strong>Landing:</strong> This feature is temporarily unavailable due to build constraints. Please refactor to use server-side logic or API routes.
    </div>
  );
};

export default Landing;