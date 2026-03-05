import { useThread } from "./hooks/useThread";

// These come from the .env file
const TOKEN_1 = import.meta.env.VITE_THREAD_TOKEN_1;
const TOKEN_2 = import.meta.env.VITE_THREAD_TOKEN_2;

function App() {
  const { data, loading, error } = useThread(TOKEN_1, TOKEN_2);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <p>cfscode: {data.cfscode}</p>
      <p>sender.user: {data.sender.user}</p>
      <p>recipient.address: {data.recipient.address}</p>
    </div>
  );
}

export default App;
