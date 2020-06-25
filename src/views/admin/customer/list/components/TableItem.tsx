import * as React from 'react'
import { CustomerList, Customer } from '../../../../../types/admin/customer'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { setAlertCustomerShowAction, activeCustomerAction, deactiveCustomerAction } from '../../../../../actions/admin/customer'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: CustomerList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = LinkDispatchToProps & OwnProps

const TableItem: React.FC<Props> = (props) => {
    const activeCustomer = (id: number) => {
        swal("Apakah anda yakin?", "Mengaktifkan Data Customer ini!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.activeCustomerAction(id)
                .then( (response: ApiResponse<Customer>) => {
                    props.fetch(1);

                    props.setAlertCustomerShowAction("Berhasil Mengaktifkan Customer", 'success');
                })
                .catch( (response: ApiResponse<Customer>) => {
                    props.setAlertCustomerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    const deactiveCustomer = (id: number) => {
        swal("Apakah anda yakin?", "Menonaktifkan Data Customer ini!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.deactiveCustomerAction(id)
                .then( (response: ApiResponse<Customer>) => {
                    props.fetch(1);

                    props.setAlertCustomerShowAction("Berhasil Menonaktifkan Customer", 'success');
                })
                .catch( (response: ApiResponse<Customer>) => {
                    props.setAlertCustomerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.phoneNumber}</td>
            <td>{props.item.email}</td>
            <td>{props.item.isActive ? "Aktif" : "Tidak Aktif"}</td>
            <td>
                {
                    props.item.isActive ? (
                        <Button color="danger" size="sm" onClick={() => deactiveCustomer(props.item.id)}>
                            <i className="fa fa-times"></i> Non Aktif
                        </Button>
                    ) : (
                        <Button color="info" size="sm" onClick={() => activeCustomer(props.item.id)}>
                            <i className="fa fa-check"></i> Aktifkan
                        </Button>
                    )
                }
                
                <Link to={`/admin/customer/${props.item.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </Link>

                <Link to={`/admin/driver/create-from-customer/${props.item.id}`} className="btn btn-primary btn-sm">
                    <i className="fa fa-motorcycle"></i> Driver
                </Link>
            </td>
        </tr>
    )
}

type LinkDispatchToProps = {
    setAlertCustomerShowAction: (message: string, color: string) => void,
    activeCustomerAction: (id: number) => Promise<ApiResponse<Customer>>,
    deactiveCustomerAction: (id: number) => Promise<ApiResponse<Customer>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        setAlertCustomerShowAction: (message: string, color: string) => dispatch(setAlertCustomerShowAction(message, color)),
        activeCustomerAction: (id: number) => dispatch(activeCustomerAction(id)),
        deactiveCustomerAction: (id: number) => dispatch(deactiveCustomerAction(id)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)