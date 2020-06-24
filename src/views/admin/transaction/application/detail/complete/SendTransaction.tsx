import * as React from 'react'
import { ApplicationShowComplete } from '../../../../../../types/admin/transaction/application';
import { Card, CardHeader, Row, Col, CardBody } from 'reactstrap';

type OwnProps = {
    className?: string,
    data: ApplicationShowComplete
}

type Props = OwnProps

const SendTransaction: React.FC<Props> = (props) => {
    
    const { 
        sendTransaction
    } = props.data
     
    if (sendTransaction) {
        return (
            <div className={props.className}>
                <Card>
                    <CardHeader>
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Link Send</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row className="mb-2">
                            <Col><label htmlFor="">Ukuran Barang</label></Col>
                            <Col>{sendTransaction.stuffSize}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col><label htmlFor="">Mudah Pecah</label></Col>
                            <Col>{sendTransaction.isFragile ? 'Ya' : 'Tidak'}</Col>
                        </Row>

                        <Row className="align-items-center mb-2">
                            <Col>
                                <h3 className="mb-0">Pengirim</h3>
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col><label htmlFor="">Nama</label></Col>
                            <Col>{sendTransaction.sender.name}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col><label htmlFor="">No. Telepon</label></Col>
                            <Col>{sendTransaction.sender.phoneNumber}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col><label htmlFor="">Catatan</label></Col>
                            <Col>{sendTransaction.sender.note}</Col>
                        </Row>

                        <Row className="align-items-center mb-2">
                            <Col>
                                <h3 className="mb-0">Penerima</h3>
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col><label htmlFor="">Nama</label></Col>
                            <Col>{sendTransaction.recipient.name}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col><label htmlFor="">No. Telepon</label></Col>
                            <Col>{sendTransaction.recipient.phoneNumber}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col><label htmlFor="">Catatan</label></Col>
                            <Col>{sendTransaction.recipient.note}</Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }

    return null;
}

export default SendTransaction