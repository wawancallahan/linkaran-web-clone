import * as React from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap';

import { ApplicationShowInprogress } from '../../../../../../types/admin/transaction/application';

type OwnProps = {
    className?: string,
    data: ApplicationShowInprogress
}

type Props = OwnProps

const Transaction: React.FC<Props> = (props) => {

    const { data } = props;

    return (
        <div className={props.className}>
            <Card>
                <CardHeader>
                    <Row className="align-items-center">
                        <Col>
                            <h3 className="mb-0">Nominal Transaksi</h3>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Tarif</label></Col>
                        <Col>Rp. {data.transaction ? data.transaction.cost : ''}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Pembayaran Lain</label></Col>
                        <Col></Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Promo / Potongan</label></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Total Transaksi</label></Col>
                        <Col>Rp. {data.transaction ? data.transaction.totalCost : ''}</Col>
                    </Row>
                    <hr />
                    <Row className="mb-2">
                        <Col><label htmlFor="">Potongan Driver</label></Col>
                        <Col></Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Tip</label></Col>
                        <Col>Rp.</Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="">Total Pendapatan Driver</label></Col>
                        <Col>Rp.</Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Transaction;