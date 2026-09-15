import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Order from "./Pages/Order";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BookingProvider } from "./Components/Booking";

function App() {
  return (
    <BookingProvider>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/order" element={<Order />}></Route>
      </Routes>

      <Footer />
    </BookingProvider>
  );
}

export default App;
