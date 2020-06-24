import * as React from 'react'

import {
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import { WithDrawShow } from '../../../../../types/financialManager/withdraw'

type OwnProps = {
    data: WithDrawShow | null
}

type Props = OwnProps

const Profile: React.FC<Props> = (props) => {

    const { data } = props

    return (
        <Card>
            <CardHeader>
                <h3 className="mb-0">Detail Profile</h3>
            </CardHeader>
            <CardBody>
                <div>
                    <div className="form-group">
                        <label htmlFor="">Nama</label>
                        <div>
                            { data && data.request && data.request.driverProfile && data.request.driverProfile.user ? data.request.driverProfile.user.name : '' }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">No. Telepon</label>
                        <div>
                            { data && data.request && data.request.driverProfile && data.request.driverProfile.user ? data.request.driverProfile.user.phoneNumber : '' }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <div>
                            { data && data.request && data.request.driverProfile && data.request.driverProfile.user ? data.request.driverProfile.user.email : '' }
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default Profile