import * as React from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

import {
    starImage
} from '../../../../../../helpers/Assets'
import { ApplicationShowComplete } from '../../../../../../types/admin/transaction/application';

type OwnProps = {
    className?: string,
    data: ApplicationShowComplete
}

type Props = OwnProps

const Feedback: React.FC<Props> = (props) => {

    const { data } = props;

    let rating = 0;

    if (data.costumerFeedback) {
        rating = data.costumerFeedback.rating;
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
                            <p>{data.costumerFeedback ? data.costumerFeedback.description : ''}</p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Feedback;