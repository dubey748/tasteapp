import React, { useState, useRef, useEffect } from "react";
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleNavbarToggle = () => {
    setCartView((prevView) => !prevView);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setCartView(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Taste
          </Link>
          <button
            className={`navbar-toggler ${cartView ? "" : "collapsed"}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={cartView ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={handleNavbarToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${cartView ? "show" : ""}`} id="navbarNav" ref={navbarRef}>
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/MyOrder">
                    Orders
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-danger text-white m-1" to="/login">
                  Login
                </Link>

                <Link className="btn bg-danger text-white m-1" to="/createuser">
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
