import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, Briefcase } from 'lucide-react';
import { authService } from '../services/authService';
import { Button } from './ui/Button';

export const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">Portfolio OS</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NavLink>
          
          <NavLink
            to="/works/new"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <PlusCircle className="h-4 w-4" />
            Create Work
          </NavLink>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
              AD
            </div>
            <div className="text-sm">
              <p className="font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-5xl p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
