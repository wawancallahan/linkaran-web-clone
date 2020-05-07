import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import PropTypes from "prop-types"
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
import DropdownLink from "./DropdownLunk"
import SingleLink from "./SingleLink"

import './Sidebar.css';

export type SidebarRoute = {
  path: string,
  name: string,
  icon: string,
  roles: string[],
  child?: (SidebarRoute | null)[]
}

export type SidebarDropdown = {
  index: string,
  collapseOpen: boolean,
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

type State = {
  collapseOpen: boolean,
  collapseSidebarDropdown: SidebarDropdown[]
}

class Sidebar extends React.Component<Props, State> {

  static defaultProps = {
    routes: [{}]
  };

  static propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
      // innerLink is for links that will direct the user within the app
      // it will be rendered as <Link to="...">...</Link> tag
      innerLink: PropTypes.string,
      // outterLink is for links that will direct the user outside the app
      // it will be rendered as simple <a href="...">...</a> tag
      outterLink: PropTypes.string,
      // the image src of the logo
      imgSrc: PropTypes.string.isRequired,
      // the alt for the img
      imgAlt: PropTypes.string.isRequired
    })
  };

  state = {
    collapseOpen: false,
    collapseSidebarDropdown: []
  };

  componentDidMount() {
    const sidebarDropdown = this.props.routes.map((prop: any, key: number) => {
      if (prop.hasOwnProperty('child')) {
        return {
          index: `nav_dropdown_${key}`,
          collapseOpen: false,
        }
      } else {
        return {
          index: `nav_${key}`,
          collapseOpen: false,
        };
      }
    })
    
    this.setState({
      collapseSidebarDropdown: sidebarDropdown
    });
  }

  toggleCollapseSidebar = (index: number, key: string) => {

    const collapseSidebarDropdown: SidebarDropdown[] = {
      ...this.state.collapseSidebarDropdown
    };

    collapseSidebarDropdown[index].collapseOpen = ! collapseSidebarDropdown[index].collapseOpen;
    
    const newCollapseSidebarDropdown: SidebarDropdown[] = {
      ...collapseSidebarDropdown
    }

    this.setState({
      collapseSidebarDropdown: newCollapseSidebarDropdown
    });
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = (routeName: string) => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };

  // creates the links that appear in the left menu / Sidebar
  createLinks = (routes: (SidebarRoute | null)[]) => {
    return routes.map((item: (SidebarRoute | null), key: number) => (
      <NavItem key={key}>
        {
          item ? (
            item.child ? (
              <DropdownLink key={`${key}`}
                                  index={key}
                                  item={item}
                                  SidebarDropdown={this.state.collapseSidebarDropdown}
                                  closeCollapse={this.closeCollapse}
                                  toggleCollapseSidebar={this.toggleCollapseSidebar} />
            ) : (
              <SingleLink key={`${key}`}
                                index={key}
                                path={item.path}
                                closeCollapse={this.closeCollapse}
                                icon={item.icon}
                                name={item.name}
                                isChild={false} />
            )
          ) : null
        }
      </NavItem>
    ));
  };

  Logout = () => {
    this.props.history.push('/logout');
  }

  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
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
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
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
                <DropdownItem href="#pablo" onClick={this.Logout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>
            {/* Divider */}
            <hr className="my-3" />
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Sidebar;
