import { Routes, Route, useLocation } from 'react-router';
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
import Admin from './pages/Admin';
import './App.css';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
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
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </main>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
