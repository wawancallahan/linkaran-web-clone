import * as React from 'react'

import {
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import { WithDrawShow } from '../../../../../types/financialManager/withdraw'

import '../../../../../react-modal-image.d.ts'
import { Lightbox } from 'react-modal-image'
import { parseDateFormat } from '../../../../../helpers/utils'

type OwnProps = {
    data: WithDrawShow | null
}

type Props = OwnProps

const WithDraw: React.FC<Props> = (props) => {

    const [evidenceVisible, setEvidenceVisible] = React.useState(false)

    const { data } = props

    let evidenceImage = ''

    if (data && data.evidance) {
        evidenceImage = data.evidance
    }

    let declineInformation: React.ReactChild = ''

    if (data && data.decline && data.decline !== null) {
        declineInformation = (
            <div>
                <div className="form-group">
                    <label htmlFor="">Tanggal Dibatalkan</label>
                    <div>
                        {data && data.decline && data.decline.declineAt ? parseDateFormat(data.decline.declineAt as string) : '' }
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="">Dibatalkan Oleh</label>
                    <div>
                        { data && data.decline && data.decline.userDecline ? data.decline.userDecline.name : '' }
                    </div>
                </div>
            </div>
        )
    }

    let approveInformation: React.ReactChild = ''

    if (data && data.approvedAt !== null && data.approvedBy && data.approvedBy !== null) {
        approveInformation = (
            <div>
                <div className="form-group">
                    <label htmlFor="">Tanggal Disetujui</label>
                    <div>
                        {data ? data.approvedAt : '' }
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="">Disetujui Oleh</label>
                    <div>
                        { data && data.approvedBy ? data.approvedBy.name : '' }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {
                evidenceImage !== '' ? (
                    evidenceVisible ? (
                    <Lightbox large={new URL(evidenceImage)}
                            onClose={() => setEvidenceVisible(false)}/>
                    ) : null
                ) : null
            }

            <Card className="mb-2">
                <CardHeader>
                    <h3 className="mb-0">Detail Penarikan</h3>
                </CardHeader>
                <CardBody>
                    <div>
                        <div className="form-group">
                            <label htmlFor="">Bukti Penarikan</label>
                            <div className="d-flex align-items-center">
                                <div className="img-responsive">
                                    <img src={evidenceImage} alt="" onClick={() => setEvidenceVisible( ! evidenceVisible)}/>    
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Tanggal</label>
                            <div>
                                { data ? data.transactionDate : '' }
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Manual</label>
                            <div>
                                { data ? (data.isManual ? "Ya" : "Tidak") : ''}
                            </div>
                        </div>

                        {approveInformation}
                        {declineInformation}
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    )

}

export default WithDraw