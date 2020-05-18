import React, { Component } from 'react'

import {
    Card,
    CardTitle,
    CardBody,
    Row,
    Col
} from 'reactstrap'

import { DriverShow } from '../../../types/admin/driver';

type Props = {
    driver: DriverShow | null
}

class DetailKendaraan extends Component<Props> {
    render() {

        const { driver } = this.props

        if (driver) {
            return (
                <Card>
                    <CardBody>
                        <CardTitle className="font-weight-bold">Kendaraan</CardTitle>
                        <Row className="mb-3">
                            <Col md="6">
                                <label htmlFor="">Jenis Kendaraan</label>
                            </Col>
                            <Col md="6">
                                {driver.vehicle && 
                                    driver.vehicle.subBrandVehicle && 
                                        driver.vehicle.subBrandVehicle.brandVehicle ? 
                                            driver.vehicle.subBrandVehicle.brandVehicle.name : ''}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="6">
                                <label htmlFor="">No. Plat</label>
                            </Col>
                            <Col md="6">
                                {driver.vehicle ? driver.vehicle.policeNumber : ''}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="6">
                                <label htmlFor="">No. STNK</label>
                            </Col>
                            <Col md="6">
                                {driver.vehicle ? driver.vehicle.stnkNumber : ''}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="6">
                                <label htmlFor="">No. Rangka</label>
                            </Col>
                            <Col md="6">
                                {driver.vehicle ? driver.vehicle.chassisNumber : ''}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="6">
                                <label htmlFor="">Tipe Kendaraan</label>
                            </Col>
                            <Col md="6">
                                {driver.vehicle && driver.vehicle.vehicleType ? driver.vehicle.vehicleType.name : ''}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="6">
                                <label htmlFor="">Keterangan</label>
                            </Col>
                            <Col md="6">
                                {driver.vehicle ? driver.vehicle.description : ''}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )
        }

        return null;
    }
}

export default DetailKendaraan