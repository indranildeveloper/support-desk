import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Container className="pt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
            <Route path="/tickets" element={<PrivateRoute />}>
              <Route path="/tickets" element={<Tickets />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
