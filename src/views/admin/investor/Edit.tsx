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
import { Investor, FormField } from '../../../types/admin/investor';

import FormInvestor from './FormEdit';

import {
    findInvestorAction
} from '../../../actions/admin/investor';

import { ApiResponse } from '../../../types/api';

type CreateProps = RouteComponentProps<{
    id: string
}> & {

}

type Props = CreateProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    form: FormField,
    alert_visible: boolean,
    alert_message: string,
    isLoaded: boolean,
    loadedMessage: string,
}

class Create extends Component<Props, State> {

    state = {
        form: {
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
        },
        alert_visible: false,
        alert_message: '',
        isLoaded: false,
        loadedMessage: '',
    }

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findInvestorAction(id)
                .then((response: ApiResponse<Investor>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: Investor =response.response!.result;

                    form.alamat = data.address;
                    form.email = data.user.email;
                    form.foto_profil_preview = data.photo;
                    form.jenis_kelamin = data.gender;
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
                    form.ktp_file_preview = data.ktpPhoto;
                    form.nama = data.user.name;
                    form.negara = {
                        value: data.country.id,
                        label: data.country.name
                    }
                    form.no_ktp = data.identityNumber;
                    form.no_telepon = data.user.phoneNumber;
                    form.provinsi = {
                        value: data.province.id,
                        label: data.province.name
                    }
                    form.tanggal_lahir = new Date(data.dateOfBirth);
                    form.nomor_asosiasi_lingkungan = data.neighboorhoodAssociationNumber;
                    form.nomor_asosiasi_warga_negara = data.citizensAssociationNumber;

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<Investor>) => {
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
        this.props.history.push('/admin/investor');
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
                                    <h3 className="mb-0">Tambah Investor</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormInvestor form={this.state.form} 
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
    findInvestorAction: (id: number) => Promise<ApiResponse<Investor>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: CreateProps) => {
    return {
        findInvestorAction: (id: number) => dispatch(findInvestorAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Create, "Tambah Investor")
    )
);