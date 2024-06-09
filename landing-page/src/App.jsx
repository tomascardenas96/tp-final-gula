import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Shop from "./pages/Shop/Shop";
import Protected from "./components/Common/Protected/Protected";
import Settings from "./pages/Settings/Settings";
import SiderContext from "./components/Home/Siders/SiderContext";
import ShopsManagment from "./pages/Shops-managment/ShopsManagment";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <SiderContext>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Protected />}>
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/shop/:profilename" element={<Shop />} />
              <Route path="/shops-managment" element={<ShopsManagment />} />
            </Route>
          </Routes>
        </SiderContext>
      </BrowserRouter>
    </>
  );
}

export default App;
