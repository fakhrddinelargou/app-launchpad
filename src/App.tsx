import Layout from "./components/Layout";
import Sections from "./components/Sections";
// import Dashboard from "./components/pages/Dashboard";
import Orders from "./components/pages/Orders";

function App() {
  return (
    <Layout>
      <div className="flex">
        <Sections />
        {/* هذا مجرد عرض افتراضي، يمكن تغييره */}
        <Orders />
      </div>
    </Layout>
  );
}

export default App;
