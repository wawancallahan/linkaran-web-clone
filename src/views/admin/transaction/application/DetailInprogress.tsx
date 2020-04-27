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

import DetailCustomer from './detail/inprogress/Customer';
import DetailService from './detail/inprogress/Service';
import DetailTransaction from './detail/inprogress/Transaction';
import { ApplicationShow, ApplicationShowInprogress } from '../../../../types/admin/transaction/application';
import { colorStatusFormat, icoLinkImage } from '../../../../helpers/utils';

type DetailInprogressProps = {
    application: ApplicationShow | undefined
}

type Props = DetailInprogressProps

class DetailInprogress extends Component<Props> {
    render() {
        const { application } = this.props;

        if (application) {

            console.log(application);

            const item = application.item as ApplicationShowInprogress;

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
                                            {item.transaction ? (
                                                <Badge color={colorStatusFormat(item.transaction.status)}>{item.transaction.status}</Badge>
                                            ) : null}
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
                                                {item.transaction && item.transaction.service && item.transaction.service.code ? (
                                                    <img src={icoLinkImage(item.transaction.service.code)} alt=""/>
                                                ) : null}
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
                        </Col>
                        <Col>
                            <DetailTransaction application={item} />
                        </Col>
                    </Row>
                </>
            )
        }

        return null;
    }
}

export default DetailInprogress