import * as React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

import { name as authName} from '../../services/auth'
import { profileImage } from "../../helpers/Assets";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { AppActions } from "../../types";
import { push } from 'connected-react-router';

type OwnProps = {
  brandText?: String;
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const PartnerNavbar: React.FC<Props> = (props) => {
  const logout = () => {
    props.push('/logout');
  }

  return (
    <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
      <Container fluid>
        <Link
          className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          to="/"
        >
          {props.brandText}
        </Link>
        <Nav className="align-items-center d-none d-md-flex" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={profileImage}
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                      { authName() }
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem onClick={logout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
  push: push
});

export default connect(null, mapDispatchToProps)(PartnerNavbar);
