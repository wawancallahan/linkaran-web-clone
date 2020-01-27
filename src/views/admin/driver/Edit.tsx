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

import FormDriver from './FormEdit';

import {
    findDriverAction
} from '../../../actions/admin/driver';

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

class Edit extends Component<Props, State> {

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
            pertanyaan_1: '1',
            pertanyaan_2: '1',
            pertanyaan_3: '1',
            pertanyaan_4: '1',
            pertanyaan_5: '0',
            custom_interval_jam_kerja_start: null,
            custom_interval_jam_kerja_end: null
        },
        alert_visible: false,
        alert_message: '',
        isLoaded: false,
        loadedMessage: '',
    }

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findDriverAction(id)
                .then((response: ApiResponse<Driver>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: Driver =response.response!.result;

                    form.alamat = data.address;
                    form.email = data.user.email;
                    form.foto_profil_preview = data.photo;
                    form.jenis_kelamin = data.gender == 'L' ? 1 : 0;
                    form.jumlah_seat = 0;
                    form.kabupaten_kota = {
                        value: data.district.id,
                        label: data.district.name
                    }
                    form.kecamatan = {
                        value: data.subDistrict.id,
                        label: data.subDistrict.name
                    }
                    form.kelurahan = {
                        value: data.village.id,
                        label: data.village.name
                    }
                    form.keterangan = '';
                    form.ktp_file_preview = data.ktpPhoto;
                    form.merek = {
                        value: data.user.vehicle.subBrandVehicle.id,
                        label: data.user.vehicle.subBrandVehicle.name
                    }
                    form.nama = data.user.name;
                    form.negara = {
                        value: data.country.id,
                        label: data.country.name
                    }
                    form.no_ktp = data.identityNumber;
                    form.no_polisi = data.user.vehicle.policeNumber;
                    form.no_rangka = '';
                    form.no_stnk = '';
                    form.no_telepon = data.user.phoneNumber;
                    form.provinsi = {
                        value: data.province.id,
                        label: data.province.name
                    }
                    form.rating = data.rating;
                    form.tanggal_lahir = new Date(data.dateOfBirth);
                    form.tipe_kendaraan = {
                        value: data.user.vehicle.vehicleType.id,
                        label: data.user.vehicle.vehicleType.name
                    }
                    form.warna = '';

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<Driver>) => {
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
                                    <h3 className="mb-0">Edit Driver</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormDriver form={this.state.form} 
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
    findDriverAction: (id: number) => Promise<ApiResponse<Driver>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findDriverAction: (id: number) => dispatch(findDriverAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Edit, "Edit Driver")
    )
);