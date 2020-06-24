import * as React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap'
import { WithDrawShow } from '../../../../../types/financialManager/withdraw'

type OwnProps = {
    data: WithDrawShow | null
}

type Props = OwnProps

const Bank: React.FC<Props> = (props) => {
    const { data } = props

    return (
        <Card>
            <CardHeader>
                <h3 className="mb-0">Detail Bank</h3>
            </CardHeader>
            <CardBody>
                <h4>Bank Asal</h4>
                
                <div>
                    <div className="form-group">
                        <label htmlFor="">Nama</label>
                        <div>
                            { data && data.request ? data.request.bankName : '' }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Nomor Akun</label>
                        <div>
                            { data && data.request ? data.request.accountNumber : ''}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Nama Akun</label>
                        <div>
                            {data && data.request ? data.request.accountName : '' }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Jumlah</label>
                        <div>
                            { data && data.request ? data.request.amount : '' }
                        </div>
                    </div>
                </div>

                <hr/>

                <h4>Bank Tujuan</h4>

                <div>
                    <div className="form-group">
                        <label htmlFor="">Nama</label>
                        <div>
                            { data && data.request && data.request.bank ? data.request.bank.nama : '' }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Nama Bank</label>
                        <div>
                            { data && data.request && data.request.bank ? data.request.bank.bankName : '' }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Nama Akun</label>
                        <div>
                            { data && data.request && data.request.bank ? data.request.bank.accountName : '' }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Nomor Akun</label>
                        <div>
                            { data && data.request && data.request.bank ? data.request.bank.accountNumber : '' }
                        </div>
                    </div>
                </div>

            </CardBody>
        </Card>
    )
}

export default Bank