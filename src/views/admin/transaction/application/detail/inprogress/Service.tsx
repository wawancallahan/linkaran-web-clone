import * as React from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

import { ApplicationShowInprogress } from '../../../../../../types/admin/transaction/application';

type OwnProps = {
    className?: string,
    data: ApplicationShowInprogress
}

type Props = OwnProps

const Service: React.FC<Props> = (props) => {

    const { data } = props;

    return (
        <div className={props.className}>
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
                        <Col>{data.transaction ? data.transaction.service.name : ''}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Lokasi Jemput</label></Col>
                        <Col>
                            <p>{data.transaction ? data.transaction.addressOrigin : ''}</p>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Lokasi Tujuan</label></Col>
                        <Col>
                            <p>{data.transaction ? data.transaction.addressDestination : ''}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Deskripsi</label></Col>
                        <Col>
                            <p>{data.transaction ? data.transaction.note : ''}</p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>   
        </div>
    )
}

export default Service;