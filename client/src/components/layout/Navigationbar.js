import React, { Fragment } from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const Navigationbar = () => {
  return (
    <Fragment>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Node API Challenge</NavbarBrand>
        <NavbarToggler />

        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </Fragment>
  );
};

export default Navigationbar;
