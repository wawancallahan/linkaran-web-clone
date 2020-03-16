import React, { Component } from 'react'

import {
    Card,
    CardBody,
    CardHeader,
    Row,
    Col,
    Table,
    CardFooter,
    Button,
    Modal,
    Form as FormReactStrap,
    FormGroup,
    Input,
    Alert
} from 'reactstrap'

import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import Pagination from '../../../components/Pagination/Pagination'
import { VoucherPromo } from '../../../types/admin/voucherPromo';
import { Ticket, FormField, TicketCreate, TicketCreateResult, TicketEdit, TicketEditResult } from '../../../types/admin/ticket';
import { Paginator } from '../../../types/paginator';
import { fetchTicketVoucherAction, createTicketAction, deleteTicketAction, editTicketAction } from '../../../actions/admin/ticket';
import Spinner from '../../../components/Loader/Spinner'
import { parseDateTimeFormat } from '../../../helpers/utils';
import queryString from 'query-string';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ApiResponse, ApiResponseSuccess } from '../../../types/api';
import { ModalToggleVisible } from '../../../types/modal';
import { number } from 'prop-types';
import swal from 'sweetalert'
import { toast, TypeOptions } from 'react-toastify'

interface ModalState { 
    id: number, 
    redeemCode: string,
    visible: boolean
}

type ListTicketProps = RouteComponentProps & {
    data: VoucherPromo | null
}

type Props = ListTicketProps & LinkStateToProps & LinkDispatchToProps

type State = {
    loader: boolean,
    modal_add_visible: boolean,
    modal_edit_visible: ModalToggleVisible,
    form: FormField,
    voucherId: string,
    modalState: ModalState[],
    alert_visible: boolean,
    alert_message: string,
    alert_color: string
}

const TableItem = (props: {
    index: number,
    item: Ticket,
    key: number,
    modalState: ModalState,
    voucher: VoucherPromo | null,
    editTicketAction: (ticket: TicketEdit, id: number) => Promise<ApiResponse<TicketEditResult>>,
    setAlertMessage: (message: string, color: string) => void,
    loadTicketVoucherList: () => void,
    setAlertOpen: (open: boolean) => void,
    toggleEditModelTicket: (id: number) => void,
    deleteTicket: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.item.redeemCode}</td>
            <td>{parseDateTimeFormat(props.item.claimAt)}</td>
            <td>
                <Button color="warning" size="sm" onClick={() => props.toggleEditModelTicket(props.index)}>
                    <i className="fa fa-edit"></i>
                </Button>
                <Button color="danger" size="sm" onClick={() => props.deleteTicket(props.item.id)}>
                    <i className="fa fa-trash"></i>
                </Button>

                <Modal
                    className="modal-dialog-centered"
                    isOpen={props.modalState.visible}
                    toggle={() => props.toggleEditModelTicket(props.index)}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-ticket">
                            Edit Tiket
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => props.toggleEditModelTicket(props.index)}
                            >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Formik initialValues={{
                                    redeemCode: props.item.redeemCode
                                }}
                                onSubmit={(values, action) => {
                                    props.setAlertOpen(false)

                                    if (props.voucher) {
                                        const ticketForm: TicketEdit = {
                                            redeemCode: values.redeemCode,
                                            voucher: {
                                                id: props.voucher.id
                                            }
                                        }
    
                                        props.editTicketAction(ticketForm, props.item.id)
                                            .then( (response: ApiResponse<TicketEditResult>) => {
                                                const data: ApiResponseSuccess<TicketEditResult> = response.response!;
                                                
                                                props.setAlertMessage('Data Berhasil Diedit', 'success');
                                                props.setAlertOpen(true);
                                                props.toggleEditModelTicket(props.index);
                                                props.loadTicketVoucherList();
                                            })
                                            .catch( (error: ApiResponse<TicketEditResult>) => {
                                                let message = "Gagal Mendapatkan Response";
    
                                                if (error.error) {
                                                    message = error.error.metaData.message;
                                                }
                                            
                                                props.setAlertMessage(message, 'danger');
                                                props.setAlertOpen(true);
                                                props.toggleEditModelTicket(props.index)
                                                action.setSubmitting(false)
                                            });
                                    }
                                }}
                                validationSchema={createSchema}>
                            {(FormikProps => {
                                return (
                                    <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST">
                                        <div className="pl-lg-4">
                                            <FormGroup>
                                                <label
                                                className="form-control-label"
                                                htmlFor="input-code"
                                                >
                                                    Kode
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-code"
                                                    placeholder="Kode"
                                                    type="text"
                                                    name="redeemCode"
                                                    maxLength={255}
                                                    value={FormikProps.values.redeemCode}
                                                    required
                                                    onChange={FormikProps.handleChange}
                                                    onBlur={FormikProps.handleBlur}
                                                    invalid={ !!(FormikProps.touched.redeemCode && FormikProps.errors.redeemCode) }
                                                />
                                                <div>
                                                    {FormikProps.errors.redeemCode && FormikProps.touched.redeemCode ? FormikProps.errors.redeemCode : ''}
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <div className="text-right">
                                                    <Button
                                                        color="secondary"
                                                        data-dismiss="modal"
                                                        type="button"
                                                        onClick={() => props.toggleEditModelTicket(props.index)}
                                                    >
                                                        Tutup
                                                    </Button>
                                                    <Button color="primary" type="button" onClick={() => {
                                                        FormikProps.setSubmitting(true)
                                                        FormikProps.submitForm();
                                                    }} disabled={FormikProps.isSubmitting}>
                                                        Edit
                                                    </Button>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </FormReactStrap>
                                );
                            })}
                        </Formik>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

const TableItemEmpty = () => (
    <tr>
        <td colSpan={4}>Data Tidak Ditemukan</td> 
    </tr>
);

const createSchema = Yup.object().shape({
    redeemCode: Yup.string()
            .test('len', 'Bidang isian kode tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian kode wajib diisi'),
})

class ListTicket extends Component<Props, State> {

    state = {
        loader: false,
        modal_add_visible: false,
        modal_edit_visible: {},
        form: {
            redeemCode: '',
        },
        voucherId: '',
        modalState: [],
        alert_visible: false,
        alert_message: '',
        alert_color: ''
    }

    componentDidMount() {
        this.loadTicketVoucherList();
    }

    loadTicketVoucherList = () => {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        if (this.props.data) {
            this.fetchTicketVoucherList(page, this.props.data.id);
        }
    }

    fetchTicketVoucherList = (page: number, id: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchTicketVoucherAction(page, id).then(() => {
                
                const modalState: ModalState[] = []

                this.props.ticketVoucherList.forEach(async (value: Ticket) => {
                    modalState.push({
                        id: value.id,
                        redeemCode: value.redeemCode,
                        visible: false
                    })
                })

                this.setState({
                    loader: false,
                    modalState: modalState
                })
            });
        })
    }

    toggleAddModalTicket = () => {
        this.setState( (prevState: State) => {
            return {
                form: {
                    ...prevState.form,
                    redeemCode: ''
                },
                modal_add_visible: ! prevState.modal_add_visible
            }
        })
    }

    toggleEditModelTicket = (index: number) => {

        const modalStateList: ModalState[] = {
            ...this.state.modalState
        };
    
        modalStateList[index].visible = ! modalStateList[index].visible;
        
        const newModalState: ModalState[] = {
            ...modalStateList
        }
    
        this.setState({
            modalState: newModalState
        });
    }

    setAlertMessage = (message: string, color: string) => {
        this.setState({
            alert_message: message,
            alert_color: color
        });
    }

    setAlertOpen = (open: boolean) => {
        this.setState({
            alert_visible: open
        })
    }

    toastNotify = (message: string, type: TypeOptions) => {
        toast(message, {
            type: type,
            position: toast.POSITION.TOP_RIGHT,
            draggable: false,
            hideProgressBar: true,
            closeOnClick: false
        })
    }

    deleteTicket = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteTicketAction(id)
                .then( (response: ApiResponse<Ticket>) => {
                    this.toastNotify('Data Berhasil Dihapus', "success");
                    this.loadTicketVoucherList();
                })
                .catch( (error: ApiResponse<Ticket>) => {
                    let message = "Gagal Mendapatkan Response";

                    if (error.error) {
                        message = error.error.metaData.message;
                    }

                    this.toastNotify(message, "error");
                });
            }
        })
    }

    render () {

        let ticketVoucherList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.ticketVoucherList.length > 0) {
                ticketVoucherList = this.props.ticketVoucherList.map((item: Ticket, index: number) => {
                    const selectedModalState = this.state.modalState[index];

                    return (
                        <TableItem key={index}
                               item={item}
                               index={index}
                               modalState={selectedModalState}
                               voucher={this.props.data}
                               editTicketAction={this.props.editTicketAction}
                               loadTicketVoucherList={this.loadTicketVoucherList}
                               setAlertMessage={this.setAlertMessage}
                               setAlertOpen={this.setAlertOpen}
                               deleteTicket={this.deleteTicket}
                               toggleEditModelTicket={this.toggleEditModelTicket}
                               />
                    )
                });
            } else {
                ticketVoucherList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.state.alert_color} isOpen={this.state.alert_visible} toggle={() => this.setAlertOpen(false)} fade={false}>
                <div>{this.state.alert_message}</div>
            </Alert>
        );

        return (
            <>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <Row>
                            <div className="col">
                                {CAlert}
                            </div>
                        </Row>
                        <Row className="align-items-center">
                            <div className="col">
                                <h3 className="mb-0">Daftar Tiket</h3>
                            </div>
                            <div className="col text-right">
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => this.toggleAddModalTicket()}
                                >
                                    Tambah Tiket
                                </Button>
                            </div>
                        </Row>
                    </CardHeader>

                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th>Kode</th>
                                <th>Tanggal Digunakan</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketVoucherList}
                        </tbody>
                    </Table>
                    
                    {loaderSpinner}
                    
                    <CardFooter className="py-4">
                        <Pagination pageCount={this.props.paginate.pageCount}
                                        currentPage={this.props.paginate.currentPage}
                                        itemCount={this.props.paginate.itemCount}
                                        itemClicked={(page: number) => {
                                            if (this.props.data) {
                                                this.fetchTicketVoucherList(page, this.props.data.id)   
                                            }
                                        }} />
                    </CardFooter>
                </Card>

                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.modal_add_visible}
                    toggle={() => this.toggleAddModalTicket()}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-ticket">
                            Tambah Tiket
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleAddModalTicket()}
                            >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Formik initialValues={this.state.form}
                                onSubmit={(values, action) => {
                                    this.setAlertOpen(false)

                                    if (this.props.data) {
                                        const ticketForm: TicketCreate = {
                                            redeemCode: values.redeemCode,
                                            voucher: {
                                                id: this.props.data.id
                                            }
                                        }
    
                                        this.props.createTicketAction(ticketForm)
                                            .then( (response: ApiResponse<TicketCreateResult>) => {
                                                const data: ApiResponseSuccess<TicketCreateResult> = response.response!;
                                                
                                                this.toastNotify("Data Berhasil Ditambah", "error");
                                                this.toggleAddModalTicket();
                                                this.loadTicketVoucherList();
                                            })
                                            .catch( (error: ApiResponse<TicketCreateResult>) => {
                                                let message = "Gagal Mendapatkan Response";

                                                if (error.error) {
                                                    message = error.error.metaData.message;
                                                }

                                                this.toastNotify(message, "error");

                                                this.toggleAddModalTicket()
                                                action.setSubmitting(false)
                                            });
                                    } else {
                                        this.toastNotify("Data Gagal Ditambah", "error");
                                        this.toggleAddModalTicket()
                                        action.setSubmitting(false)
                                    }
                                }}
                                validationSchema={createSchema}>
                            {(FormikProps => {
                                return (
                                    <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST">
                                        <FormGroup>
                                            <label
                                            className="form-control-label"
                                            htmlFor="input-code"
                                            >
                                                Kode
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-code"
                                                placeholder="Kode"
                                                type="text"
                                                name="redeemCode"
                                                maxLength={255}
                                                value={FormikProps.values.redeemCode}
                                                required
                                                onChange={FormikProps.handleChange}
                                                onBlur={FormikProps.handleBlur}
                                                invalid={ !!(FormikProps.touched.redeemCode && FormikProps.errors.redeemCode) }
                                            />
                                            <div>
                                                {FormikProps.errors.redeemCode && FormikProps.touched.redeemCode ? FormikProps.errors.redeemCode : ''}
                                            </div>
                                        </FormGroup>
                                        <div className="text-right">
                                            <Button
                                                color="secondary"
                                                data-dismiss="modal"
                                                type="button"
                                                onClick={() => this.toggleAddModalTicket()}
                                            >
                                                Tutup
                                            </Button>
                                            <Button color="primary" type="button" onClick={() => {
                                                FormikProps.setSubmitting(true)
                                                FormikProps.submitForm();
                                            }} disabled={FormikProps.isSubmitting}>
                                                Tambah
                                            </Button>
                                        </div>
                                    </FormReactStrap>
                                );
                            })}
                        </Formik>
                    </div>
                </Modal>
            </>
        )
    }
}

interface LinkStateToProps {
    ticketVoucherList: Ticket[],
    paginate: Paginator,
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        ticketVoucherList: state.ticketVoucher.list,
        paginate: state.ticketVoucher.paginate,
    }
}

interface LinkDispatchToProps {
    fetchTicketVoucherAction: (page: number, id: number) => Promise<Boolean>,
    deleteTicketAction: (id: number) => Promise<ApiResponse<Ticket>>,
    createTicketAction: (ticket: TicketCreate) => Promise<ApiResponse<TicketCreateResult>>,
    editTicketAction: (ticket: TicketEdit, id: number) => Promise<ApiResponse<TicketEditResult>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListTicketProps): LinkDispatchToProps => {
    return {
        fetchTicketVoucherAction: (page: number, id: number) => dispatch(fetchTicketVoucherAction(page, id)),
        deleteTicketAction: (id: number) => dispatch(deleteTicketAction(id)),
        createTicketAction: (ticket: TicketCreate) => dispatch(createTicketAction(ticket)),
        editTicketAction: (ticket: TicketEdit, id: number) => dispatch(editTicketAction(ticket, id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListTicket))