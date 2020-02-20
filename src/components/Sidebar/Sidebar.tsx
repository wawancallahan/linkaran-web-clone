/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link, RouteComponentProps } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import { name as authName} from '../../services/auth'

import './Sidebar.css';
import { profileImage } from "../../helpers/Assets";

export interface SidebarRoute {
  path: string,
  name: string,
  icon: string,
  roles: string[],
  child?: (SidebarRoute | null)[]
}

interface logoInterface {
  innerLink?: string,
  outterLink?: string,
  imgAlt?: string,
  imgSrc?: string
}

interface SidebarDropdown {
  index: string,
  collapseOpen: boolean,
} 

const CreateDropdownLink = (props: {
  key: string,
  index: number,
  item: SidebarRoute,
  SidebarDropdown: SidebarDropdown[],
  closeCollapse: () => void,
  toggleCollapseSidebar: (index: number, key: string) => void,
}) => {

  const collapseSidebarDropdown: SidebarDropdown[] = {
    ...props.SidebarDropdown
  };

  let isOpen = false;

  if (collapseSidebarDropdown[props.index]) {
    isOpen = collapseSidebarDropdown[props.index].collapseOpen;
  }

  return (
    <>
      <NavLink
        onClick={() => props.toggleCollapseSidebar(props.index, `nav_dropdown_${props.index}`)}
        id={`nav_dropdown_${props.index}`}
        className={`SidebarDropdown ${isOpen ? 'ActiveDropdown' : ''}`}
      >
        <i className={props.item.icon} />
        {props.item.name}
        <span className="dropdown-icon">
          <i className="fa fa-angle-right"></i>
        </span>
      </NavLink>
      <Collapse isOpen={isOpen}>
          {props.item.child ? props.item.child.map((item: any, index: number) => {
              return <CreateSingleLink key={`nav_dropdown_${props.index}_${index}`}
                                index={index}
                                path={item.path}
                                closeCollapse={props.closeCollapse}
                                icon={item.icon}
                                name={item.name}
                                isChild={true} />
            }) : null}
      </Collapse>
    </>
  );
}

const CreateSingleLink = (props: {
  key: string,
  index: number,
  path: string,
  closeCollapse: () => void,
  icon: string,
  name: string,
  isChild: boolean
}) => (
  <NavLink
    to={props.path}
    tag={NavLinkRRD}
    onClick={props.closeCollapse}
    activeClassName="active"
    className={`${props.isChild ? 'nav-link-child' : ''}`}
  >
    <i className={props.icon} />
    {props.name}
  </NavLink>
);

type SidebarProps = RouteComponentProps & {
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
              <CreateDropdownLink key={`${key}`}
                                  index={key}
                                  item={item}
                                  SidebarDropdown={this.state.collapseSidebarDropdown}
                                  closeCollapse={this.closeCollapse}
                                  toggleCollapseSidebar={this.toggleCollapseSidebar} />
            ) : (
              <CreateSingleLink key={`${key}`}
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
                  <h6 className="text-overflow m-0">{ authName }</h6>
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
