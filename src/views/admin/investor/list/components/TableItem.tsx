import * as React from 'react'
import { InvestorList, Investor } from '../../../../../types/admin/investor'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteInvestorAction, setAlertInvestorShowAction } from '../../../../../actions/admin/investor'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: InvestorList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = LinkDispatchToProps & OwnProps

const TableItem: React.FC<Props> = (props) => {
    const deleteItem = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.setLoader(true)
                props.deleteInvestorAction(id)
                .then((response: ApiResponse<Investor>) => {
                    props.fetch(1);

                    props.setAlertInvestorShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Investor>) => {
                    props.setAlertInvestorShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
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
            <td>
                <Link to={`/admin/investor/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => deleteItem(props.item.id)}>
                    <i className="fa fa-trash"></i> Hapus
                </Button>
            </td>
        </tr>
    )
}

type LinkDispatchToProps = {
    deleteInvestorAction: (id: number) => Promise<ApiResponse<Investor>>,
    setAlertInvestorShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteInvestorAction: (id: number) => dispatch(deleteInvestorAction(id)),
        setAlertInvestorShowAction: (message: string, color: string) => dispatch(setAlertInvestorShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)