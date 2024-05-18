import { FC } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "wouter";

export const Navbar: FC = () => {
  const toggle = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
  };
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link to="/" className="navbar-brand ps-3">
        CV Smart House
      </Link>
      <button
        className={`btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0`}
        onClick={toggle}
      >
        <FaBars className="text-secondary" />
      </button>
    </nav>
  );
};
