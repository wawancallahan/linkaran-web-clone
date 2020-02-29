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
  Alert,
  Container
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
import { Role } from "../../types/admin/role";

import Select from 'react-select'

import AuthNavbar from "../../components/Navbars/AuthNavbar";
import AuthFooter from "../../components/Footers/AuthFooter";

type LoginProps = RouteComponentProps & {

}

type Props = LoginProps & LinkDispatchToProps & {
    
};

interface OptionType {
    value: string,
    label: string
}

type OptionsType<OptionType> = ReadonlyArray<OptionType>;
type ValueType<OptionType> = OptionType | OptionsType<OptionType> | null | undefined;

type State = {
    isEmailSubmited: boolean,
    form: {
        email: string;
        token: string;
        pin: string;
        role: OptionType;
    },
    alert_visible: boolean,
    alert_message: string,
    isSubmitting: boolean
}

const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'super admin', label: 'Super Admin' },
    { value: 'financial manager', label: 'Financial Manager' }
]

class Login extends React.Component<Props, State> {

    state = {
        isEmailSubmited: false,
        form: {
          email: "",
          token: "",
          pin: "",
          role: {
            value: 'admin', 
            label: 'Admin'
          },
        },
        alert_visible: false,
        alert_message: '',
        isSubmitting: false
    }

    componentDidMount() {
        if (localStorage.getItem('accessToken')) {
            this.props.history.push('/admin');
        }

        document.body.classList.add("bg-default");
    } 

    cancelEmailOnSubmit = () => {
        this.setState({
            isEmailSubmited: false,
            form: {
                email: "",
                token: "",
                pin: "",
                role: {
                    value: 'admin', 
                    label: 'Admin'
                }
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

        this.setState({
            isSubmitting: true
        }, () => {
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

                                if (result.roles) {
                                    const roles = JSON.stringify(Object.assign({}, result.roles.map((value: Role) => value.title)));

                                    localStorage.setItem("roles", roles)
                                }
                            }
    
                            this.goDashboard("Admin");
                        })
                        .catch((response: ValidateLoginResponse) => {
                            const data = response.response as ValidateLoginFailResult;
    
                            let message = "Gagal mendapatkan response"
    
                            if (data) {
                                message = data.metaData.message
                            }
    
                            this.setState({
                                alert_message: message,
                                alert_visible: true,
                                isSubmitting: false
                            });
                        });
                }
            } else {
                if (this.state.form.email.trim().length > 0) {
                    const item: LoginInterface = {
                        identity: this.state.form.email,
                        type: "email",
                        tokenFCM: "",
                        role: this.state.form.role.value
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
                                    alert_visible: false,
                                    isSubmitting: false
                                });
                            } else {
                                this.setState({
                                    alert_message: '',
                                    alert_visible: false,
                                    isSubmitting: false
                                });
                            }
                        })
                        .catch((response: LoginResponse) => {
                            const data: LoginFailResult = response.response as LoginFailResult;
                            
                            let message = "Gagal mendapatkan response"
    
                            if (data) {
                                message = data.metaData.message
                            }
    
                            this.setState({
                                alert_message: message,
                                alert_visible: true,
                                isSubmitting: false
                            });
                        });
                }
            }
        })

        
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
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
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
                                            <Select options={roleOptions}
                                                defaultValue={roleOptions[0]}
                                                isDisabled={this.state.isEmailSubmited}
                                                isClearable={false}
                                                isRtl={false}
                                                isSearchable={false}
                                                name="role"
                                                onChange={(value: ValueType<OptionType>) => {
                                                    let optionTypes: OptionType;

                                                    if (value == null || value == undefined) {
                                                        optionTypes = {
                                                            value: "",
                                                            label: ""
                                                        }
                                                    } else if (Array.isArray(value)) {
                                                        optionTypes = value[0];
                                                    } else {
                                                        optionTypes = value as OptionType;
                                                    }

                                                    this.setState(prevState => {
                                                        return {
                                                            form: {
                                                                ...prevState.form,
                                                                role: optionTypes
                                                            }
                                                        }
                                                    })
                                                }}
                                            />
                                        </FormGroup>

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
                                                        onClick={this.formSubmit}
                                                        disabled={this.state.isSubmitting}>
                                                        Next
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <AuthFooter />
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
