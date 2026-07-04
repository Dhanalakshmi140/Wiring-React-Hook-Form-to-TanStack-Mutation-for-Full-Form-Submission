import ThreadForm from "./components/ThreadForm";
import ThreadList from "./components/ThreadList";

export default function App() {
  return (
    <main>
      <h1>Threads</h1>
      <ThreadForm />
      <hr />
      <ThreadList />
    </main>
  );
}
