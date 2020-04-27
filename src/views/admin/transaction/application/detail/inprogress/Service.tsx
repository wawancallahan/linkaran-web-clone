import React, { Component } from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
    Button,
    CardBody
} from 'reactstrap';

import {
    Link
} from 'react-router-dom';
import { ApplicationShowInprogress } from '../../../../../../types/admin/transaction/application';

type Props = {
    className?: string,
    application: ApplicationShowInprogress
}

const Service = (props: Props) => {

    const { application } = props;

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
                        <Col>{application.transaction ? application.transaction.service.name : ''}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Lokasi Jemput</label></Col>
                        <Col>
                            <p>{application.transaction ? application.transaction.addressOrigin : ''}</p>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Lokasi Tujuan</label></Col>
                        <Col>
                            <p>{application.transaction ? application.transaction.addressDestination : ''}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Deskripsi</label></Col>
                        <Col>
                            <p>{application.transaction ? application.transaction.note : ''}</p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>   
        </div>
    )
}

export default Service;