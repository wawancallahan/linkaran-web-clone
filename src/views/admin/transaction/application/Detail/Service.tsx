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

type Props = {
    className?: string
}

const Service = (props: Props) => {
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
                        <Col>Link Ride</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Lokasi Jemput</label></Col>
                        <Col>
                            Jl.Panjaitan Perumahan Citraland Komplek I-Walk Blok 15 No55 Mugirejo, Kota Samarinda 75123, Kalimantan Timur  Indonesia 
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Lokasi Tujuan</label></Col>
                        <Col>Jl.Panjaitan Perumahan Citraland Komplek I-Walk Blok 15 No55 Mugirejo, Kota Samarinda 75123, Kalimantan Timur  Indonesia </Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Deskripsi</label></Col>
                        <Col>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Col>
                    </Row>
                </CardBody>
            </Card>   
        </div>
    )
}

export default Service;