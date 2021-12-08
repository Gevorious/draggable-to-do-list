import WithLayout from "./components/hoc/Layout";
import HomePage from "./pages/HomePage";

function App() {
  return <HomePage />;
}

export default WithLayout(App);
