import React, { Component } from 'react'

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Badge
} from 'reactstrap'

import DetailCustomer from './detail/complete/Customer';
import DetailDriver from './detail/complete/Driver';
import DetailService from './detail/complete/Service';
import DetailTransaction from './detail/complete/Transaction';
import DetailFeedback from './detail/complete/Feedback';
import { ApplicationShow, ApplicationShowComplete } from '../../../../types/admin/transaction/application';
import { colorStatusFormat, icoLinkImage } from '../../../../helpers/utils';
import SendTransaction from './detail/complete/SendTransaction';
import FoodTransaction from './detail/complete/FoodTransaction';

type DetailCompleteProps = {
    application: ApplicationShow | undefined
}

type Props = DetailCompleteProps

class DetailComplete extends Component<Props> {
    render() {
        const { application } = this.props;

        if (application) {

            const item = application.item as ApplicationShowComplete;

            return (
                <>
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
                            <DetailCustomer className="mb-3" application={item} />
                            <DetailTransaction application={item} />
                        </Col>
                        <Col>
                            <DetailDriver className="mb-3" application={item} />
                            <DetailFeedback application={item} />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <DetailService className="mb-3" application={item} />
                        </Col>
                    </Row>
                    
                    {
                        item.sendTransaction && item.sendTransaction !== null ?
                            (
                                <Row className="mb-3">
                                    <Col>
                                        <SendTransaction application={item} />
                                    </Col>
                                </Row>
                            ) : null
                    }

                    {
                        item.foodTransaction && item.foodTransaction !== null ?
                            (
                                <Row className="mb-3">
                                    <Col>
                                        <FoodTransaction application={item} />
                                    </Col>
                                </Row>
                            ) : null
                    }
                </>
            )
        }

        return null;
    }
}

export default DetailComplete