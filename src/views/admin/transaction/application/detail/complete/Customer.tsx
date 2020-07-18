import * as React from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    Button,
    CardBody
} from 'reactstrap';

import {
    Link
} from 'react-router-dom';
import { ApplicationShowComplete } from '../../../../../../types/admin/transaction/application';

type OwnProps = {
    className?: string,
    data: ApplicationShowComplete
}

type Props = OwnProps

const Customer: React.FC<Props> = (props) => {
    const { data } = props

    return (
        <div className={props.className}>
            <Card>
                <CardHeader>
                    <Row className="align-items-center">
                        <Col>
                            <h3 className="mb-0">Customer</h3>
                        </Col>
                        <Col className="text-right">
                            <Link to={`/admin/customer/${data.costumer.id}`}>
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
                        <Col>{data.costumer.id}</Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Nama</label></Col>
                        <Col>{data.costumer.userInfo.name}</Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Customer;