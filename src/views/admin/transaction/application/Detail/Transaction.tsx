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

type Props = {
    className?: string
}

const Transaction = (props: Props) => {
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
                        <Col>Rp. 500.000</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Pembayaran Lain</label></Col>
                        <Col>Rp. 300.000 <Badge color="info">Link Aja</Badge></Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Promo / Potongan</label></Col>
                        <Col>Rp. 200.000 <Badge color="info">Detail</Badge></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Total Transaksi</label></Col>
                        <Col>Rp. 700.000</Col>
                    </Row>
                    <hr />
                    <Row className="mb-2">
                        <Col><label htmlFor="">Potongan Driver</label></Col>
                        <Col>6%</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Tis</label></Col>
                        <Col>Rp. 500.000</Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Total Pendapatan Driver</label></Col>
                        <Col>Rp. 2.000.000</Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Transaction;