import * as React from 'react'
import { PartnerList, Partner } from '../../../../../types/admin/partner'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deletePartnerAction, setAlertPartnerShowAction, activePartnerAction, deactivePartnerAction } from '../../../../../actions/admin/partner'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import { parseDateFormat, booleanToActiveStatus } from '../../../../../helpers/utils'

type OwnProps = {
    index: number,
    item: PartnerList,
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
                props.deletePartnerAction(id)
                .then((response: ApiResponse<Partner>) => {
                    props.fetch(1);

                    props.setAlertPartnerShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Partner>) => {
                    props.setAlertPartnerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    const activePartner = (id: number) => {
        swal("Apakah anda yakin?", "Mengaktifkan Data Partner ini!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.activePartnerAction(id)
                .then( (response: ApiResponse<Partner>) => {
                    props.fetch(1);

                    props.setAlertPartnerShowAction("Berhasil Mengaktifkan Partner", 'success');
                })
                .catch( (response: ApiResponse<Partner>) => {
                    props.setAlertPartnerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    const deactivePartner = (id: number) => {
        swal("Apakah anda yakin?", "Menonaktifkan Data Partner ini!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.deactivePartnerAction(id)
                .then( (response: ApiResponse<Partner>) => {
                    props.fetch(1);

                    props.setAlertPartnerShowAction("Berhasil Menonaktifkan Partner", 'success');
                })
                .catch( (response: ApiResponse<Partner>) => {
                    props.setAlertPartnerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.companyName}</td>
            <td>{parseDateFormat(props.item.startWorkingTogether)}</td>
            <td>{parseDateFormat(props.item.endWorkingTogether)}</td>
            <td>{booleanToActiveStatus(props.item.active)}</td>
            <td>{props.item.user.name}</td>
            <td>
                {
                    props.item.active ? (
                        <Button color="danger" size="sm" onClick={() => deactivePartner(props.item.id)}>
                            <i className="fa fa-times"></i> Non Aktif
                        </Button>
                    ) : (
                        <Button color="info" size="sm" onClick={() => activePartner(props.item.id)}>
                            <i className="fa fa-check"></i> Aktifkan
                        </Button>
                    )
                }
                <Link to={`/admin/partner/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deletePartnerAction: (id: number) => Promise<ApiResponse<Partner>>,
    setAlertPartnerShowAction: (message: string, color: string) => void,
    activePartnerAction: (id: number) => Promise<ApiResponse<Partner>>,
    deactivePartnerAction: (id: number) => Promise<ApiResponse<Partner>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deletePartnerAction: (id: number) => dispatch(deletePartnerAction(id)),
        setAlertPartnerShowAction: (message: string, color: string) => dispatch(setAlertPartnerShowAction(message, color)),
        activePartnerAction: (id: number) => dispatch(activePartnerAction(id)),
        deactivePartnerAction: (id: number) => dispatch(deactivePartnerAction(id)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
