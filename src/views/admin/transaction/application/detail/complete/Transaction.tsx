import * as React from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import { ApplicationShowComplete } from '../../../../../../types/admin/transaction/application';

type OwnProps = {
    className?: string,
    data: ApplicationShowComplete
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
                        <Col><label htmlFor="">Tarif Transportasi</label></Col>
                        <Col>Rp. {data.transaction ? data.transaction.transportationFee : ''}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Tarif Layanan</label></Col>
                        <Col>Rp. {data.transaction ? data.transaction.serviceFee : ''}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Total Tarif</label></Col>
                        <Col>Rp. {data.transaction ? data.transaction.totalCostBeforeCut : ''}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Potongan Voucher</label></Col>
                        <Col>Rp. {data.transaction ? data.transaction.paymentFromVoucher : ''}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col><label htmlFor="">Total Akhir</label></Col>
                        <Col>Rp. {data.transaction ? data.transaction.totalCost : ''}</Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default Transaction;