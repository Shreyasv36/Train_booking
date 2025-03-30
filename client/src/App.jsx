import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Train from "./Train";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/train" element={<Train />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
