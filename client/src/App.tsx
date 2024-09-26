import { trpc } from "../trpc";

function App() {
  const helloQuery = trpc[""].useQuery();
  return <h1>The server says "{helloQuery.data}"</h1>
}

export default App;