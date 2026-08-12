import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  ShoppingBag,
  ShoppingCart,
  Bell,
  RefreshCcw,
  Users,
  FileText,
  Mail,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  User,
  LogOut,
  Menu,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ADMIN_ROUTES } from '../constants/admin.constants';

const NAVIGATION_ITEMS = [
  // { name: 'Dashboard', path: ADMIN_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Categories', path: ADMIN_ROUTES.CATEGORIES, icon: Layers },
  { name: 'Products', path: ADMIN_ROUTES.PRODUCTS, icon: ShoppingBag },
  // { name: 'Orders', path: ADMIN_ROUTES.ORDERS, icon: ShoppingCart },
  // { name: 'Notifications', path: ADMIN_ROUTES.NOTIFICATIONS, icon: Bell },
  // { name: 'Abandoned Carts', path: ADMIN_ROUTES.ABANDONED_CARTS, icon: RefreshCcw },
  // { name: 'Customers', path: ADMIN_ROUTES.CUSTOMERS, icon: Users },
  // { name: 'Blogs', path: ADMIN_ROUTES.BLOGS, icon: FileText },
  // { name: 'Newsletter', path: ADMIN_ROUTES.NEWSLETTER, icon: Mail },
  // { name: 'Contact Messages', path: ADMIN_ROUTES.CONTACT, icon: MessageSquare },
  // { name: 'Banners', path: ADMIN_ROUTES.BANNERS, icon: ImageIcon },
  // { name: 'Settings', path: ADMIN_ROUTES.SETTINGS, icon: Settings },
  { name: 'Profile', path: ADMIN_ROUTES.PROFILE, icon: User }
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate(ADMIN_ROUTES.LOGIN);
  };

  const currentItem = NAVIGATION_ITEMS.find(
    (item) =>
      location.pathname === item.path ||
      (item.path !== ADMIN_ROUTES.DASHBOARD && location.pathname.startsWith(item.path))
  );

  return (
    <div className="h-screen overflow-hidden bg-[#F4F5F7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans">
      {/* Single Clean Left Sidebar */}
      <aside className="w-64 bg-[#EBECEE] dark:bg-slate-900 border-r border-slate-300/80 dark:border-slate-800 hidden lg:flex flex-col py-6 px-4 shrink-0 justify-between">
        <div className="space-y-6">
          {/* Top Brand Logo */}
          <Link to={ADMIN_ROUTES.DASHBOARD} className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold shadow-sm shrink-0">
              G
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-slate-100">GoldenMeraki</span>
              <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">Admin Panel</span>
            </div>
          </Link>

          <div className="border-b border-slate-300/70 dark:border-slate-800" />

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== ADMIN_ROUTES.DASHBOARD && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all ${
                    isActive
                      ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-300/50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Sign Out Footer */}
        {user && (
          <div className="pt-4 border-t border-slate-300/70 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <img
                src={
                  user.avatar ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
                }
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-slate-300 dark:ring-slate-700"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user.name}</span>
                <span className="text-[10px] text-slate-500 truncate">{user.email}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Top Navbar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 w-full fixed top-0 left-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-700 dark:text-slate-300">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-base text-slate-900 dark:text-slate-100">GoldenMeraki Admin</span>
        </div>
        <button onClick={handleLogout} className="p-2 text-rose-600 dark:text-rose-400">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-64 max-w-xs bg-[#EBECEE] dark:bg-slate-900 p-5 flex flex-col z-50 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">GoldenMeraki</h2>
            <div className="space-y-1 overflow-y-auto flex-1">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-300 text-slate-800 dark:text-slate-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 rounded-lg hover:bg-rose-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden pt-14 lg:pt-0">
        {/* Simple Top Breadcrumb Header */}
        <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-100">{currentItem ? currentItem.name : 'Dashboard'}</span>
          </div>
        </header>

        <main className="flex-1 h-screen overflow-y-auto bg-[#F4F5F7] dark:bg-slate-950 p-4 lg:p-8 pt-20 lg:pt-8 w-full relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
