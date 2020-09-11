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
import FoodTransaction from './FoodTransaction'
import Driver from './Driver'
import NotificationDriver from './NotificationDriver'
import SendTransaction from './SendTransaction'

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
                                        {item.transaction && item.transaction.status ? (
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
                                <div className="d-flex align-items-stretch justify-content-center mb-3">
                                    <div className="align-self-center w-100">
                                        <div className="img-ico-transaction-link">
                                            {item.transaction && item.transaction.service && item.transaction.service.code ? (
                                                <img src={icoLinkImage(item.transaction.service.code)} alt=""/>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                {item.driverInformation && item.driverInformation.vehicleMerk && (
                                    <div className="text-center">
                                        <div>Merek Kendaraan</div>
                                        <div>{item.driverInformation && item.driverInformation.vehicleMerk}</div>
                                    </div>
                                )}
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

export default Inprogress