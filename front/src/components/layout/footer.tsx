'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
              <span className="font-bold text-xl">{t('appName', 'Gozarish')}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              {t(
                'description',
                'A citizen report registration system for submitting reports about public issues securely and anonymously.'
              )}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{t('quickLinks', 'Quick Links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/reports/new"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('submitReport', 'Submit Report')}
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('myReports', 'My Reports')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('about', 'About')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('contact', 'Contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and support */}
          <div>
            <h3 className="text-sm font-semibold mb-3">{t('support', 'Support')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('privacyPolicy', 'Privacy Policy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('termsOfService', 'Terms of Service')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('faq', 'FAQ')}
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('help', 'Help Center')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>
            {t('copyright', '© {year} Gozarish. All rights reserved.', {
              year: new Date().getFullYear(),
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
