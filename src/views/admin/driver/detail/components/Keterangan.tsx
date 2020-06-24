import * as React from 'react'

import {
    Card,
    CardTitle,
    CardBody,
} from 'reactstrap'

import { DriverShow } from '../../../../../types/admin/driver';

type OwnProps = {
    data: DriverShow | null
}

type Props = OwnProps

const Keterangan: React.FC<Props> = (props) => {
    const { data } = props

    if (data) {

        const isActivelyBecomingAnotherOnlineDriverText = data.isActivelyBecomingAnotherOnlineDriver ? "Tetap aktif" : "Sudah tidak aktif"
        const choiceOfActiveWorkHoursText = data.choiceOfActiveWorkHours
        const isJoiningLinkaranAsmainJobText = data.isJoiningLinkaranAsmainJob ? "" : "Tidak"
        const wasOnceAnOnlineDriverText = data.wasOnceAnOnlineDriver ? "Sudah" : "Belum"
        const isJoiningTheDriverCommunityText = data.isJoiningTheDriverCommunity ? "Sedang" : "Tidak sedang"

        return (
            <Card>
                <CardBody>
                    <CardTitle className="font-weight-bold">Keterangan</CardTitle>
                    <ul className="list-unstyled">
                        <li className="mb-3">1. {wasOnceAnOnlineDriverText} pernah menjadi driver pada aplikator lain</li>
                        <li className="mb-3">2. {isActivelyBecomingAnotherOnlineDriverText} menjadi driver pada aplikator lain</li>
                        <li className="mb-3">3. {isJoiningTheDriverCommunityText} bergabung ke komunitas driver</li>
                        <li className="mb-3">4. bergabung ke Linkaran {isJoiningLinkaranAsmainJobText} sebagai pekerjaan utama</li>
                        <li className="mb-3">5. Jam kerja aktif yang dikehendaki yaitu {choiceOfActiveWorkHoursText}</li>
                    </ul>
                </CardBody>
            </Card>
        )
    }

    return null
}

export default Keterangan