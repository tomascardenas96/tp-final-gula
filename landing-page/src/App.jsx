import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Shop from "./pages/Shop/Shop";
import "./App.css";
import Protected from "./components/Common/Protected/Protected";
import Settings from "./pages/Settings/Settings";
import SiderContext from "./components/Home/Siders/SiderContext";

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
              <Route path="/shop" element={<Shop />} />
            </Route>
          </Routes>
        </SiderContext>
      </BrowserRouter>
    </>
  );
}

export default App;
