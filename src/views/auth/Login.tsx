import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { ThunkDispatch } from "redux-thunk";
import { connect } from 'react-redux';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { AppActions } from '../../types/index';

import axiosService from '../../services/axiosService';

type LoginProps = RouteComponentProps & {

}

type Props = LoginProps & LinkDispatchToProps;

type State = {
  
}

class Login extends React.Component<Props, State> {

    state = {
     
    }

    componentDidMount() {
       
    }

    cancelEmailOnSubmit = () => {
        
    }

    inputHandlerChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.id;
    }

    formSubmit = () => {
        
    }

    goDashboard = (title: string | null) => {
        switch (title) {
            default: 
                this.props.history.push('/logout');
        }
    }

    render() {
        return (
            <>
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-2 mb-3">
                                Log in
                            </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Email" type="email" onChange={this.inputHandlerChange} id="email" />
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                    
                                        <Input placeholder="Password" type="password" onChange={this.inputHandlerChange} id="password"  />
                                    </InputGroup>
                                </FormGroup>

                                <div>
                                    <Row>
                                        <Col className="text-right">
                                            <Button className="" color="primary" type="button" onClick={this.formSubmit}>
                                                Login
                                            </Button>
                                        </Col>
                                    </Row>
                                    
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }
}

interface LinkDispatchToProps {
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: LoginProps): LinkDispatchToProps => {
    return {
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
