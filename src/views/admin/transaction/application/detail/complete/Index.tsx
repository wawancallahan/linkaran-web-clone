import * as React from 'react'

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Badge
} from 'reactstrap'

import Customer from './Customer';
import Driver from './Driver';
import Service from './Service';
import Transaction from './Transaction';
import Feedback from './Feedback';
import { ApplicationShow, ApplicationShowComplete } from '../../../../../../types/admin/transaction/application';
import { colorStatusFormat, icoLinkImage } from '../../../../../../helpers/utils';
import SendTransaction from './SendTransaction';
import FoodTransaction from './FoodTransaction';
import NotificationDriver from './NotificationDriver';

type OwnProps = {
    data: ApplicationShow | null
}

type Props = OwnProps

const Complete: React.FC<Props> = (props) => {
    const { data } = props

    if (data) {

        const item = data.item as ApplicationShowComplete;

        return (
            <React.Fragment>
                <Row className="mb-3">
                    <Col xs="8">
                        <Card className="m">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Transaksi</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">No. Transaksi</label>
                                    </Col>
                                    <Col>
                                        {item.transaction ? item.transaction.code : ''}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">Tanggal & Waktu</label>
                                    </Col>
                                    <Col>
                                        {item.transaction ? item.transaction.dateTime : ''}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label htmlFor="">Status</label>
                                    </Col>
                                    <Col>
                                        <Badge color={colorStatusFormat(item.transaction.status)}>{item.transaction.status}</Badge>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="4">
                        <Card className="m">
                            <CardBody>
                                <div className="d-flex align-items-stretch justify-content-center">
                                    <div className="align-self-center w-100">
                                        <div className="img-ico-transaction-link">
                                            {item.transaction.service.code ? <img src={icoLinkImage(item.transaction.service.code)} alt=""/> : ''}
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Customer className="mb-3" data={item} />
                        <Transaction data={item} />
                    </Col>
                    <Col>
                        <Driver className="mb-3" data={item} />
                        <Feedback data={item} />
                    </Col>
                </Row>

                <div className="form-group">
                    <Service className="mb-3" data={item} />
                </div>
                
                {
                    item.sendTransaction && item.sendTransaction !== null ?
                        (
                            <div className="form-group">
                                <SendTransaction data={item} />
                            </div>
                        ) : null
                }

                {
                    item.foodTransaction && item.foodTransaction !== null ?
                        (
                            <div className="form-group">
                                <FoodTransaction data={item} />
                            </div>
                        ) : null
                }

                <div className="form-group">
                    <NotificationDriver item={item} />
                </div>
            </React.Fragment>
        )
    }

    return null;
}

export default Complete