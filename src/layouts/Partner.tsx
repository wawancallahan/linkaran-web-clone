import * as React from "react";
import { Route, Switch, RouteComponentProps, withRouter } from "react-router-dom";
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

type OwnProps = RouteComponentProps
type Props = OwnProps

const Partner: React.FC<Props> = (props) => {

  React.useEffect(() => {
    document.body.classList.remove("bg-default");
  }, [])

  const getRoutesForSidebar = (routes: (SidebarRoute | null)[]) => {
    const roles = rolesToArray();

    return routes.map((item: SidebarRoute | null) => {
      if ( ! item) return null;

      const rolesRoutes: string[] = item.roles;
      const constainRole = rolesRoutes.some((value: string) => roles.includes(value))

      if (constainRole) {
        if (item.child) {
          const newItemChild = getRoutesForSidebar(item.child);

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

  const getRoleRoutes = (routes: RouteInterface[]) => {
    const roles = rolesToArray();
    return routes.map((prop: RouteInterface, key: number) => {
        const rolesRoutes: string[] = prop.roles;
        const constainRole = rolesRoutes.some((value: string) => roles.includes(value))

        if (prop.layout === "admin" && constainRole) {
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

  const getBrandText = (routes: (SidebarRoute | null)[], path: string) => {
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

  return (
    <React.Fragment>
      <Sidebar
        {...props}
        routes={getRoutesForSidebar(routeList)}
        logo={{
          innerLink: "/admin/index",
          imgSrc: logoLinkaran,
          imgAlt: "..."
        }}
      />
      <div className="main-content">
        <PartnerNavbar
          {...props}
          brandText={getBrandText(routeList, props.location.pathname)}
        />
        <Switch>
          {getRoleRoutes(roleRoutes)}
        </Switch>
        <Container fluid>
          <PartnerFooter />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Partner);