import React, { Component } from 'react'
import HeaderView from "../../../components/Headers/HeaderView"
import { 
    Container,
    Row, 
    Col, 
    Card, 
    CardHeader, 
    CardBody, 
    Progress, 
    Badge,
    Table,
    CardFooter,
    Button ,
    Modal,
    FormGroup,
    Input
} from 'reactstrap'

import {
    argonReactImage
} from '../../../Assets'

import {
    Link
} from 'react-router-dom'

import { connect } from 'react-redux'

import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import Pagination from '../../../components/Pagination/Pagination'

type State = {
    modalIsOpen: boolean
}

class Tiket extends Component<{}, State> {

    state = {
        modalIsOpen: false
    }

    toggleModalOpen = () => {
        this.setState(prevState => {
            return {
                modalIsOpen: !prevState.modalIsOpen
            }
        });
    }

    render () {
        return (
            <>
                <HeaderView />

                <Container className="mt--7" fluid>
                    <Row className="mb-4">
                        <Col>
                            <Card className="shadow">
                                <CardBody>
                                    <Row>
                                        <Col md={4} xs={12}>
                                            <div className="d-flex align-items-center">
                                                <div className="img-responsive">
                                                    <img src={argonReactImage} alt=""/>    
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={8} xs={12}>
                                            <div className="d-flex">
                                                <div className="mr-auto">
                                                    <div>
                                                        <div style={{
                                                            fontSize: '18px',
                                                            lineHeight: '20px'
                                                        }} className="mb-1">Gratis Ongkir Untuk Selamanya</div>
                                                        <div style={{
                                                            fontSize: '15px',
                                                            lineHeight: '18px'
                                                        }} className="mb-2">KODE111</div>
                                                        <div className="mb-2">
                                                            <div className="d-inline-block mr-2">
                                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M13.9875 2.13758L14.445 5.03258L17.0775 6.37508L15.75 9.00008L17.085 11.6251L14.43 12.9676L13.9725 15.8626L11.055 15.4051L8.97754 17.4751L6.89254 15.3751L3.99754 15.8551L3.53254 12.9376L0.915039 11.6026L2.25004 8.97758L0.922539 6.37508L3.55504 5.01758L4.01254 2.14508L6.91504 2.62508L9.00004 0.517578L11.0775 2.59508L13.9875 2.13758ZM7.12504 5.25008C6.82667 5.25008 6.54052 5.3686 6.32954 5.57958C6.11857 5.79056 6.00004 6.07671 6.00004 6.37508C6.00004 6.67345 6.11857 6.95959 6.32954 7.17057C6.54052 7.38155 6.82667 7.50008 7.12504 7.50008C7.42341 7.50008 7.70956 7.38155 7.92053 7.17057C8.13151 6.95959 8.25004 6.67345 8.25004 6.37508C8.25004 6.07671 8.13151 5.79056 7.92053 5.57958C7.70956 5.3686 7.42341 5.25008 7.12504 5.25008ZM10.875 10.5001C10.5767 10.5001 10.2905 10.6186 10.0795 10.8296C9.86857 11.0406 9.75004 11.3267 9.75004 11.6251C9.75004 11.9234 9.86857 12.2096 10.0795 12.4206C10.2905 12.6315 10.5767 12.7501 10.875 12.7501C11.1734 12.7501 11.4596 12.6315 11.6705 12.4206C11.8815 12.2096 12 11.9234 12 11.6251C12 11.3267 11.8815 11.0406 11.6705 10.8296C11.4596 10.6186 11.1734 10.5001 10.875 10.5001ZM6.30754 12.7501L12.75 6.30758L11.6925 5.25008L5.25004 11.6926L6.30754 12.7501Z" fill="#737373"/>
                                                                </svg>
                                                            </div>
                                                            <div className="d-inline-block mr-2">
                                                                <Badge color="success">Gratis Ongkir</Badge>
                                                            </div>
                                                            <div className="d-inline-block">
                                                                Rp. 50.000
                                                            </div>
                                                        </div>
                                                        <div className="mb-1" style={{
                                                            fontSize: '13px',
                                                            lineHeight: '15px'
                                                        }}>
                                                            Minimum Pembelian Rp. 20.000
                                                        </div>
                                                        <div className="mb-1" style={{
                                                            fontSize: '13px',
                                                            lineHeight: '15px'
                                                        }}>
                                                            Target Pengunaan Terbatas
                                                        </div>
                                                        <div className="mb-1" style={{
                                                            fontSize: '13px',
                                                            lineHeight: '15px'
                                                        }}>
                                                            Dapat digunakan 2 kali
                                                        </div>
                                                        <div>
                                                            <label htmlFor="" style={{
                                                                fontSize: '13px',
                                                                lineHeight: '15px'
                                                            }}>Layanan</label>

                                                            <Badge className="ml-1" color="info">Link Ride</Badge>
                                                            <Badge className="ml-1" color="info">Link Car</Badge>
                                                            <Badge className="ml-1" color="info">Link Food</Badge>
                                                            <Badge className="ml-1" color="info">Link Send</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ml-auto">
                                                    <div className="mb-4">
                                                        <Badge color="success">Sedang Berlangsung</Badge>
                                                    </div>
                                                    <div className="mb-4">
                                                        <div>
                                                            <div className="d-inline-block mr-2">
                                                                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5 0C6.32608 0 7.59785 0.526784 8.53553 1.46447C9.47322 2.40215 10 3.67392 10 5C10.0002 6.15265 9.60222 7.26999 8.87331 8.1629C8.1444 9.05582 7.12936 9.66947 6 9.9V14H4V9.9C2.87064 9.66947 1.8556 9.05582 1.12669 8.1629C0.397783 7.26999 -0.000235151 6.15265 1.04228e-07 5C1.04228e-07 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0ZM5 2C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5C2 5.79565 2.31607 6.55871 2.87868 7.12132C3.44129 7.68393 4.20435 8 5 8C5.79565 8 6.55871 7.68393 7.12132 7.12132C7.68393 6.55871 8 5.79565 8 5C8 4.20435 7.68393 3.44129 7.12132 2.87868C6.55871 2.31607 5.79565 2 5 2Z" fill="#6F7071"/>
                                                                </svg>
                                                            </div>
                                                            <div className="d-inline-block">
                                                                11 Jan 2020 15:00
                                                            </div>
                                                        </div>
                                                        <hr className="mt-1 mb-1" />
                                                        <div>
                                                            <div className="d-inline-block mr-2">
                                                                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5 0C6.32608 0 7.59785 0.526784 8.53553 1.46447C9.47322 2.40215 10 3.67392 10 5C10 6.32608 9.47322 7.59785 8.53553 8.53553C7.59785 9.47322 6.32608 10 5 10C3.67392 10 2.40215 9.47322 1.46447 8.53553C0.526784 7.59785 0 6.32608 0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0ZM5 2C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5C2 5.79565 2.31607 6.55871 2.87868 7.12132C3.44129 7.68393 4.20435 8 5 8C5.79565 8 6.55871 7.68393 7.12132 7.12132C7.68393 6.55871 8 5.79565 8 5C8 4.20435 7.68393 3.44129 7.12132 2.87868C6.55871 2.31607 5.79565 2 5 2ZM4 14V12H6V14H4Z" fill="#6F7071"/>
                                                                </svg>
                                                            </div>
                                                            <div className="d-inline-block">
                                                                12 Jan 2020 15:00
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="mb-2">
                                                            <Link to={``} className="btn btn-info btn-sm">
                                                                <i className="fa fa-eye"></i> Lihat Tiket
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link to={``} className="btn btn-primary btn-sm">
                                                                <i className="fa fa-plus"></i> Tambah Tiket
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Card className="shadow">
                                <CardBody>
                                    <h3 className="mb-0">Jumlah Penggunaan Voucher</h3>
                                    <div className="progress-wrapper">
                                        <div className="progress-info justify-content-center">
                                            <div className="progress-percentage">
                                                <span style={{
                                                    fontSize: '50px',
                                                }}>60/100</span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <Progress max="100" value="60" color="success" className="w-100" />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>    
                        </Col>
                        <Col>
                            <Card className="shadow">
                                <CardBody>
                                    <h3 className="mb-0">Jumlah Penggunaan Tiket</h3>
                                    <div className="progress-wrapper">
                                        <div className="progress-info justify-content-center">
                                            <div className="progress-percentage">
                                                <span style={{
                                                    fontSize: '50px',
                                                }}>1/2</span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <Progress max="100" value="60" color="success" className="w-100" />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>    
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <Col>
                                            <h3 className="mb-0">Daftar Pengunaan Promo</h3>
                                        </Col>
                                        <Col className="text-right">
                                            <Button
                                                color="primary"
                                                size="sm"
                                                onClick={() => this.toggleModalOpen()}
                                            >
                                                <i className="fa fa-plus"></i> Tambah Tiket
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Digunakan Oleh</th>
                                            <th>Periode Pengunaan</th>
                                            <th>Transaksi</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Ibnu</td>
                                            <td>01 Jan 2020 15:00</td>
                                            <td>RIDE021234553ASDF</td>
                                            <td>
                                                <Link to={`/admin/pengunaan-voucher-promo/edit`} className="btn btn-warning btn-sm">
                                                    <i className="fa fa-edit"></i>
                                                </Link>
                                                <Button color="danger" size="sm">
                                                    <i className="fa fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={0}
                                                    currentPage={0}
                                                    itemCount={0}
                                                    itemClicked={() => {}} />
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.modalIsOpen}
                    toggle={() => this.toggleModalOpen()}
                    >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                        Tambah Tiket
                        </h5>
                        <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModalOpen()}
                        >
                        <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-amount"
                            >
                                Jumlah Tiket
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-amount"
                            placeholder="Jumlah Tiket"
                            type="text"
                            name="amount"
                            maxLength={255}
                            value={""}
                            required
                            />
                        </FormGroup>
                    </div>
                    <div className="modal-footer">
                        <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModalOpen()}
                        >
                            Batal
                        </Button>
                        <Button color="primary" type="button">
                            Simpan
                        </Button>
                    </div>
                </Modal>
            </>
        )
    }
}

export default Tiket