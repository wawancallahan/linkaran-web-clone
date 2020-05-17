import React, { Component } from 'react'

import {
    FormGroup,
    Row,
    Col
} from 'reactstrap'

import { FormikProps } from 'formik'
import { FormField } from '../../../types/admin/restaurant'
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import TimePicker from 'react-time-picker'
import './FormTimeManual.css'

type FormTimeManualProps = {
    FormikProps: FormikProps<FormField>,
    FormikPropsValuesDateStart: string | null,
    FormikPropsValuesDateEnd: string | null,
    FormikPropsValuesIsClosed: boolean,
    FormikSetValuesDateStart: string,
    FormikSetValuesDateEnd: string,
    FormikSetValuesIsClosed: string,
    name: string,
    id: number
};

type Props = FormTimeManualProps;

class FormTimeManual extends Component<Props> {

    toggleDateClose = (FormikProps: FormikProps<FormField>, field: string, prevValues: boolean, fieldDateStart: string, fieldDateEnd: string) => {
        FormikProps.setFieldValue(field, ! prevValues)

        // if ( ! prevValues) {
        //     FormikProps.setFieldValue(fieldDateStart, '00:00')
        //     FormikProps.setFieldValue(fieldDateEnd, '00:00')
        // }
    }

    handleDateChangeRaw = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
    }

    render () {

        const { id, name, FormikProps, FormikPropsValuesDateStart, FormikPropsValuesDateEnd, FormikPropsValuesIsClosed, FormikSetValuesIsClosed, FormikSetValuesDateStart, FormikSetValuesDateEnd } = this.props

        return (
            <FormGroup>
                <Row>
                    <Col md={3}>
                        <label
                        className="form-control-label"
                        htmlFor={`input-${name}`}
                        >
                            {name}
                        </label>
                    </Col>
                    <Col md={9}>

                        <div className="d-inline-block">
                           <TimePicker 
                                value={FormikPropsValuesDateStart || ''} 
                                isOpen={false} 
                                clockIcon={null} 
                                clearIcon={null} 
                                disableClock={true} 
                                required={true} 
                                disabled={FormikPropsValuesIsClosed}
                                onChange={(value) => {
                                    FormikProps.setFieldValue(FormikSetValuesDateStart, value)
                                    FormikProps.setFieldTouched(FormikSetValuesDateStart, true)
                                }}
                                className={"form-control form-time-manual"}
                           />
                        </div>

                        <div className="d-inline-block ml-3">
                            <TimePicker 
                                value={FormikPropsValuesDateEnd || ''} 
                                isOpen={false} 
                                clockIcon={null} 
                                clearIcon={null} 
                                disableClock={true} 
                                required={true} 
                                disabled={FormikPropsValuesIsClosed}
                                onChange={(value) => {
                                    FormikProps.setFieldValue(FormikSetValuesDateEnd, value)
                                    FormikProps.setFieldTouched(FormikSetValuesDateEnd, true)
                                }} 
                                className={"form-control form-time-manual"}
                            />
                        </div>

                        <div className="d-inline-block ml-3">
                            <div className="custom-control custom-checkbox mb-3">
                                <input
                                    className="custom-control-input"
                                    id={`day_close_${id}`}
                                    name={`day_close_${id}`}
                                    type="checkbox"
                                    defaultChecked={FormikPropsValuesIsClosed}
                                    onChange={() => this.toggleDateClose(FormikProps, FormikSetValuesIsClosed, FormikPropsValuesIsClosed, FormikSetValuesDateStart, FormikSetValuesDateEnd)}
                                />
                                <label className="custom-control-label" htmlFor={`day_close_${id}`}>
                                    Tutup
                                </label>
                            </div>
                        </div>
                        
                    </Col>
                </Row>
            </FormGroup>
        )
    }
}

export default FormTimeManual