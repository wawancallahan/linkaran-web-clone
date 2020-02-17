import React, { Component } from 'react'
import { 
    Card, 
    CardTitle,
    CardBody, 
    Row,
    Col
} from 'reactstrap'

import { CustomerShow } from '../../../types/admin/customer';
import { ServiceCount } from '../../../types/admin/service';
import { icoLinkImage } from '../../../helpers/parseData';

type Props = {
    customer: CustomerShow | null
}

class DetailTransaction extends Component<Props> {
    render() {

        const { customer } = this.props

        if (customer) {

            const transactionCount = 0;
            const serviceCount: ServiceCount[] = [
                {
                    "name": "LINKCAR",
                    "code": "linkcar",
                    "transactionCount": 0
                },
                {
                    "name": "LINKSEND",
                    "code": "linksend",
                    "transactionCount": 0
                },
                {
                    "name": "LINKFOOD",
                    "code": "linkfood",
                    "transactionCount": 0
                },
                {
                    "name": "LINKRIDE",
                    "code": "linkride",
                    "transactionCount": 0
                }
            ];

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
                        {serviceCount.map((value: ServiceCount, index: number) => {
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
                                                        <img src={icoLinkImage(value.code)} alt=""/>
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
}

export default DetailTransaction