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
} from '../../../../../../helpers/Assets'
import { ApplicationShowComplete } from '../../../../../../types/admin/transaction/application';

type Props = {
    className?: string,
    application: ApplicationShowComplete
}

const Feedback = (props: Props) => {

    const { application } = props;

    let rating = 0;

    if (application.costumerFeedback) {
        rating = application.costumerFeedback.rating;
    }

    const starFeed = [...Array.from(Array(rating).keys())].map(() => (
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
                        <Col>
                            <p>{application.costumerFeedback ? application.costumerFeedback.description : ''}</p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Feedback;