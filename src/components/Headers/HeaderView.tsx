import * as React from "react";
import { Container } from "reactstrap";

const HeaderView: React.FC = (props) => {
  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
            {props.children}
        </div>
      </Container>
    </div>
  )  
}

export default HeaderView;
