import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/form/Index'
import { FormField, DriverShow } from '../../../../types/admin/driver';
import {
    findDriverAction
} from '../../../../actions/admin/driver';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../types/api';
import { AppActions } from '../../../../types';
import WithTitle from '../../../../hoc/WithTitle';

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertVisible, setAlertVisible] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [formField, setFormField] = React.useState<FormField>({
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
        isMeried: false,
        driverHelpCenter: false
    })

    const choiceOfActiveWorkHours = (choiceOfActiveWorkHoursText: string) : string => {

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

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findDriverAction(id)
                .then((response: ApiResponse<DriverShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: DriverShow = response.response!.result;

                    form.nama = data.name ? data.name : '';
                    form.tempat_lahir = data.placeOfBirth
                    form.alamat_domisili = data.residenceAddress
                    form.no_ktp = data.identityNumber;
                    form.alamat = data.address;
                    form.email = data.email ? data.email : '';
                    form.foto_profil_preview = data.photo ? data.photo : '';
                    form.jenis_kelamin = data.gender == 'L' ? 1 : 0;
                    form.jumlah_seat = 0;
                    if (data.district) {
                        form.kabupaten_kota = {
                            value: data.district.id ? data.district.id : 0,
                            label: data.district.name ? data.district.name : ''
                        }
                    }
                    
                    if (data.subDistrict) {
                        form.kecamatan = {
                            value: data.subDistrict.id ? data.subDistrict.id : 0,
                            label: data.subDistrict.name ? data.subDistrict.name : ''
                        }
                    }
                    
                    if (data.village) {
                        form.kelurahan = {
                            value: data.village.id ? data.village.id : 0,
                            label: data.village.name ? data.village.name : ''
                        }
                    }
                    
                    if (data.country) {
                        form.negara = {
                            value: data.country.id ? data.country.id : 0,
                            label: data.country.name ? data.country.name : ''
                        }
                    }
                    
                    if (data.province) {
                        form.provinsi = {
                            value: data.province.id ? data.province.id : 0,
                            label: data.province.name ? data.province.name : ''
                        }
                    }
                    form.keterangan = '';
                    form.ktp_file_preview = data.ktpPhoto || '';

                    if (data.phoneNumber) {
                        const maskPhoneNumber = data.phoneNumber.substr(0, 2);
                        let phoneNumber = data.phoneNumber;

                        if (maskPhoneNumber == "628") {
                            phoneNumber = phoneNumber.substr(2);
                        }

                        form.no_telepon = phoneNumber;
                    }
                   
                    form.rating = 0;
                    form.tanggal_lahir = new Date(data.dateOfBirth);

                    if (data.vehicle) {
                        form.warna = data.vehicle.color ? data.vehicle.color : '';
                        form.keterangan = data.vehicle.description ? data.vehicle.description : '';

                        if (data.vehicle.vehicleType) {
                            form.tipe_kendaraan = {
                                value: data.vehicle.vehicleType.id ? data.vehicle.vehicleType.id : 0,
                                label: data.vehicle.vehicleType.name ? data.vehicle.vehicleType.name : ''
                            }
                        }

                        if (data.vehicle.subBrandVehicle) {
                            form.merek = {
                                value: data.vehicle.subBrandVehicle.id ? data.vehicle.subBrandVehicle.id : 0,
                                label: data.vehicle.subBrandVehicle.name ? data.vehicle.subBrandVehicle.name : ''
                            }
                        }
                        
                        form.no_polisi = data.vehicle.policeNumber ? data.vehicle.policeNumber : '';
                        form.no_rangka = data.vehicle.chassisNumber ? data.vehicle.chassisNumber : '';
                        form.no_stnk = data.vehicle.stnkNumber ? data.vehicle.stnkNumber : '';

                    }

                    form.tempat_lahir = data.placeOfBirth
                    form.alamat_domisili = data.residenceAddress
                    form.wasOnceAnOnlineDriver = data.wasOnceAnOnlineDriver ? '1' : '0'
                    form.isActivelyBecomingAnotherOnlineDriver = data.isActivelyBecomingAnotherOnlineDriver ? '1' : '0'
                    form.isJoiningTheDriverCommunity = data.isJoiningTheDriverCommunity ? '1' : '0'
                    form.isJoiningLinkaranAsmainJob = data.isJoiningLinkaranAsmainJob ? '1' : '0'

                    const choiceOfActiveWorkHoursNumber = choiceOfActiveWorkHours(data.choiceOfActiveWorkHours)

                    form.choiceOfActiveWorkHours = choiceOfActiveWorkHoursNumber
                    form.choiceOfActiveWorkHoursOther = choiceOfActiveWorkHoursNumber == '4'

                    let custom_interval_jam_kerja_start = null
                    let custom_interval_jam_kerja_end = null

                    if (choiceOfActiveWorkHoursNumber == '4') {
                        const [startTime, endTime] = data.choiceOfActiveWorkHours.split('-');

                        if (typeof(startTime) === 'number') {
                            custom_interval_jam_kerja_start = new Date()
                            custom_interval_jam_kerja_start.setHours(Number.parseInt(startTime))
                        }

                        if (typeof(endTime) === 'number') {
                            custom_interval_jam_kerja_end = new Date()
                            custom_interval_jam_kerja_end.setHours(Number.parseInt(endTime))
                        }
                    }

                    form.custom_interval_jam_kerja_start = custom_interval_jam_kerja_start
                    form.custom_interval_jam_kerja_end = custom_interval_jam_kerja_end
                    form.isMeried = data.isMeried
                    form.driverHelpCenter = data.driverHelpCenter

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<DriverShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/driver');
    }

    return (
        <React.Fragment>
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
                        <Flash alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible}/>
                        {loaded ? (
                            <Form form={formField} 
                                setAlertVisible={setAlertVisible} 
                                setAlertMessage={setAlertMessage}
                                redirectOnSuccess={redirectOnSuccess} 
                                id={Number.parseInt(props.match.params.id)} />
                        ) : loadMessage}
                    </CardBody>
                </Card>
            </Container>
        </React.Fragment>
    )
}

type LinkDispatchToProps = {
    findDriverAction: (id: number) => Promise<ApiResponse<DriverShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findDriverAction: (id: number) => dispatch(findDriverAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Driver")