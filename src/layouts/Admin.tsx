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
import React, { createRef } from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminFooter from "../components/Footers/AdminFooter";
import Sidebar from "../components/Sidebar/Sidebar";
import Index from '../views/admin/Index';
import routes from "../routes";
import NotFound from '../views/NotFound';
import { logoLinkaran } from "../helpers/Assets";
import { rolesToArray } from "../services/auth";

type AdminProps = RouteComponentProps & {
  
}

class Admin extends React.Component<AdminProps, {}> {

  mainContent = createRef<HTMLDivElement>();

  getRoutes = (routes: any) => {

    const roles = rolesToArray();
    return routes.map((prop: any, key: string) => {

      const rolesRoutes: string[] = prop.roles;
      const constainRole = rolesRoutes.some((value: string) => roles.includes(value))

      if (prop.layout === "/admin" && constainRole) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path: any) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  getRoutesForSidebar = (routes: any) => {
    const roles = rolesToArray();

    return routes.filter( (item: any) => {
      const rolesRoutes: string[] = item.roles;
      const constainRole = rolesRoutes.some((value: string) => roles.includes(value))

      return item.layout === '/admin' && constainRole
    })
  }

  render() {

    return (
      <>
        <Sidebar
          {...this.props}
          routes={this.getRoutesForSidebar(routes)}
          logo={{
            innerLink: "/admin/index",
            imgSrc: logoLinkaran,
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref={this.mainContent}>
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            <Route path="/admin" exact render={() => <Index />} />
            <Route path="/admin/index" exact render={() => <Index />} />
            {this.getRoutes(routes)}
            <Route component={NotFound} />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
