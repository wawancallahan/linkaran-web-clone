import React, { Component } from 'react';
import withTitle from '../../../../hoc/WithTitle';
import HeaderView from "../../../../components/Headers/HeaderView";

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
import { AppState } from '../../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';

import FormDriver from './FormCreateFromCustomer';

import { ApiResponse, ApiResponseError } from '../../../../types/api';
import { FormFieldFromCustomer } from '../../../../types/admin/driver';
import { CustomerShow } from '../../../../types/admin/customer';
import { findCustomerAction } from '../../../../actions/admin/customer';

type CreateFromCustomerProps = RouteComponentProps<{
    id?: string
}> & {

}

type Props = CreateFromCustomerProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    form: FormFieldFromCustomer,
    alert_visible: boolean,
    alert_message: string,
    isLoaded: boolean
}

class CreateFromCustomer extends Component<Props, State> {

    state = {
        form: {
            user: {
                label: '',
                value: 0
            },
            tanggal_lahir: null,
            jenis_kelamin: null,
            tempat_lahir: '',
            no_ktp: '',
            ktp_file: null,
            ktp_file_preview: '',
            no_sim: '',
            sim_file: null,
            sim_file_preview: '',
            alamat: '',
            alamat_domisili: '',
            negara: {
                label: '',
                value: 0
            },
            provinsi: {
                label: '',
                value: 0
            },
            kabupaten_kota: {
                label: '',
                value: 0
            },
            kecamatan: {
                label: '',
                value: 0
            },
            kelurahan: {
                label: '',
                value: 0
            },
            foto_profil: null,
            foto_profil_preview: '',
            tipe_kendaraan: {
                label: '',
                value: 0
            },
            no_stnk: '',
            no_polisi: '',
            no_rangka: '',
            merek: {
                label: '',
                value: 0
            },
            jumlah_seat: null,
            warna: '',
            keterangan: '',
            rating: null,
            wasOnceAnOnlineDriver: '1',
            isActivelyBecomingAnotherOnlineDriver: '1',
            isJoiningTheDriverCommunity: '1',
            isJoiningLinkaranAsmainJob: '1',
            choiceOfActiveWorkHours: '0',
            choiceOfActiveWorkHoursOther: false,
            custom_interval_jam_kerja_start: null,
            custom_interval_jam_kerja_end: null,
            isMeried: false,
            driverHelpCenter: false
        },
        alert_visible: false,
        alert_message: '',
        isLoaded: false
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            const id = +this.props.match.params.id;

            this.props.findCustomerAction(id)
                .then((response: ApiResponse<CustomerShow>) => { 
                    let user = {
                        label: '',
                        value: 0
                    }   

                    if (response.response) {
                        const data: CustomerShow = response.response.result;

                        user = {
                            label: data.name,
                            value: data.id
                        }
                    }

                    this.setState(prevState => {
                        return {
                            form: {
                                ...prevState.form,
                                user: user
                            },
                            isLoaded: true
                        }
                    });
                })
                .catch((response: ApiResponse<CustomerShow>) => {
                    this.setState({
                        isLoaded: true
                    })
                })
        } else {
            this.setState({
                isLoaded: true
            })
        }
    }

    choiceOfActiveWorkHours = (choiceOfActiveWorkHoursText: string) : string => {

        let filterChoiceOfActiveWorkHoursText = choiceOfActiveWorkHoursText.replace(" ", "");

        if ( ! filterChoiceOfActiveWorkHoursText || filterChoiceOfActiveWorkHoursText == "") {
            filterChoiceOfActiveWorkHoursText = "00-00"
        }

        const [startTime, endTime = ""] = filterChoiceOfActiveWorkHoursText.split('-');
        
        if (startTime == '00' && endTime == '00') {
            return '0';
        } else if (startTime == '06' && endTime == '14') {
            return '1'
        } else if (startTime == '14' && endTime == '22') {
            return '2'
        } else if (startTime == '22' && endTime == '06') {
            return '3'
        }

        return '4';
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
        this.props.history.push('/admin/driver');
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
                                    <h3 className="mb-0">Tambah Driver Dari Customer</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {
                                this.state.isLoaded ? (
                                    <FormDriver form={this.state.form} 
                                        setAlertMessage={this.setAlertMessage}
                                        setAlertOpen={this.setAlertOpen}
                                        redirectOnSuccess={this.redirectOnSuccess}
                                            />
                                ) : null
                            }
                            
                        </CardBody>
                    </Card>
                </Container>
            </>
        );
    }
}

type LinkStateToProps = {

}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {

    }
}

type LinkDispatchToProps = {
    findCustomerAction: (id: number) => Promise<ApiResponse<CustomerShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: CreateFromCustomerProps) => {
    return {
        findCustomerAction: (id: number) => dispatch(findCustomerAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(CreateFromCustomer, "Tambah Driver Dari Customer")
    )
);