import React from 'react'
import { VoucherPromoShow } from '../../../types/admin/voucherPromo'
import { Card, CardHeader, Row, Table } from 'reactstrap';
import { Restaurant } from '../../../types/admin/restaurant';

type Props = {
    data: VoucherPromoShow | null
}

const DetailRestaurant = (props: Props) => {
    
    const { data } = props;

    if (data) {

        return (
            <Card className="shadow mb-4">
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <div className="col">
                            <h3 className="mb-0">Daftar Restoran Promo</h3>
                        </div>
                    </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>No Telepon</th>
                                <th>Point</th>
                                <th>Rating</th>
                                <th>Alamat</th>
                                <th>Registrasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.restaurants && data.restaurants.map((item: Partial<Restaurant>, index: number) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.point ? (item.point.lat + "," + item.point.lng) : ''}</td>
                                        <td>{item.rating}</td>
                                        <td>{item.address}</td>
                                        <td>{item.registered ? 'Ya' : 'Tidak'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                </Table>
            </Card>
        );
    }

    return null;
}

export default DetailRestaurant