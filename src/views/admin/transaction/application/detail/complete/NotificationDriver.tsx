import * as React from 'react'
import { ApplicationShowComplete } from '../../../../../../types/admin/transaction/application'
import {
    Table, Badge, Card, CardHeader, Row, Col, CardBody
} from 'reactstrap'
import { DriverGetNotifTransaction } from '../../../../../../types/admin/driverGetNotifTransaction'
import { parseDateTimeFormat } from '../../../../../../helpers/utils'

type OwnProps = {
    item: ApplicationShowComplete
}

type Props = OwnProps

const NotificationDriver: React.FC<Props> = (props) => {
    
    const { item } = props

    const statusOrder = (status: number) => {
        if (status == 1) {
            return <Badge color="success">Ya</Badge>
        }

        return <Badge color="danger">Tidak</Badge>
    }

    return (
        <Card>
            <CardHeader>
                <Row className="align-items-center">
                    <Col>
                        <h3 className="mb-0">Daftar Driver Yang Mendapatkan Notif</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>No. Telepon</th>
                            <th>Tanggal & Waktu</th>
                            <th>Mendapatkan Order</th>
                            <th>Mengambil Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.transaction.driverGetNotif && item.transaction.driverGetNotif.map((driverGetNotif: DriverGetNotifTransaction, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{driverGetNotif.driverProfileView && driverGetNotif.driverProfileView.user.name}</td>
                                <td>{driverGetNotif.driverProfileView && driverGetNotif.driverProfileView.user.phoneNumber}</td>
                                <td>{parseDateTimeFormat(driverGetNotif.datetime)}</td>
                                <td>{statusOrder(driverGetNotif.getOrder)}</td>
                                <td>{statusOrder(driverGetNotif.takeOrder)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

export default NotificationDriver