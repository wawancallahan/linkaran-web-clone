import * as React from "react";

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
import { accessToken } from '../../services/auth'
import { SelectStringType } from "../../types/select";
import Flash from './components/Flash'
import WithTitle from '../../hoc/WithTitle'

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps

type OptionsStringType<T> = ReadonlyArray<T>;
type ValueStringType<T> = T | OptionsStringType<T> | null | undefined;

type FormField = {
    email: string;
    token: string;
    pin: string;
    role: SelectStringType;
}

type State = {
    isEmailSubmited: boolean,
    form: FormField
    alert_visible: boolean,
    alert_message: string,
    isSubmitting: boolean
}

const roleOptions: SelectStringType[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'super admin', label: 'Super Admin' },
    { value: 'financial manager', label: 'Financial Manager' }
]

const Login: React.FC<Props> = (props) => {

    const [isEmailSubmited, setIsEmailSubmited] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [formField, setFormField] = React.useState<FormField>({
        email: "",
        token: "",
        pin: "",
        role: {
          value: 'admin', 
          label: 'Admin'
        },
    })
    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertVisible, setAlertVisible] = React.useState(false)
    
    React.useEffect(() => {
        if (accessToken()) {
            props.history.push('/admin');
        }

        document.body.classList.add("bg-default");
    }, [])

    const cancelEmailOnSubmit = () => {
        setIsEmailSubmited(false)
        setFormField({
            email: "",
            token: "",
            pin: "",
            role: {
                value: 'admin', 
                label: 'Admin'
            }
        })
    }

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.id;
        
        setFormField({
            ...formField,
            [id]: value
        })
    }

    const handleOnSubmit = () => {
        setIsSubmitting(true)

        if (isEmailSubmited) {
            if (formField.pin.trim().length > 0) {
                const item: ValidateLogin = {
                    pin: formField.pin,
                    token: formField.token
                };
      
                props.authValidate(item)
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

                        goDashboard("Admin");
                    })
                    .catch((response: ValidateLoginResponse) => {
                        const data = response.response as ValidateLoginFailResult;

                        let message = "Gagal mendapatkan response"

                        if (data) {
                            message = data.metaData.message
                        }

                        setAlertMessage(message)
                        setAlertVisible(true)
                        setIsSubmitting(false)
                    });
            }
        } else {
            if (formField.email.trim().length > 0) {
                const item: LoginInterface = {
                    identity: formField.email,
                    type: "email",
                    role: formField.role.value
                };
        
                props
                    .authLogin(item)
                    .then((response: LoginResponse) => {
                        const data: LoginResult = response.response as LoginResult;
                        
                        if (data && data.result) {
                            const result = data.result;

                            setIsEmailSubmited(true)
                            setFormField({
                                ...formField,
                                email: formField.email,
                                token: result.token
                            })
                            setAlertMessage('')
                            setAlertVisible(false)
                            setIsSubmitting(false)
                        } else {
                            setAlertMessage('')
                            setAlertVisible(false)
                            setIsSubmitting(false)
                        }
                    })
                    .catch((response: LoginResponse) => {
                        const data: LoginFailResult = response.response as LoginFailResult;
                        
                        let message = "Gagal mendapatkan response"

                        if (data) {
                            message = data.metaData.message
                        }

                        setAlertMessage(message)
                        setAlertVisible(true)
                        setIsSubmitting(false)
                    });
            }
        }
        
    }

    const goDashboard = (title: string | null) => {
        switch (title) {
            case "Admin":
                props.history.push("/admin/index");
                break;
            default:
                props.history.push("/logout");
        }
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
                                    <Flash alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible} />
                                    <Form
                                        role="form"
                                        onSubmit={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleOnSubmit();
                                        }}>

                                        <FormGroup className="mb-3">
                                            <Select options={roleOptions}
                                                defaultValue={roleOptions[0]}
                                                isDisabled={isEmailSubmited}
                                                isClearable={false}
                                                isRtl={false}
                                                isSearchable={false}
                                                name="role"
                                                onChange={(value: ValueStringType<SelectStringType>) => {
                                                    let optionTypes: SelectStringType;

                                                    if (value == null || value == undefined) {
                                                        optionTypes = {
                                                            value: "",
                                                            label: ""
                                                        }
                                                    } else if (Array.isArray(value)) {
                                                        optionTypes = value[0];
                                                    } else {
                                                        optionTypes = value as SelectStringType;
                                                    }

                                                    setFormField({
                                                        ...formField,
                                                        role: optionTypes
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
                                                disabled={isEmailSubmited}
                                                type="text"
                                                onChange={handleOnChange}
                                                id="email"
                                                />
                                            </InputGroup>
                                        </FormGroup>

                                        {isEmailSubmited ? (
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
                                                    onChange={handleOnChange}
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
                                                    {isEmailSubmited ? (
                                                        <a href="#" onClick={cancelEmailOnSubmit}>
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
                                                        onClick={handleOnSubmit}
                                                        disabled={isSubmitting}>
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
        </React.Fragment>
    )
}

type LinkDispatchToProps = {
    authLogin: (item: LoginInterface) => Promise<LoginResponse>;
    authValidate: (item: ValidateLogin) => Promise<ValidateLoginResponse>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        authLogin: (item: LoginInterface) => dispatch(authLogin(item)),
        authValidate: (item: ValidateLogin) => dispatch(authValidate(item))
    };
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Login))
, "Login")
