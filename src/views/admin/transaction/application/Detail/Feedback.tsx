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

import {
    starImage
} from '../../../../../Assets'

type Props = {
    className?: string
}

const Feedback = (props: Props) => {

    const starFeed = [...Array.from(Array(2).keys())].map(() => (
        <img className="d-inline-block img-star-feedback mr-2" src={starImage} />
    ));

    return (
        <div className={props.className}>
            <Card>
                <CardHeader>
                    <Row className="align-items-center">
                        <Col>
                            <h3 className="mb-0">FeedBack</h3>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Rating Driver</label></Col>
                        <Col>
                            {starFeed}
                        </Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Pesan Customer</label></Col>
                        <Col>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Feedback;