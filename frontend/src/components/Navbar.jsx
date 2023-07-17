import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import Badge from "react-bootstrap/Badge";

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleNavbarToggle = () => {
    setIsNavbarOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsNavbarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" ref={navbarRef}>
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Taste
          </Link>
          <button
            className={`navbar-toggler ${isNavbarOpen ? "" : "collapsed"}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isNavbarOpen}
            aria-label="Toggle navigation"
            onClick={handleNavbarToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/" onClick={handleNavbarToggle}>
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/MyOrder" onClick={handleNavbarToggle}>
                    Orders
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-danger text-white m-1" to="/login" onClick={handleNavbarToggle}>
                  Login
                </Link>

                <Link className="btn bg-danger text-white m-1" to="/createuser" onClick={handleNavbarToggle}>
                  Sign Up
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-danger text-white m-1" onClick={() => setCartView(true)}>
                  Cart{" "}
                  <Badge pill bg="white" text="black">
                    {data.length}
                  </Badge>
                </div>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}

                <div className="btn bg-danger text-white m-1" onClick={handleLogout}>
                  Log out
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
