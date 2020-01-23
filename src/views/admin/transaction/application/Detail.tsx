import React, { Component } from 'react';
import withTitle from '../../../../hoc/WithTitle';

import HeaderView from "../../../../components/Headers/HeaderView";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
    Button,
    Table,
    Alert,
    Badge, 
    CardBody
} from 'reactstrap';
import {
    Link,
    RouteComponentProps,
    withRouter
} from 'react-router-dom';

import {
    connect
} from 'react-redux';
import { AppState } from '../../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';

import { Application } from '../../../../types/admin/transaction/application';
import queryString from 'query-string';

type DetailProps = RouteComponentProps & {

}

type Props = DetailProps & LinkStateToProps & LinkDispatchToProps;

type State = {

}

class Detail extends Component<Props, State> {

    state = {

    }

    componentDidMount() {
    }

    render() {

        return (
            <>
                <HeaderView />

                <Container className="mt--7" fluid>
                    <Row className="mb-4">
                        <Col xs="5">
                            <Card className="m">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Detail Transaksi</h3>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col>
                                            <label htmlFor="">No. Transaksi</label>
                                        </Col>
                                        <Col>
                                            R012312032
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col>
                                            <label htmlFor="">Tanggal & Waktu</label>
                                        </Col>
                                        <Col>
                                            01-01-2020 12:00:00
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label htmlFor="">Status</label>
                                        </Col>
                                        <Col>
                                            <Badge color="success">Selesai</Badge>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="7">
                            
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs="5">
                            <Card>
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col>
                                            <h3 className="mb-0">Customer</h3>
                                        </Col>
                                        <Col className="text-right">
                                            <Link to="">
                                                <Button
                                                    color="info"
                                                    size="sm"
                                                >
                                                    Detail
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">ID</label></Col>
                                        <Col>12931287381274</Col>
                                    </Row>
                                    <Row>
                                        <Col><label htmlFor="">Nama</label></Col>
                                        <Col>Name</Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="7">
                            <Card>
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col>
                                            <h3 className="mb-0">Driver</h3>
                                        </Col>
                                        <Col className="text-right">
                                            <Link to="">
                                                <Button
                                                    color="info"
                                                    size="sm"
                                                >
                                                    Detail
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">ID</label></Col>
                                        <Col>12931287381274</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Nama</label></Col>
                                        <Col>Name</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">No. Polisi</label></Col>
                                        <Col>Name</Col>
                                    </Row>
                                    <Row>
                                        <Col><label htmlFor="">Kendaraan</label></Col>
                                        <Col>Name</Col>
                                    </Row>
                                </CardBody>
                            </Card>                            
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs="5">
                            <Card>
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col>
                                            <h3 className="mb-0">Nominal Transaksi</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Tarif</label></Col>
                                        <Col>Rp. 500.000</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Pembayaran Lain</label></Col>
                                        <Col>Rp. 300.000 <Badge color="info">Link Aja</Badge></Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Promo / Potongan</label></Col>
                                        <Col>Rp. 200.000 <Badge color="info">Detail</Badge></Col>
                                    </Row>
                                    <Row>
                                        <Col><label htmlFor="">Total Transaksi</label></Col>
                                        <Col>Rp. 700.000</Col>
                                    </Row>
                                    <hr />
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Potongan Driver</label></Col>
                                        <Col>6%</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Tip</label></Col>
                                        <Col>Rp. 500.000</Col>
                                    </Row>
                                    <Row>
                                        <Col><label htmlFor="">Total Pendapatan Driver</label></Col>
                                        <Col>Rp. 2.000.000</Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col>
                                            <h3 className="mb-0">Detail Layanan</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Layanan</label></Col>
                                        <Col>Link Ride</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Lokasi Jemput</label></Col>
                                        <Col>
                                            Jl.Panjaitan Perumahan Citraland Komplek I-Walk Blok 15 No55 Mugirejo, Kota Samarinda 75123, Kalimantan Timur  Indonesia 
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Lokasi Tujuan</label></Col>
                                        <Col>Jl.Panjaitan Perumahan Citraland Komplek I-Walk Blok 15 No55 Mugirejo, Kota Samarinda 75123, Kalimantan Timur  Indonesia </Col>
                                    </Row>
                                    <Row>
                                        <Col><label htmlFor="">Deskripsi</label></Col>
                                        <Col>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Card>
                        <CardHeader>
                            <Row className="align-items-center">
                                <Col>
                                    <h3 className="mb-0">FeedBack</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Row className="mb-2">
                                <Col><label htmlFor="">Rating Driver</label></Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col><label htmlFor="">Pesan Customer</label></Col>
                                <Col>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Col>
                            </Row>
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailProps): LinkDispatchToProps => {
    return {
       
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(Detail, "Detail Transaksi Aplikasi")
                    )
                );