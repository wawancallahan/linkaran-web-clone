import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, InvestorShow } from '../../../../types/admin/investor';
import {
    findInvestorAction
} from '../../../../actions/admin/investor';
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

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findInvestorAction(id)
                .then((response: ApiResponse<InvestorShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: InvestorShow = response.response!.result;

                    form.alamat = data.address;
                    form.jenis_kelamin = data.gender;
                    form.tanggal_lahir = new Date(data.dateOfBirth);
                    form.nomor_asosiasi_lingkungan = data.neighboorhoodAssociationNumber;
                    form.nomor_asosiasi_warga_negara = data.citizensAssociationNumber;
                    form.no_ktp = data.identityNumber;

                    if (data.user) {
                        form.email = data.user.email ? data.user.email : '';
                        form.nama = data.user.name ? data.user.name : '';
                        form.no_telepon = data.user.phoneNumber ? data.user.phoneNumber : '';
                    }

                    if (data.photo) {
                        form.foto_profil_preview = data.photo;
                    }

                    if (data.ktpPhoto) {
                        form.ktp_file_preview = data.ktpPhoto;
                    }
                    
                    
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

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<InvestorShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

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
                                <h3 className="mb-0">Edit Investor</h3>
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
    findInvestorAction: (id: number) => Promise<ApiResponse<InvestorShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findInvestorAction: (id: number) => dispatch(findInvestorAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Investor")