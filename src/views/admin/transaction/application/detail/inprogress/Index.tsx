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
import Service from './Service';
import Transaction from './Transaction';
import { ApplicationShow, ApplicationShowInprogress } from '../../../../../../types/admin/transaction/application';
import { colorStatusFormat, icoLinkImage } from '../../../../../../helpers/utils';

type OwnProps = {
    data: ApplicationShow | null
}

type Props = OwnProps

const Inprogress: React.FC<Props> = (props) => {
    const { data } = props

    if (data) {

        const item = data.item as ApplicationShowInprogress;

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
                        <Customer className="mb-3" data={item} />
                        <Service className="mb-3" data={item} />
                    </Col>
                    <Col>
                        <Transaction data={item} />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

    return null;
}

export default Inprogress