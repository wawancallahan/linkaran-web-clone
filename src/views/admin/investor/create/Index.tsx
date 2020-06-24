import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField } from '../../../../types/admin/investor';
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
        jenis_kelamin: '',
        no_ktp: '',
        ktp_file: null,
        ktp_file_preview: '',
        alamat: '',
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
        nomor_asosiasi_lingkungan: '',
        nomor_asosiasi_warga_negara: ''
    })

    const redirectOnSuccess = () => {
        props.history.push('/admin/investor');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Tambah Investor</h3>
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
, "Tambah Investor")