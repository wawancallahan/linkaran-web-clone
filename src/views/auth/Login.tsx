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
import {
    Login as LoginInterface,
    ValidateLogin,
    LoginResponse,
    ValidateLoginResponse
  } from "../../types/auth";
  import { authLogin, authValidate } from "../../actions/auth";

type LoginProps = RouteComponentProps & {

}

type Props = LoginProps & LinkDispatchToProps & {
    
};

type State = {
    isEmailSubmited: boolean;
    form: {
        email: string;
        token: string;
        pin: string;
    };
}

class Login extends React.Component<Props, State> {

    state = {
        isEmailSubmited: false,
        form: {
          email: "",
          token: "",
          pin: ""
        }
    }

    componentDidMount() {
       
    }

    cancelEmailOnSubmit = () => {
        this.setState({
            isEmailSubmited: false,
            form: {
                email: "",
                token: "",
                pin: ""
            }
        });
    }

    inputHandlerChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.id;
    
        this.setState({
          ...this.state,
          form: {
                ...this.state.form,
                [id]: value
            }
        });
    }

    formSubmit = () => {
        if (this.state.isEmailSubmited) {
            if (this.state.form.pin.trim().length > 0) {
                const item: ValidateLogin = {
                    pin: this.state.form.pin,
                    token: this.state.form.token
                };
      
                this.props
                    .authValidate(item)
                    .then((response: ValidateLoginResponse) => {
                        const data = response.response!.result;

                        if (data) {
                            localStorage.setItem("accessToken", data.accessToken);
                            localStorage.setItem("name", data.name);
                            localStorage.setItem("phoneNumber", data.phoneNumber);
                            localStorage.setItem("email", data.email);
                            localStorage.setItem("role_id", `1`);
                            localStorage.setItem("role_name", "Admin");
                        }

                        this.goDashboard("Admin");
                    })
                    .catch((response: ValidateLoginResponse) => {});
            }
        } else {
            if (this.state.form.email.trim().length > 0) {
                const item: LoginInterface = {
                    identity: this.state.form.email,
                    type: "email",
                    tokenFCM: ""
                };
        
                this.props
                    .authLogin(item)
                    .then((response: LoginResponse) => {
                        const data = response.response!.result!;
            
                        this.setState({
                            isEmailSubmited: true,
                            form: {
                                ...this.state.form,
                                email: this.state.form.email,
                                token: data.token
                            }
                        });
                    })
                    .catch(response => {});
            }
        }
    }

    goDashboard = (title: string | null) => {
        switch (title) {
            case "Admin":
                this.props.history.push("/admin/index");
                break;
            default:
                this.props.history.push("/logout");
        }
    };


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
                            <Form
                                role="form"
                                onSubmit={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.formSubmit();
                                }}>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                        placeholder="Email"
                                        disabled={this.state.isEmailSubmited}
                                        type="email"
                                        onChange={this.inputHandlerChange}
                                        id="email"
                                        />
                                    </InputGroup>
                                </FormGroup>

                                {this.state.isEmailSubmited ? (
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>

                                        <Input
                                            placeholder="Pin"
                                            type="text"
                                            onChange={this.inputHandlerChange}
                                            id="pin"
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                ) : (
                                ""
                                )}

                                <div>
                                    <Row>
                                        <Col>
                                            {this.state.isEmailSubmited ? (
                                                <a href="#" onClick={this.cancelEmailOnSubmit}>
                                                Ganti Email
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                        </Col>
                                        <Col className="text-right">
                                            <Button
                                                className=""
                                                color="primary"
                                                type="button"
                                                onClick={this.formSubmit}>
                                                Next
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
    authLogin: (item: LoginInterface) => Promise<LoginResponse>;
    authValidate: (item: ValidateLogin) => Promise<ValidateLoginResponse>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: LoginProps): LinkDispatchToProps => {
    return {
        authLogin: (item: LoginInterface) => dispatch(authLogin(item)),
        authValidate: (item: ValidateLogin) => dispatch(authValidate(item))
    };
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
