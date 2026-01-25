import { useState } from "react";
import { BRAND_NAME } from "../../config/default";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-xl md:text-2xl font-extrabold neo">
            {BRAND_NAME}
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/#home" className="hover:text-black">Home</Link>
            <Link to="/#solutions" className="hover:text-black">Solutions</Link>
            <Link to="/#pricing" className="hover:text-black">Pricing</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center ">
            <button className="bg-black text-white px-5 py-2 rounded-full">
              Get Started →
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Side Menu (RIGHT) */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 bg-white z-50
          transform transition-transform duration-300
          md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b flex justify-between items-center">
          <h1 className="text-xl font-extrabold neo">
            {BRAND_NAME}
          </h1>
          <button onClick={closeMenu}>✕</button>
        </div>

        {/* Mobile Menu */}
        <nav className="flex flex-col px-6 py-6 gap-6 text-gray-700 font-medium">
          <Link to="/#home" onClick={closeMenu}>Home</Link>
          <Link to="/#solutions" onClick={closeMenu}>Solutions</Link>
          <Link to="/#pricing" onClick={closeMenu}>Pricing</Link>

          <div className="border-t pt-6 flex flex-col gap-4">
            <button className="bg-black text-white py-3 rounded-full">
              Get Started →
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
