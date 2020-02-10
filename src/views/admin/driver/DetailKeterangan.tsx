import React, { Component } from 'react'

import {
    Card,
    CardTitle,
    CardBody
} from 'reactstrap'

import { DriverDetail } from '../../../types/admin/driver';

type Props = {
    driver: DriverDetail | null
}

class DetailKeterangan extends Component<Props> {
    render() {
        const { driver } = this.props

        if (driver) {

            const isActivelyBecomingAnotherOnlineDriverText = driver.isActivelyBecomingAnotherOnlineDriver ? "Tetap aktif" : "Sudah tidak aktif"
            const choiceOfActiveWorkHoursText = driver.choiceOfActiveWorkHours
            const isJoiningLinkaranAsmainJobText = driver.isJoiningLinkaranAsmainJob ? "" : "Tidak"
            const wasOnceAnOnlineDriverText = driver.wasOnceAnOnlineDriver ? "Sudah" : "Belum"
            const isJoiningTheDriverCommunityText = driver.isJoiningTheDriverCommunity ? "Sedang" : "Tidak sedang"

            return (
                <Card>
                    <CardBody>
                        <CardTitle className="font-weight-bold">Keterangan</CardTitle>
                        <ul className="list-unstyled">
                            <li>1. {wasOnceAnOnlineDriverText} pernah menjadi driver pada aplikator lain</li>
                            <li>2. {isActivelyBecomingAnotherOnlineDriverText} menjadi driver pada aplikator lain</li>
                            <li>3. {isJoiningTheDriverCommunityText} bergabung ke komunitas driver</li>
                            <li>4. bergabung ke Linkaran {isJoiningLinkaranAsmainJobText} sebagai pekerjaan utama</li>
                            <li>5. Jam kerja aktif yang dikehendaki yaitu {choiceOfActiveWorkHoursText}</li>
                        </ul>
                    </CardBody>
                </Card>
            )
        }

        return null
    }
}

export default DetailKeterangan