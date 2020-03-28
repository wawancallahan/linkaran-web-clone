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

import DetailCustomer from './Detail/Customer';
import DetailDriver from './Detail/Driver';
import DetailService from './Detail/Service';
import DetailTransaction from './Detail/Transaction';
import DetailFeedback from './Detail/Feedback';
import { ApplicationShow, ApplicationShowComplete } from '../../../../types/admin/transaction/application';
import { colorStatusFormat, icoLinkImage } from '../../../../helpers/utils';

type DetailCompleteProps = {
    application: ApplicationShow | undefined
}

type Props = DetailCompleteProps

class DetailComplete extends Component<Props> {
    render() {
        const { application } = this.props;

        if (application) {

            console.log(application);

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
                                                <img src={icoLinkImage(item.transaction.service.code)} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DetailCustomer className="mb-3" application={item} />
                            <DetailService className="mb-3" application={item} />
                            <DetailTransaction application={item} />
                        </Col>
                        <Col>
                            <DetailDriver className="mb-3" application={item} />
                            <DetailFeedback application={item} />
                        </Col>
                    </Row>
                </>
            )
        }

        return null;
    }
}

export default DetailComplete