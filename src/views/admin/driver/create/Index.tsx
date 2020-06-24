import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/form/Index'
import { FormField } from '../../../../types/admin/driver';
import WithTitle from '../../../../hoc/WithTitle';

type OwnProps = RouteComponentProps

type Props = OwnProps

const Index: React.FC<Props> = (props) => {

    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertVisible, setAlertVisible] = React.useState(false)
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
                                <h3 className="mb-0">Tambah Driver</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Flash alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible}/>
                        <Form form={formField} 
                            setAlertVisible={setAlertVisible} 
                            setAlertMessage={setAlertMessage}
                            redirectOnSuccess={redirectOnSuccess} />
                    </CardBody>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default WithTitle(
    withRouter(Index)
, "Tambah Driver")