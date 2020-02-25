import React, { Component } from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
    Button,
    CardBody,
    Badge
} from 'reactstrap';

import {
    Link
} from 'react-router-dom';
import { ApplicationShowComplete } from '../../../../../types/admin/transaction/application';

type Props = {
    className?: string,
    application: ApplicationShowComplete
}

const Transaction = (props: Props) => {

    const { application } = props;

    return (
        <div className={props.className}>
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
                        <Col>Rp. {application.transaction ? application.transaction.cost : ''}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Pembayaran Lain</label></Col>
                        <Col></Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Promo / Potongan</label></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Total Transaksi</label></Col>
                        <Col>Rp. {application.transaction ? application.transaction.totalCost : ''}</Col>
                    </Row>
                    <hr />
                    <Row className="mb-2">
                        <Col><label htmlFor="">Potongan Driver</label></Col>
                        <Col></Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Tip</label></Col>
                        <Col>Rp.</Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Total Pendapatan Driver</label></Col>
                        <Col>Rp.</Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Transaction;