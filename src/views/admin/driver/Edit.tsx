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

import { ApiResponse, ApiResponseError } from '../../../types/api';

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
            wasOnceAnOnlineDriver: '1',
            isActivelyBecomingAnotherOnlineDriver: '1',
            isJoiningTheDriverCommunity: '1',
            isJoiningLinkaranAsmainJob: '1',
            choiceOfActiveWorkHours: '0',
            choiceOfActiveWorkHoursOther: false,
            custom_interval_jam_kerja_start: null,
            custom_interval_jam_kerja_end: null
        },
        alert_visible: false,
        alert_message: '',
        isLoaded: false,
        loadedMessage: '',
    }

    choiceOfActiveWorkHours = (choiceOfActiveWorkHoursText: string) : string => {

        if ( ! choiceOfActiveWorkHoursText) {
            choiceOfActiveWorkHoursText = "00-00"
        }

        const [startTime, endTime] = choiceOfActiveWorkHoursText.split('-');
        
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

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findDriverAction(id)
                .then((response: ApiResponse<Driver>) => {

                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: Driver = response.response!.result;

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
                    form.no_rangka = data.user.vehicle.chassisNumber;
                    form.no_stnk = data.user.vehicle.stnkNumber;
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
                    form.warna = data.user.vehicle.color;
                    form.keterangan = data.user.vehicle.description;

                

                    form.wasOnceAnOnlineDriver = data.wasOnceAnOnlineDriver ? '1' : '0'
                    form.isActivelyBecomingAnotherOnlineDriver = data.isActivelyBecomingAnotherOnlineDriver ? '1' : '0'
                    form.isJoiningTheDriverCommunity = data.isJoiningTheDriverCommunity ? '1' : '0'
                    form.isJoiningLinkaranAsmainJob = data.isJoiningLinkaranAsmainJob ? '1' : '0'

                    const choiceOfActiveWorkHours = this.choiceOfActiveWorkHours(data.choiceOfActiveWorkHours)

                    form.choiceOfActiveWorkHours = choiceOfActiveWorkHours
                    form.choiceOfActiveWorkHoursOther = choiceOfActiveWorkHours == '4'

                    let custom_interval_jam_kerja_start = null
                    let custom_interval_jam_kerja_end = null

                    if (choiceOfActiveWorkHours == '4') {
                        const [startTime, endTime] = data.choiceOfActiveWorkHours.split('-');

                        custom_interval_jam_kerja_start = new Date()
                        custom_interval_jam_kerja_start.setHours(Number.parseInt(startTime))

                        custom_interval_jam_kerja_end = new Date()
                        custom_interval_jam_kerja_end.setHours(Number.parseInt(endTime))
                    }

                    form.custom_interval_jam_kerja_start = custom_interval_jam_kerja_start
                    form.custom_interval_jam_kerja_end = custom_interval_jam_kerja_end

                    console.log('aman')

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<Driver>) => {

                    const error = response.error as ApiResponseError

                    this.setState({
                        loadedMessage: error ? error.metaData.message : 'Gagal mengedit data'
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