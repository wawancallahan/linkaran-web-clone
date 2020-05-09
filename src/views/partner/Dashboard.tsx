import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import Header from "../../components/Headers/Header";
import withTitle from '../../hoc/WithTitle';

type IndexState = {
  activeNav: number,
}

class Index extends React.Component<{}, IndexState> {
  state = {
    activeNav: 1,
  };
  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          
        </Container>
      </>
    );
  }
}

export default withTitle(Index, "Dashboard");
