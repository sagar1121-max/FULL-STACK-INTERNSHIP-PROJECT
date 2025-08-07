import React from "react";

import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav>
      <Link to="/">
        <h2>Shopy</h2>
      </Link>

      <Link to="/cart">
        <i class="ri-shopping-cart-line"></i>
      </Link>
    </nav>
  );
};

export default UserNav;
