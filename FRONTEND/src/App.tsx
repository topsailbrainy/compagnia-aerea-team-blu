import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import BookingConfirmed from './pages/BookingConfirmed';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Upgrade from './pages/Upgrade';
import './App.css';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upgrade" element={<Upgrade />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
