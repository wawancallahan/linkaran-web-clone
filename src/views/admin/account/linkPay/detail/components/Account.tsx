import * as React from 'react'
import { AccountLinkPay } from '../../../../../../types/admin/account/linkPay'
import { Table } from 'reactstrap'

type OwnProps = {
    data: AccountLinkPay | null
}

type Props = OwnProps

const Account: React.FC<Props> = (props) => {
    if (props.data) {
        return (
            <Table className="align-items-center table-flush" responsive>
                <tbody>
                    <tr>
                        <td>Nama</td>
                        <td>{props.data.name}</td>
                    </tr>
                    <tr>
                        <td>Jumlah</td>
                        <td>{props.data.balance}</td>
                    </tr>
                    <tr>
                        <td>Kode</td>
                        <td>{props.data.code}</td>
                    </tr>
                    <tr>
                        <td>Tipe</td>
                        <td>{props.data.type}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    return (
        <div>Data Tidak Ditemukan</div>
    )
}

export default Account