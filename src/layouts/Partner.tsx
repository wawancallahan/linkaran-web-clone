import React, { createRef, Component } from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import PartnerNavbar from "../components/Navbars/PartnerNavbar";
import PartnerFooter from "../components/Footers/PartnerFooter";
import Sidebar from "../components/Sidebar/Sidebar";
import { logoLinkaran } from "../helpers/Assets";
import { rolesToArray } from "../services/auth";
import { SidebarRoute } from '../components/Sidebar/Sidebar'
import roleRoutes, { Route as RouteInterface } from '../routes'

const routeList: (SidebarRoute | null)[] = [
  {
    path: "/partner/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    roles: ["partner"]
},
];

type PartnerProps = RouteComponentProps
type Props = PartnerProps

class Partner extends Component<Props> {

  mainContent = createRef<HTMLDivElement>();

  componentDidMount() {
    document.body.classList.remove("bg-default");
  }

  getRoutesForSidebar = (routes: (SidebarRoute | null)[]) => {
    const roles = rolesToArray();

    return routes.map((item: SidebarRoute | null) => {
      if ( ! item) return null;

      const rolesRoutes: string[] = item.roles;
      const constainRole = rolesRoutes.some((value: string) => roles.includes(value))

      if (constainRole) {
        if (item.child) {
          const newItemChild = this.getRoutesForSidebar(item.child);

          item.child = newItemChild
        }

        return item;
      }

      return null;
    }).filter((value: SidebarRoute | null) => {
      if (value) return true

      return false
    });
  }

  getRoleRoutes = (routes: RouteInterface[]) => {
    const roles = rolesToArray();
    return routes.map((prop: RouteInterface, key: number) => {
        const rolesRoutes: string[] = prop.roles;
        const constainRole = rolesRoutes.some((value: string) => roles.includes(value))

        if (prop.layout === "partner" && constainRole) {
            return (
                <Route
                    exact={prop.exact}
                    path={prop.path}
                    component={prop.component}
                    key={`${prop.path.replace('/', '_')}_${key}`}
                />
            );
        } else {
            return null;
        }
    });
  }

  getBrandText = (routes: (SidebarRoute | null)[], path: string) => {
    let brandText = 'Brand';

    for (const route of routes) {
      if (route) {
        if (path.indexOf(route.path) !== -1) {
          brandText =  route.name;
          break;
        };
      }
    }

    return brandText;
  };

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={this.getRoutesForSidebar(routeList)}
          logo={{
            innerLink: "/admin/index",
            imgSrc: logoLinkaran,
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref={this.mainContent}>
          <PartnerNavbar
            {...this.props}
            brandText={this.getBrandText(routeList, this.props.location.pathname)}
          />
          <Switch>
            {this.getRoleRoutes(roleRoutes)}
          </Switch>
          <Container fluid>
            <PartnerFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Partner;