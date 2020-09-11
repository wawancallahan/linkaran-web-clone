import * as React from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    Button,
    CardBody
} from 'reactstrap';
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
                            <a href={`/admin/customer/${data.costumer.id}`}>
                                <Button
                                    color="info"
                                    size="sm"
                                >
                                    Detail
                                </Button>
                            </a>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col><label htmlFor="">Nama</label></Col>
                        <Col>{data.costumer.userInfo.name}</Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Telepon</label></Col>
                        <Col>{data.costumer.userInfo.phoneNumber}</Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Email</label></Col>
                        <Col>{data.costumer.userInfo.email}</Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Telegram</label></Col>
                        <Col>{data.costumer.userInfo.telegramuser}</Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Customer;