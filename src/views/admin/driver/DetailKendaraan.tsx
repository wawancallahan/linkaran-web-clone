import React, { Component } from 'react'

import {
    Card,
    CardTitle,
    CardBody,
    Row,
    Col
} from 'reactstrap'

import { DriverDetail } from '../../../types/admin/driver';

type Props = {
    driver: DriverDetail | null
}

class DetailKendaraan extends Component<Props> {
    render() {

        const { driver } = this.props

        if (driver) {
            return (
                <Card>
                    <CardBody>
                        <CardTitle className="font-weight-bold">Kendaraan</CardTitle>
                        <Row>
                            <Col>
                                <label htmlFor="">Jenis Kendaraan</label>
                            </Col>
                            <Col>
                                {driver.vehicle.subBrandVehicle.brandVehicle.name}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="">No. Plat</label>
                            </Col>
                            <Col>
                                {driver.vehicle.policeNumber}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="">No. STNK</label>
                            </Col>
                            <Col>
                                {driver.vehicle.stnkNumber}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="">No. Rangka</label>
                            </Col>
                            <Col>
                                {driver.vehicle.chassisNumber}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="">Tipe Kendaraan</label>
                            </Col>
                            <Col>
                                {driver.vehicle.vehicleType.name}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="">Keterangan</label>
                            </Col>
                            <Col>
                                {driver.vehicle.description}
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