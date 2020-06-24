import * as React from 'react'
import {
    Card,
    CardBody,
    Row,
    Col,
    CardTitle
} from 'reactstrap'
import { CustomerShow } from '../../../../../types/admin/customer';
import { ServiceCount } from '../../../../../types/admin/service';
import { icoLinkImage } from '../../../../../helpers/utils';


type OwnProps = {
    data: CustomerShow | null
}

type Props = OwnProps

const Transaction: React.FC<Props> = (props) => {
    const { data } = props

    if (data) {

        let transactionCount = 0;
        let serviceCount: Partial<ServiceCount>[] = []

        if (data.service) {
            serviceCount = data.service;
            transactionCount = serviceCount.map((value: Partial<ServiceCount>) => {
                let transactionCount = 0;

                if (value.transactionCount) transactionCount = value.transactionCount;

                return transactionCount
            }).reduce((previousValue: number, currentValue: number) => previousValue + currentValue);
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
                    {serviceCount.map((value: Partial<ServiceCount>, index: number) => {
                        let code = '';

                        if (value.code) code = value.code;

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
                                                    <img src={icoLinkImage(code)} alt=""/>
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