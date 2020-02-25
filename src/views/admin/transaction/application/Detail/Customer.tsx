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
import { ApplicationShowComplete } from '../../../../../types/admin/transaction/application';

type Props = {
    className?: string,
    application: ApplicationShowComplete
}

const Customer = (props: Props) => {

    const { application } = props;

    return (
        <div className={props.className}>
            <Card>
                <CardHeader>
                    <Row className="align-items-center">
                        <Col>
                            <h3 className="mb-0">Customer</h3>
                        </Col>
                        <Col className="text-right">
                            <Link to="">
                                <Button
                                    color="info"
                                    size="sm"
                                >
                                    Detail
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col><label htmlFor="">ID</label></Col>
                        <Col>{application.costumer.id}</Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Nama</label></Col>
                        <Col>{application.costumer.userInfo.name}</Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Customer;