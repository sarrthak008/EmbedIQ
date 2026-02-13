import { BRAND_NAME } from "../../config/default";
import robot from "../assets/robot.png";
import ShineyCard from "../components/SineyCard"

const Footer = () => {
  return (
    <footer className="relative bg-gray-50 border-t border-gray-200 mt-24 overflow-hidden">

      {/* Robot background (left side) */}
      <img
        src={robot}
        alt="Robot"
        className="
          absolute left-0 bottom-0
          w-56 md:w-72
          opacity-10
          pointer-events-none
          hidden sm:block
        "
      />

      {/* Gradient divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="neo text-2xl font-extrabold text-gray-900">
              {BRAND_NAME}
            </h2>
            <p className="text-gray-500 mt-4 text-sm max-w-xs">
              Build, deploy, and scale intelligent AI bots for your business —
              faster than ever.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Product
            </h3>
            <ul className="mt-4 space-y-3 text-gray-600 text-sm">
              <li className="hover:text-black cursor-pointer">Features</li>
              <li className="hover:text-black cursor-pointer">Solutions</li>
              <li className="hover:text-black cursor-pointer">Pricing</li>
              <li className="hover:text-black cursor-pointer">Integrations</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-gray-600 text-sm">
              <li className="hover:text-black cursor-pointer">About</li>
              <li className="hover:text-black cursor-pointer">Blog</li>
              <li className="hover:text-black cursor-pointer">Careers</li>
              <li className="hover:text-black cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* CTA */}
          <div>
          <ShineyCard/>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-black cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-black cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-black cursor-pointer">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
