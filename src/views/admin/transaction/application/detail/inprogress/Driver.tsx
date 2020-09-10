import * as React from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    Button,
    CardBody
} from 'reactstrap';

import { ApplicationShowInprogress } from '../../../../../../types/admin/transaction/application';

type OwnProps = {
    className?: string,
    data: ApplicationShowInprogress
}

type Props = OwnProps

const Driver: React.FC<Props> = (props) => {
    const { data } = props

    return (
        <div className={props.className}>
            <Card>
                <CardHeader>
                    <Row className="align-items-center">
                        <Col>
                            <h3 className="mb-0">Driver</h3>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col><label htmlFor="">ID</label></Col>
                        <Col>{data.driverId}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Nama</label></Col>
                        <Col>{data.driverInformation ? data.driverInformation.name : ''}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">No. Polisi</label></Col>
                        <Col>{data.driverInformation ? data.driverInformation.policeNumber : ''}</Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Kendaraan</label></Col>
                        <Col>{data.driverInformation ? data.driverInformation.vehicleMerk : ''}</Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Driver