import * as React from 'react';
import {
    FormGroup,
    Input,
} from 'reactstrap';
import { FormikProps } from 'formik';
import { FormFieldFromCustomer } from '../../../../types/admin/driver';

type OwnProps = {
    form: FormikProps<FormFieldFromCustomer>,
};

type Props = OwnProps;

const Status: React.FC<Props> = (props) => {
    const { form } = props

    return (
        <React.Fragment>
            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-driverHelpCenter"
                >
                    Pusat Bantuan Pengemudi
                </label>
            </FormGroup>
            <FormGroup>
                <fieldset>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={ ! form.values.driverHelpCenter}
                            id="driverHelpCenter_no"
                            name="driverHelpCenter"
                            type="radio"
                            value="0"
                            onChange={() => {
                                form.setFieldValue('driverHelpCenter', false, true);
                            }}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="driverHelpCenter_no">
                            Tidak
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.driverHelpCenter}
                            id="driverHelpCenter_yes"
                            name="driverHelpCenter"
                            type="radio"
                            value="1"
                            onChange={() => {
                                form.setFieldValue('driverHelpCenter', true, true);
                            }}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="driverHelpCenter_yes">
                            Ya
                        </label>
                    </div>
                </fieldset>
                <div>
                    {form.errors.driverHelpCenter && form.touched.driverHelpCenter ? form.errors.driverHelpCenter : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-isActive"
                >
                    Status Aktif
                </label>
            </FormGroup>
            <FormGroup>
                <fieldset>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={ ! form.values.isActive}
                            id="isActive_no"
                            name="isActive"
                            type="radio"
                            value="0"
                            onChange={() => {
                                form.setFieldValue('isActive', false, true);
                            }}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isActive_no">
                            Tidak
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.isActive}
                            id="isActive_yes"
                            name="isActive"
                            type="radio"
                            value="1"
                            onChange={() => {
                                form.setFieldValue('isActive', true, true);
                            }}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isActive_yes">
                            Ya
                        </label>
                    </div>
                </fieldset>
                <div>
                    {form.errors.isActive && form.touched.isActive ? form.errors.isActive : ''}
                </div>
            </FormGroup>
        </React.Fragment>
    );
}

export default Status