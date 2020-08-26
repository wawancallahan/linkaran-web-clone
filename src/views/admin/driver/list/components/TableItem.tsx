import * as React from 'react'
import { DriverList, Driver } from '../../../../../types/admin/driver'
import { Button, Badge } from 'reactstrap'
import { setAlertDriverShowAction, deleteDriverAction } from '../../../../../actions/admin/driver'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import { EMoneyUser } from '../../../../../types/admin/eMoneyUser'
import { parseDateFormat } from '../../../../../helpers/utils'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import { withRouter, RouteComponentProps } from 'react-router-dom'

type OwnProps = RouteComponentProps & {
    index: number,
    item: DriverList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const TableItem: React.FC<Props> = (props) => {
    const deleteItem = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.setLoader(true)
                props.deleteDriverAction(id)
                .then((response: ApiResponse<Driver>) => {
                    props.setAlertDriverShowAction("Data Berhasil Dihapus", 'success');
                    props.history.push(props.location.pathname);
                    props.fetch(1);
                    props.setLoader(false);
                })
                .catch( (error: ApiResponse<Driver>) => {
                    props.setLoader(false)

                    props.setAlertDriverShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    let saldo = 0;

    if (props.item.user && props.item.user.eMoneyUser && props.item.user.eMoneyUser.length > 0) {
        saldo = _.reduce(props.item.user.eMoneyUser, (sum: number, eMoneyUser: Partial<EMoneyUser>) => {
            return sum + (eMoneyUser.balance ? eMoneyUser.balance : 0);
        }, 0);
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.user ? props.item.user.name : ''}</td>
            <td>{props.item.user ? props.item.user.phoneNumber : ''}</td>
            <td>{props.item.user ? props.item.user.email : ''}</td>
            <td>{props.item.identityNumber}</td>
            <td>{props.item.gender}</td>
            <td>{props.item.dateOfBirth}</td>
            <td>{props.item.user && props.item.user.eMoneyUser && props.item.user.eMoneyUser.length > 0 ? (<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={saldo} />)  : '-'}</td>
            <td>{props.item.createdAt ? parseDateFormat(props.item.createdAt) : ''}</td>
            <td>{props.item.isActive ? <Badge color="success">Aktif</Badge> : <Badge color="danger">Tidak Aktif</Badge>}</td>
            <td>
                <a href={`/admin/driver/${props.item.id}/transaksi`} className="btn btn-success btn-sm">
                    <i className="fa fa-file"></i>
                </a>
                <a href={`/admin/driver/${props.item.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </a>
                <a href={`/admin/driver/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i>
                </a>
                <Button color="danger" size="sm" onClick={() => deleteItem(props.item.id)}>
                    <i className="fa fa-trash"></i>
                </Button>
            </td>
        </tr>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    setAlertDriverShowAction: (message: string, color: string) => dispatch(setAlertDriverShowAction(message, color)),
    deleteDriverAction: (id: number) => dispatch(deleteDriverAction(id)),
});

export default withRouter(connect(null, mapDispatchToProps)(TableItem));
