import * as React from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import { ApplicationShowComplete } from '../../../../../../types/admin/transaction/application';

type OwnProps = {
    data: ApplicationShowComplete
}

type Props = OwnProps

const Cancel: React.FC<Props> = (props) => {

    const { data } = props;

    if (data.cancelFeedback) {
        return (
            <Card className="mb-3">
                <CardHeader>
                    <Row className="align-items-center">
                        <Col>
                            <h3 className="mb-0">Pembatalan</h3>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col><label htmlFor="">Waktu</label></Col>
                        <Col>
                            <p>{data.cancelFeedback.cancelAt}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Alasan</label></Col>
                        <Col>
                            <p>{data.cancelFeedback.description}</p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }

    return (null);
}

export default Cancel;