import { Routes, Route } from "react-router-dom";
import { Home } from "./main";
import { Login } from "./pages/LoginPage";
import Dashboard from "./pages/DashboardAero";
import Header from "./components/header";
import Footer from "./components/footer";
import DashboardTR from "./pages/DashboardTR";
import DashboardFunc from "./pages/DashboardFunc";

function App() {
  return (
    <>
      <Header />
        <div className="main-content"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboardaero" element={<Dashboard />} />
          <Route path="/dashboartr" element={<DashboardTR />} />
          <Route path="/dashboardfunc" element={<DashboardFunc />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;