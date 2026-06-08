import { Link } from 'react-router-dom';
import { Ticket, Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { NAV_LINKS } from '../lib/constants';

const supportLinks = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact Us', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-obsidian border-t border-gold/10">
      <div className="max-w-container mx-auto container-padding py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Ticket className="w-5 h-5 text-gold" />
              <span className="text-lg font-display font-bold">
                <span className="text-ivory">Event</span>
                <span className="text-gold">Pass</span>
              </span>
            </Link>
            <p className="text-ash text-body-sm mb-6">
              Your gateway to unforgettable moments.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-gold transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-gold transition-colors">
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-gold transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-gold transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-ivory font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-ash hover:text-gold transition-colors text-body-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-ivory font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-ash hover:text-gold transition-colors text-body-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-ivory font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-ash text-body-sm">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>hello@eventpass.com</span>
              </div>
              <div className="flex items-center gap-2 text-ash text-body-sm">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-2 text-ash text-body-sm">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>123 Entertainment Ave, New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-ash/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ash/60 text-body-sm">
            &copy; 2025 EventPass. All rights reserved.
          </p>
          <p className="text-ash/60 text-body-sm">
            Designed with passion for entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
}
