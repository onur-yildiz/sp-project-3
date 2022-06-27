import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Reports from "./pages/Reports";

function App() {
  const isAuth = doesHttpOnlyCookieExist("jwt");

  return (
    <Routes>
      <Route
        path=""
        element={isAuth ? <Reports /> : <Navigate to="login" replace />}
      />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

const doesHttpOnlyCookieExist = (cookieName: string) => {
  document.cookie = cookieName + "=;";
  return document.cookie.indexOf(cookieName + "=") === -1;
};

export default App;
