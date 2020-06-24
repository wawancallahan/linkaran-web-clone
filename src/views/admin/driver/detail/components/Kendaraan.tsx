import * as React from 'react'

import {
    Card,
    CardTitle,
    CardBody,
    Row,
    Col
} from 'reactstrap'

import { DriverShow } from '../../../../../types/admin/driver';

type OwnProps = {
    data: DriverShow | null
}

type Props = OwnProps

const Kendaraan: React.FC<Props> = (props) => {
    const { data } = props

    if (data) {
        return (
            <Card>
                <CardBody>
                    <CardTitle className="font-weight-bold">Kendaraan</CardTitle>
                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">Jenis Kendaraan</label>
                        </Col>
                        <Col md="6">
                            {data.vehicle && 
                                data.vehicle.subBrandVehicle && 
                                    data.vehicle.subBrandVehicle.brandVehicle ? 
                                        data.vehicle.subBrandVehicle.brandVehicle.name : ''}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">No. Plat</label>
                        </Col>
                        <Col md="6">
                            {data.vehicle ? data.vehicle.policeNumber : ''}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">No. STNK</label>
                        </Col>
                        <Col md="6">
                            {data.vehicle ? data.vehicle.stnkNumber : ''}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">No. Rangka</label>
                        </Col>
                        <Col md="6">
                            {data.vehicle ? data.vehicle.chassisNumber : ''}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">Tipe Kendaraan</label>
                        </Col>
                        <Col md="6">
                            {data.vehicle && data.vehicle.vehicleType ? data.vehicle.vehicleType.name : ''}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md="6">
                            <label htmlFor="">Keterangan</label>
                        </Col>
                        <Col md="6">
                            {data.vehicle ? data.vehicle.description : ''}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }

    return null;
}

export default Kendaraan