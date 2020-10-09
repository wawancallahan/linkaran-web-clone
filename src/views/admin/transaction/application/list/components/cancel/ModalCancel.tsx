import * as React from 'react'
import { Form, Modal, FormGroup, Button, Input } from 'reactstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../../types'
import { cancelOrderAction, setAlertApplicationShowAction } from '../../../../../../../actions/admin/transaction/application'
import swal from 'sweetalert'
import { ApiResponse } from '../../../../../../../types/api'
import { Application } from '../../../../../../../types/admin/transaction/application'
import queryString from 'query-string'

type OwnProps = RouteComponentProps & {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    numberTransaction: string,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

type FormField = {
    description: string
}

const Schema = Yup.object().shape({
    description: Yup.string()
            .test('len', 'Bidang isian deskripsi tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian deskripsi wajib diisi'),
})

const ModalCancel: React.FC<Props> = (props) => {

    const [formField, setFormField] = React.useState<FormField>({
        description: ''
    })

    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={props.modalVisible}
            toggle={() => props.setModalVisible( ! props.modalVisible)}
            >
            <div className="modal-header">
                <h5 className="modal-title" id="modal-ticket">
                    Batalkan Transaksi
                </h5>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => props.setModalVisible( ! props.modalVisible)}
                    >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <Formik 
                    initialValues={formField}
                    onSubmit={(values, action) => {
                        swal("Apakah anda yakin?", "Data Order yang dibatalkan tidak dapat dikembalikan!", {
                            dangerMode: true,
                            buttons: ["Tutup!", true],
                            icon: "warning",
                        }).then((willDelete) => {
                            if (willDelete) {
                                props.setLoader(true)
                                props.cancelOrderAction(props.numberTransaction, values.description)
                                .then((response: ApiResponse<Application>) => {
                                    props.setAlertApplicationShowAction("Data Order Berhasil Dibatalkan", 'success');
                
                                    const querySearch = queryString.parse(props.location.search)
                                    querySearch.page = "1"
                
                                    props.history.push({
                                        pathname: props.location.pathname,
                                        search: queryString.stringify(querySearch)
                                    });
                                    props.fetch(1);
                                    props.setLoader(false);
                                })
                                .catch( (error: ApiResponse<Application>) => {
                                    props.setLoader(false)
                
                                    props.setAlertApplicationShowAction(error.error!.metaData.message, 'danger');
                                });
                            }
                        })
                    }}
                    validationSchema={Schema}>
                    {(FormikProps => {
                        return (
                            <Form onSubmit={FormikProps.handleSubmit} formMethod="POST">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-description"
                                    >
                                        Deskripsi
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-description"
                                        placeholder="Deskripsi"
                                        type="textarea"
                                        name="description"
                                        maxLength={255}
                                        value={FormikProps.values.description}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.description && FormikProps.errors.description) }
                                    />
                                    <div>
                                        {FormikProps.errors.description && FormikProps.touched.description ? FormikProps.errors.description : ''}
                                    </div>
                                </FormGroup>
                                <div className="text-right">
                                    <Button
                                        color="secondary"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => props.setModalVisible( ! props.modalVisible)}
                                    >
                                        Tutup
                                    </Button>
                                    <Button color="primary" type="button" onClick={() => {
                                        FormikProps.setSubmitting(true)
                                        FormikProps.submitForm();
                                    }} disabled={FormikProps.isSubmitting}>
                                        Ya, Batalkan
                                    </Button>
                                </div>
                            </Form>
                        );
                    })}
                </Formik>
            </div>
        </Modal>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    cancelOrderAction: (numberTransaction: string, description: string) => dispatch(cancelOrderAction(numberTransaction, description)),
    setAlertApplicationShowAction: (message: string, color: string) => dispatch(setAlertApplicationShowAction(message, color)),
});

export default withRouter(connect(null, mapDispatchToProps)(ModalCancel))