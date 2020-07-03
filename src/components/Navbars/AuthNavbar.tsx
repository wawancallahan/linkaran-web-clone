import * as React from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  Container,
  Row,
  Col
} from "reactstrap";

import { logoLinkaran } from "../../helpers/Assets";

const AuthNavbar: React.FC = () => {
  return (
    <Navbar
      className="navbar-top navbar-horizontal navbar-dark"
      expand="md"
    >
      <Container className="px-4">
        <NavbarBrand to="#" tag={Link}>
          <img alt="..." src={logoLinkaran} />
        </NavbarBrand>
      </Container>
    </Navbar>
  )
}

export default AuthNavbar;
