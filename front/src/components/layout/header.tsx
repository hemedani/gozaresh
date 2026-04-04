'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Moon, Sun, Menu, User, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">G</span>
          </div>
          <span className="font-bold text-xl">{t('appName', 'Gozarish')}</span>
        </Link>

        {/* Navigation links - only show on public routes */}
        {!pathname.startsWith('/admin') && isAuthenticated && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/reports"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t('myReports', 'My Reports')}
            </Link>
            <Link
              href="/reports/new"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t('newReport', 'New Report')}
            </Link>
          </nav>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={theme === 'dark' ? t('lightMode', 'Light mode') : t('darkMode', 'Dark mode')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* User menu */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.name && <p className="font-medium">{user.name}</p>}
                    {user.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                {!pathname.startsWith('/admin') && user.level >= 3 && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">{t('adminPanel', 'Admin Panel')}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile">{t('profile', 'Profile')}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="me-2 h-4 w-4" />
                  <span>{t('logout', 'Logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            !pathname.startsWith('/admin') &&
            !pathname.includes('/login') &&
            !pathname.includes('/register') && (
              <div className="flex gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">{t('login', 'Login')}</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">{t('register', 'Register')}</Link>
                </Button>
              </div>
            )
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
