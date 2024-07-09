import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import HomePage from "../pages/Homepage/HomePage";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import { useAuth } from "../shared/components/Contexts/AuthProvider";

function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/homepage" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default AppRouters;