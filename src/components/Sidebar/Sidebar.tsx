import * as React from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap"
import { name as authName} from '../../services/auth'
import { profileImage } from "../../helpers/Assets"
import DropdownLink from "./DropdownLink"
import SingleLink from "./SingleLink"
import './Sidebar.css';

export type SidebarRoute = {
  path: string,
  name: string,
  icon: string,
  roles: string[],
  child?: (SidebarRoute | null)[],
  activeRouteName?: string
}

export type logoInterface = {
  innerLink?: string,
  outterLink?: string,
  imgAlt?: string,
  imgSrc?: string
}

export type SidebarProps = RouteComponentProps & {
  bgColor?: string;
  routes: (SidebarRoute | null)[];
  logo?: logoInterface;
}

type Props = SidebarProps

const Sidebar: React.FC<Props> = (props) => {

  const [collapseVisible, setCollapseVisible] = React.useState(false)

  const toggleCollapse = () => {
    setCollapseVisible( ! collapseVisible)
  };

  const closeCollapse = () => {
    setCollapseVisible(false)
  };

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes: (SidebarRoute | null)[]) => {
    return routes.map((item: (SidebarRoute | null), key: number) => (
      <NavItem key={key}>
        {
          item ? (
            item.child ? (
              <DropdownLink key={`${key}`}
                                  index={key}
                                  item={item}
                                  closeCollapse={closeCollapse} />
            ) : (
              <SingleLink key={`${key}`}
                                index={key}
                                path={item.path}
                                closeCollapse={closeCollapse}
                                icon={item.icon}
                                name={item.name}
                                isChild={false} />
            )
          ) : null
        }
      </NavItem>
    ));
  };

  const logout = () => {
    props.history.push('/logout');
  }
  
  let navbarBrandProps: any;

  if (props.logo && props.logo.innerLink) {
    navbarBrandProps = {
      to: props.logo.innerLink,
      tag: Link
    };
  } else if (props.logo && props.logo.outterLink) {
    navbarBrandProps = {
      href: props.logo.outterLink,
      target: "_blank"
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {props.logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={props.logo.imgAlt}
              className="navbar-brand-img"
              src={props.logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={profileImage}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">{ authName() }</h6>
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={logout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseVisible}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {props.logo ? (
                <Col className="collapse-brand" xs="6">
                  {props.logo.innerLink ? (
                    <Link to={props.logo.innerLink}>
                      <img alt={props.logo.imgAlt} src={props.logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={props.logo.outterLink}>
                      <img alt={props.logo.imgAlt} src={props.logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>{createLinks(props.routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default Sidebar;
