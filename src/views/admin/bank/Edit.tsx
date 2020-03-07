import React, { Component } from 'react';
import withTitle from '../../../hoc/WithTitle';
import HeaderView from "../../../components/Headers/HeaderView";

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    Button,
    CardBody,
    CardFooter,
    Form,
    FormGroup,
    Input,
    Label,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
import { BankShow, FormField } from '../../../types/admin/bank';
import {
    findBankAction
} from '../../../actions/admin/bank';

import FormBank from './FormEdit';
import { ApiResponse } from '../../../types/api';

type EditProps = RouteComponentProps<{
    id: string
}> & {

}

type Props = EditProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    form: FormField,
    isLoaded: boolean,
    loadedMessage: string,
    alert_visible: boolean,
    alert_message: string
}

class Create extends Component<Props, State> {

    state = {
        form: {
            nama: '',
            bankName: '',
            accountName: '',
            accountNumber: ''
        },
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findBankAction(id)
                .then((response: ApiResponse<BankShow>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: BankShow =response.response!.result;

                    form.nama = data.nama;
                    form.bankName = data.bankName.toString()
                    form.accountName = data.accountName
                    form.accountNumber = data.accountNumber

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<BankShow>) => {
                    this.setState({
                        loadedMessage: response.error!.metaData.message
                    })
                })
    }

    setAlertMessage = (message: string) => {
        this.setState({
            alert_message: message
        });
    }

    setAlertOpen = (open: boolean) => {
        this.setState({
            alert_visible: open
        })
    }

    redirectOnSuccess = () => {
        this.props.history.push('/admin/bank');
    }
    
    render() {

        const showAlertError = (
            <Alert color="danger" isOpen={this.state.alert_visible} toggle={() => this.setAlertOpen(false)} fade={false}>
                <ul>
                    <li>{this.state.alert_message}</li>
                </ul>
            </Alert>
        )

        return (
            <>
                <HeaderView />
                <Container className="mt--7" fluid>
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col>
                                    <h3 className="mb-0">Edit Bank</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormBank form={this.state.form} 
                                          setAlertMessage={this.setAlertMessage}
                                          setAlertOpen={this.setAlertOpen}
                                          redirectOnSuccess={this.redirectOnSuccess}
                                          id={+this.props.match.params.id}
                                            />
                                ) : this.state.loadedMessage
                            }
                        </CardBody>
                    </Card>
                </Container>
            </>
        );
    }
}

interface LinkStateToProps {

}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {

    }
}

interface LinkDispatchToProps {
    findBankAction: (id: number) => Promise<ApiResponse<BankShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findBankAction: (id: number) => dispatch(findBankAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Create, "Edit Bank")
    )
);