import * as React from 'react'
import { ApplicationShowComplete, FoodTransactionDetail } from '../../../../../../types/admin/transaction/application';
import { Card, CardHeader, Row, Col, CardBody, Table } from 'reactstrap';
import ModalImage from 'react-modal-image';
import NumberFormat from 'react-number-format';

type OwnProps = {
    className?: string,
    data: ApplicationShowComplete
}

type Props = OwnProps

const FoodTransaction: React.FC<Props> = (props) => {
    
    const {
        foodTransaction
    } = props.data

    if (foodTransaction) {
        return (
            <div className={props.className}>
                <Card>
                    <CardHeader>
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Link Food</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row className="align-items-center mb-2">
                            <Col>
                                <h3 className="mb-0">Makanan</h3>
                            </Col>
                        </Row>

                        <div className="mb-4">
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th>No</th>
                                        <th>Gambar</th>
                                        <th>Nama</th>
                                        <th>Harga</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Deskripsi</th>
                                        <th>Catatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foodTransaction.foods.map((item: FoodTransactionDetail, index: number) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td> 
                                                    <div className="img-table mr-3">
                                                        {item.image ? (
                                                            <ModalImage small={new URL(item.image)} 
                                                                        large={new URL(item.image)} />
                                                        ) : null}
                                                    </div>
                                                </td>
                                                <td>{item.name}</td>
                                                <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={item.price} /></td>
                                                <td>{item.quantity}</td>
                                                <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={item.subPrice} /></td>
                                                <td>{item.description}</td>
                                                <td>{item.note}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>

                        <Row className="mb-2">
                            <Col><label htmlFor="">Total</label></Col>
                            <Col>{<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={foodTransaction.foodCost} />}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col><label htmlFor="">Biaya Muatan</label></Col>
                            <Col>{<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={foodTransaction.freightCost} />}</Col>
                        </Row>

                        {
                            foodTransaction.restaurant ? 
                            (
                                <>
                                    <Row className="align-items-center mb-2">
                                        <Col>
                                            <h3 className="mb-0">Restoran</h3>
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Nama</label></Col>
                                        <Col>{foodTransaction.restaurant.name}</Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col><label htmlFor="">No. Telepon</label></Col>
                                        <Col>{foodTransaction.restaurant.phoneNumber}</Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Alamat</label></Col>
                                        <Col>{foodTransaction.restaurant.address}</Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Jam Buka</label></Col>
                                        <Col>{foodTransaction.restaurant.openTime} - {foodTransaction.restaurant.closeTime}</Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Point</label></Col>
                                        <Col>{foodTransaction.restaurant.point ? `${foodTransaction.restaurant.point.lat} ${foodTransaction.restaurant.point.lng}` : ''}</Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col><label htmlFor="">Lokasi</label></Col>
                                        <Col>{foodTransaction.restaurant.district}, {foodTransaction.restaurant.province}</Col>
                                    </Row>
                                </>
                            ) : null
                        }

                    </CardBody>
                </Card>
            </div>
        )
    }

    return null
}

export default FoodTransaction
