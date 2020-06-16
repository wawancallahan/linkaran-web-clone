import * as React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "../components/Navbars/AuthNavbar";
import AuthFooter from "../components/Footers/AuthFooter";

import routes, { Route as IRoute } from "../routes";

const Auth: React.FC = () => {

  React.useEffect(() => {
    document.body.classList.add("bg-default");

    return () => {
      document.body.classList.remove("bg-default");
    }
  }, [])

  const getRoutes = (routes: IRoute[]) => {
    return routes.map((item: IRoute, index: number) => {
      if (item.layout === "/auth") {
        return (
          <Route
            path={item.path}
            component={item.component}
            key={index}
          />
        );
      } else {
        return null;
      }
    })
  };

  return (
    <React.Fragment>
      <div className="main-content">
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col>
              <Switch>{getRoutes(routes)}</Switch>
            </Col>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </React.Fragment>
  )
}

export default Auth;
