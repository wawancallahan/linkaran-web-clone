import * as React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminFooter from "../components/Footers/AdminFooter";
import Sidebar from "../components/Sidebar/Sidebar";
import { logoLinkaran } from "../helpers/Assets";
import { rolesToArray } from "../services/auth";
import { SidebarRoute } from '../components/Sidebar/Sidebar'
import roleRoutes, { Route as RouteInterface } from '../routes'
import { connect } from "react-redux";
import { AppState } from "../reducers";

const routeList: (SidebarRoute | null)[] = [
  {
      path: "/admin/index",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      roles: ["admin", "super admin"]
  },
  {
      path: "/admin/food-category",
      name: "Kategori Makanan",
      icon: "ni ni-ungroup text-danger",
      roles: ["super admin", "admin"]
  },
  {
      path: "/admin/food",
      name: "Makanan",
      icon: "ni ni-bag-17 text-success",
      roles: ["super admin", "admin"]
  },
  {
      path: "/admin/restaurant",
      name: "Restoran",
      icon: "ni ni-shop text-info",
      roles: ["super admin", "admin"]
  },
  {
      path: "/admin/brand-vehicle",
      name: "Model Kendaraan",
      icon: "ni ni-app text-warning",
      roles: ["super admin", "admin"]
  },
  {
      path: "/admin/sub-brand-vehicle",
      name: "Merek Kendaraan",
      icon: "ni ni-briefcase-24 text-info",
      roles: ["super admin", "admin"]
  },
  {
      path: "/admin/user",
      name: "User",
      icon: "ni ni-single-02 text-danger",
      roles: ["super admin"]
  },
  {
      path: "/admin/driver",
      name: "Driver",
      icon: "ni ni-badge text-success",
      roles: ["super admin", "admin"]
  },
  {
      path: "/admin/customer",
      name: "Customer",
      icon: "ni ni-single-02 text-primary",
      roles: ["super admin"]
  },
  {
      path: "/admin/investor",
      name: "Investor",
      icon: "ni ni-hat-3 text-warning",
      roles: ["super admin"]
  },
  {
      path: "/admin/transaction",
      name: "Transaksi",
      icon: "ni ni-collection text-primary",
      roles: ["super admin", "admin"],
      activeRouteName: '/admin/transaction',
      child: [
          {
              path: "/admin/transaction/application",
              name: "Aplikasi",
              icon: "ni ni-fat-delete text-default",
              roles: ["super admin", "admin"]
          },
          {
              path: "/admin/transaction/link-pay",
              name: "Link Pay",
              icon: "ni ni-fat-delete text-default",
              roles: ["super admin", "admin"]
          },
      ]
  },
  {
      path: "/admin/account",
      name: "Akun",
      icon: "ni ni-circle-08 text-info",
      roles: ["super admin", "admin"],
      activeRouteName: '/admin/account',
      child: [
          {
              path: "/admin/account/link-pay",
              name: "Link Pay",
              icon: "ni ni-fat-delete text-default",
              roles: ["super admin", "admin"]
          },
      ]
  },
  {
      path: "/admin/service",
      name: "Layanan",
      icon: "ni ni-mobile-button text-danger",
      roles: ["super admin"]
  },
  {
      path: "/admin/price",
      name: "Harga",
      icon: "ni ni-money-coins text-success",
      roles: ["super admin"]
  },
  {
      path: "/admin/service-price",
      name: "Harga Layanan",
      icon: "ni ni-credit-card text-primary",
      roles: ["super admin"]
  },
  {
      path: "/admin/voucher-promo",
      name: "Voucher",
      icon: "ni ni-paper-diploma text-info",
      roles: ["super admin"]
  },
  {
      path: "/admin/voucher-type",
      name: "Tipe Voucher",
      icon: "ni ni-ungroup text-warning",
      roles: ["super admin"]
  },
  {
      path: "/admin/bank",
      name: "Bank",
      icon: "ni ni-credit-card text-danger",
      roles: ["super admin"]
  },
  {
      path: "/admin/region",
      name: "Wilayah",
      icon: "ni ni-compass-04 text-success",
      roles: ["super admin"],
      activeRouteName: '/admin/region',
      child: [
          {
              path: "/admin/region/country",
              name: "Negara",
              icon: "ni ni-fat-delete text-default",
              roles: ["super admin"]
          },
          {
              path: "/admin/region/province",
              name: "Provinsi",
              icon: "ni ni-fat-delete text-default",
              roles: ["super admin"]
          },
          {
              path: "/admin/region/district",
              name: "Kabupaten/ Kota",
              icon: "ni ni-fat-delete text-default",
              roles: ["super admin"]
          },
          {
              path: "/admin/region/sub-district",
              name: "Kecamatan",
              icon: "ni ni-fat-delete text-default",
              roles: ["super admin"]
          },
          {
              path: "/admin/region/village",
              name: "Kelurahan",
              icon: "ni ni-fat-delete text-default",
              roles: ["super admin"]
          }
      ]
  },
  {
    path: "/admin/manual-topup",
    name: "Manual Top Up",
    icon: "ni ni-credit-card text-danger",
    roles: ["admin", "super admin"]
  },
  {
    path: "/admin/manual-withdraw",
    name: "Manual With Draw",
    icon: "ni ni-credit-card text-info",
    roles: ["admin", "super admin"]
  },
  {
    path: "/admin/partner",
    name: "Partner",
    icon: "ni ni-circle-08 text-success",
    roles: ["admin", "super admin"]
  },
  {
    path: "/admin/history-data",
    name: "Histori",
    icon: "ni ni-archive-2 text-warning",
    roles: ["admin", "super admin"]
  },
  {
    path: "/admin/topup",
    name: "Top Up",
    icon: "ni ni-credit-card text-danger",
    roles: ["financial manager"]
  },
  {
    path: "/admin/withdraw",
    name: "With Draw",
    icon: "ni ni-credit-card text-info",
    roles: ["financial manager"]
  },
];

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps>

const Admin: React.FC<Props> = (props) => {

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
        routes={getRoutesForSidebar(routeList)}
        logo={{
          innerLink: "/admin/index",
          imgSrc: logoLinkaran,
          imgAlt: "..."
        }}
      />
      <div className="main-content">
        <AdminNavbar
          brandText={getBrandText(routeList, props.router.location.pathname)}
        />
        <Switch>
          {getRoleRoutes(roleRoutes)}
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state: AppState) => ({
  router: state.router
});

export default connect(mapStateToProps)(Admin);