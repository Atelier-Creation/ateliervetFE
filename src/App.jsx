import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import Auth from './pages/AuthPage/Auth';
import Register from './pages/AuthPage/Register';
import ForgotPass from './pages/AuthPage/ForgotPass';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Appointment from './pages/Appointment/Appointment';
import Records from './pages/Records/Records';

import Settings from './pages/Settings';

// Placeholder component for new pages
const PlaceholderPage = ({ title }) => (
  <div className="">
    <h2 className="text-2xl font-bold text-[var(--dashboard-text)] mb-4">{title}</h2>
    <div className="p-12 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
      Content for {title} will go here
    </div>
  </div>
);

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPass />} />

          {/* Protected Dashboard Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="patients" element={<PlaceholderPage title="Patients" />} />
            <Route path="records" element={<Records />} />
            <Route path="billable-items" element={<PlaceholderPage title="Billable Items" />} />
            <Route path="bills-payments" element={<PlaceholderPage title="Bills & Payments" />} />
            <Route path="inventory" element={<PlaceholderPage title="Inventory" />} />
            <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="staff" element={<PlaceholderPage title="Staff" />} />
            <Route path="settings" element={<Settings />} />
            <Route path="subscription" element={<PlaceholderPage title="Subscription" />} />
            <Route path="activities" element={<PlaceholderPage title="Activities" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
