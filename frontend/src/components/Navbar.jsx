import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import Badge from "react-bootstrap/Badge";

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const navigate = useNavigate();
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleNavbarToggle = () => {
    setIsNavbarExpanded((prevExpanded) => !prevExpanded);
  };

  const handleNavbarLinkClick = () => {
    setIsNavbarExpanded(false);
  };

  const handleDocumentClick = (event) => {
    if (!event.target.closest(".navbar")) {
      setIsNavbarExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
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
            className={`navbar-toggler ${isNavbarExpanded ? "" : "collapsed"}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isNavbarExpanded}
            aria-label="Toggle navigation"
            onClick={handleNavbarToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarExpanded ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                  onClick={handleNavbarLinkClick}
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/MyOrder"
                    onClick={handleNavbarLinkClick}
                  >
                    Orders
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-danger text-white m-1" to="/login" onClick={handleNavbarLinkClick}>
                  Login
                </Link>

                <Link className="btn bg-danger text-white m-1" to="/createuser" onClick={handleNavbarLinkClick}>
                  Sign Up
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-danger text-white m-1" onClick={() => setCartView(!cartView)}>
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
