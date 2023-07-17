import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import Badge from "react-bootstrap/Badge";

const Navbar = () => {
  const [cartView, setCartView] = React.useState(false);
  const data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleCartClick = () => {
    setCartView(true);
  };

  const handleCartClose = () => {
    setCartView(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Taste
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
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
                <div className="btn bg-danger text-white m-1" onClick={handleCartClick}>
                  Cart{" "}
                  <Badge pill bg="white" text="black">
                    {data.length}
                  </Badge>
                </div>
                {cartView && (
                  <Modal onClose={handleCartClose}>
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
