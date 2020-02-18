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
import { Driver, FormField } from '../../../types/admin/driver';

import FormDriver from './Form';

type CreateProps = RouteComponentProps & {

}

type Props = CreateProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    form: FormField,
    alert_visible: boolean,
    alert_message: string
}

class Create extends Component<Props, State> {

    state = {
        form: {
            nama: '',
            no_telepon: '',
            email: '',
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
            isMeried: false
        },
        alert_visible: false,
        alert_message: ''
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
                                    <h3 className="mb-0">Tambah Driver</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            <FormDriver form={this.state.form} 
                                          setAlertMessage={this.setAlertMessage}
                                          setAlertOpen={this.setAlertOpen}
                                          redirectOnSuccess={this.redirectOnSuccess}
                                            />
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

}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: CreateProps) => {
    return {

    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Create, "Tambah Driver")
    )
);