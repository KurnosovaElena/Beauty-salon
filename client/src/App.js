import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home/Home";
import { SignUp } from "./pages/SignUp";

function App() {
  const {loading} = useSelector(state => state.alerts)

  return (
    <BrowserRouter>
      {loading && (<div className="spinner-parent">
        <div className="spinner-border" role="status"></div>
      </div>)}
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login /> }/>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
