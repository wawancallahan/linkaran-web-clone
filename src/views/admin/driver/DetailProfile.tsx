import React, { Component } from 'react'

import {
    Card,
    CardBody,
    Row,
    Col,
    Button
} from 'reactstrap'

import { profileImage } from '../../../helpers/Assets'

import { DriverDetail } from '../../../types/admin/driver';

import '../../../react-modal-image.d.ts'
import { Lightbox } from 'react-modal-image'

type Props = {
    driver: DriverDetail | null
}

type State = {
    ktp_photo_visible: boolean
}

class DetailProfile extends Component<Props, State> {

    state = {
        ktp_photo_visible: false
    }

    onToggleKtpPhotoVisible = (visible?: boolean) => {

        if (visible) {
            this.setState({
                ktp_photo_visible: visible
            })
        } else {
            this.setState(prevState => {
                return {
                    ktp_photo_visible: ! prevState.ktp_photo_visible
                }
            });
        }
    }

    render() {

        const { driver } = this.props

        if (driver) {
            let photo = profileImage

            if (driver.photo) {
                photo = driver.photo
            }

            let image: string | undefined = undefined;

            if (driver.ktpPhoto) {
                image = driver.ktpPhoto;
            }

            return (
                <Card className="card-profile mb-2">
                    <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="3">
                            <div className="card-profile-image">
                                <a href="#">
                                    <img
                                        alt="..."
                                        className="rounded-circle"
                                        src={photo}
                                    />
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <CardBody className="border-0 mt-8">
                        <Row>
                            <Col>
                                <label htmlFor="">ID</label>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
    
                        <Row>
                            <Col>
                                <label htmlFor="">Nama</label>
                            </Col>
                            <Col>
                                {driver.name}
                            </Col>
                        </Row>
    
                        <Row>
                            <Col>
                                <label htmlFor="">Email</label>
                            </Col>
                            <Col>
                                {driver.email}
                            </Col>
                        </Row>
    
                        <Row>
                            <Col>
                                <label htmlFor="">TTL</label>
                            </Col>
                            <Col>
                                {driver.placeOfBirth}, {driver.dateOfBirth}
                            </Col>
                        </Row>
    
                        <Row>
                            <Col>
                                <label htmlFor="">Jenis Kelamin</label>
                            </Col>
                            <Col>
                                {driver.gender == "L" ? "Laki Laki" : "Perempuan"}
                            </Col>
                        </Row>
    
                        <Row>
                            <Col>
                                <label htmlFor="">No. Identitas</label>
                            </Col>
                            <Col>
                                <div className="mb-1">
                                    {driver.identityNumber}
                                </div>
                                <div>
                                    {
                                        image ? (
                                            <Button color="info" size="sm" onClick={() => this.onToggleKtpPhotoVisible()}>
                                                <i className="fa fa-eye"></i>
                                            </Button>
                                        ) : null
                                    }
                                    
                                    {
                                        image ? (
                                            this.state.ktp_photo_visible ? (
                                            <Lightbox large={new URL(image)}
                                                    onClose={() => this.onToggleKtpPhotoVisible(false)}/>
                                            ) : null
                                        ) : null
                                    }
                                </div>
                            </Col>
                        </Row>
    
                        <Row>
                            <Col>
                                <label htmlFor="">Alamat</label>
                            </Col>
                            <Col>
                                {driver.address}
                            </Col>
                        </Row>
    
                        <Row>
                            <Col>
                                <label htmlFor="">Alamat Domisili</label>
                            </Col>
                            <Col>
                                {driver.residenceAddress}
                            </Col>
                        </Row>
    
                        <Row>
                            <Col>
                                <label htmlFor="">Status Pernikahan</label>
                            </Col>
                            <Col>
                                {driver.isMeried ? "Sudah Menikah" : "Belum Menikah"}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )
        }

        return null;
    }
}

export default DetailProfile