import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '../layouts/AdminLayout';

import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Categories } from '../pages/Categories';
import { Products } from '../pages/Products';
import { Orders } from '../pages/Orders';
import { Customers } from '../pages/Customers';
import { Blogs } from '../pages/Blogs';
import { Newsletter } from '../pages/Newsletter';
import { ContactMessages } from '../pages/ContactMessages';
import { Banners } from '../pages/Banners';
import { Settings } from '../pages/Settings';
import { Profile } from '../pages/Profile';

export function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Unprotected Login */}
        <Route path="login" element={<Login />} />

        {/* Protected Admin Shell */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="contact" element={<ContactMessages />} />
            <Route path="banners" element={<Banners />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default AdminRoutes;
