import * as React from 'react'

import {
    Card,
    CardTitle,
    CardBody,
    Row,
    Col,
} from 'reactstrap'

import { DriverShow } from '../../../../../types/admin/driver';
import { ServiceCount } from '../../../../../types/admin/service';
import { icoLinkImage } from '../../../../../helpers/utils';

type OwnProps = {
    data: DriverShow | null
}

type Props = OwnProps

const Transaction: React.FC<Props> = (props) => {
    const { data } = props

    if (data) {

        let transactionCount = 0;

        if (data.serviceCount) {
            transactionCount = data.serviceCount.map((value: Partial<ServiceCount>) => {
                return value.transactionCount ? value.transactionCount : 0
            }).reduce((previousValue: number, currentValue: number) => previousValue + currentValue)
        }

        return (
            <>
                <Card className="mb-2">
                    <CardBody>
                        <Row>
                            <Col>
                                <h1 className="font-weight-bold m-0">
                                    Total Transaksi
                                </h1>
                            </Col>
                            <Col>
                                <h1 className="font-weight-bold m-0">
                                    {transactionCount}
                                </h1>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Row>
                    {data.serviceCount && data.serviceCount.map((value: Partial<ServiceCount>, index: number) => {
                        return (
                            <Col md={6} key={index}>
                                <Card className="card-stats mb-2">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle className="text-uppercase text-muted mb-0">
                                                    {value.name}
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">{value.transactionCount}</span>
                                            </div>
                                            <Col className="col-auto align-self-center">
                                                <div className="img-ico-link">
                                                    <img src={value.code ? icoLinkImage(value.code) : ''} alt=""/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </>
        )
    }

    return null;
}

export default Transaction