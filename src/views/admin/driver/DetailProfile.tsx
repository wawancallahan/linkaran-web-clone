import React, { Component } from 'react'

import {
    Card,
    CardBody,
    Row,
    Col
} from 'reactstrap'

import { profileImage } from '../../../Assets'

import { DriverDetail } from '../../../types/admin/driver';

type Props = {
    driver: DriverDetail | null
}

class DetailProfile extends Component<Props> {
    render() {

        const { driver } = this.props

        if (driver) {
            let photo = profileImage

            if (driver.photo) {
                photo = driver.photo
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
                                {driver.identityNumber}
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