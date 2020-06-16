import * as React from "react";

import {
  Container
} from "reactstrap";

import Header from "../../components/Headers/Header";
import withTitle from '../../hoc/WithTitle';

const Dashboard: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      
      <Container className="mt--7" fluid>
        
      </Container>
    </React.Fragment>
  )
}

export default withTitle(Dashboard, "Dashboard");
