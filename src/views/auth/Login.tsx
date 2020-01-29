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
  Col,
  Alert
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
    ValidateLoginResponse,
    LoginFailResult,
    LoginResult,
    ValidateLoginResult,
    ValidateLoginFailResult
  } from "../../types/auth";
  import { authLogin, authValidate } from "../../actions/auth";

type LoginProps = RouteComponentProps & {

}

type Props = LoginProps & LinkDispatchToProps & {
    
};

type State = {
    isEmailSubmited: boolean,
    form: {
        email: string;
        token: string;
        pin: string;
    },
    alert_visible: boolean,
    alert_message: string
}

class Login extends React.Component<Props, State> {

    state = {
        isEmailSubmited: false,
        form: {
          email: "",
          token: "",
          pin: ""
        },
        alert_visible: false,
        alert_message: ''
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
                        const data: ValidateLoginResult = response.response as ValidateLoginResult;

                        if (data.result) {

                            const result = data.result;

                            localStorage.setItem("accessToken", result.accessToken);
                            localStorage.setItem("name", result.name);
                            localStorage.setItem("phoneNumber", result.phoneNumber);
                            localStorage.setItem("email", result.email);
                            localStorage.setItem("role_id", `1`);
                            localStorage.setItem("role_name", "Admin");
                        }

                        this.goDashboard("Admin");
                    })
                    .catch((response: ValidateLoginResponse) => {
                        const data: ValidateLoginFailResult = response.response as ValidateLoginFailResult;

                        if (data) {
                            this.setState({
                                alert_message: data.metaData.message,
                                alert_visible: true
                            });
                        }
                    });
            }
        } else {
            if (this.state.form.email.trim().length > 0) {
                const item: LoginInterface = {
                    identity: this.state.form.email,
                    type: "email",
                    tokenFCM: "",
                    role: "admin"
                };
        
                this.props
                    .authLogin(item)
                    .then((response: LoginResponse) => {
                        const data: LoginResult = response.response as LoginResult;
                        
                        if (data && data.result) {
                            const result = data.result;
                            
                            this.setState({
                                isEmailSubmited: true,
                                form: {
                                    ...this.state.form,
                                    email: this.state.form.email,
                                    token: result.token
                                },
                                alert_message: '',
                                alert_visible: false
                            });
                        }
                    })
                    .catch((response: LoginResponse) => {
                        const data: LoginFailResult = response.response as LoginFailResult;
                        
                        if (data) {
                            this.setState({
                                alert_message: data.metaData.message,
                                alert_visible: true
                            });
                        }
                    });
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

    closeErrorAlert = () => {
        this.setState({
            alert_visible: false,
            alert_message: ''
        })
    }


    render() {

        const errorAlert = (
            <Alert color="danger" isOpen={this.state.alert_visible} toggle={() => this.closeErrorAlert()} fade={false}>
                <div>{this.state.alert_message}</div>
            </Alert>
        );

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
                            {errorAlert}
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
                                        type="text"
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
