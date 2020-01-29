import React, { Component } from 'react'

import {
    FormGroup,
    Row,
    Col
} from 'reactstrap'

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css"

import { FormikProps } from 'formik'
import { FormField } from '../../../types/admin/restaurant'
import { midnightDate } from '../../../helpers/parseData';

type FormDayProps = {
    FormikProps: FormikProps<FormField>,
    FormikPropsValuesDateStart: Date | null,
    FormikPropsValuesDateEnd: Date | null,
    FormikPropsValuesIsClosed: boolean,
    FormikSetValuesDateStart: string,
    FormikSetValuesDateEnd: string,
    FormikSetValuesIsClosed: string,
    name: string,
    id: number
};

type Props = FormDayProps;

class FormDay extends Component<Props> {

    toggleDateClose = (FormikProps: FormikProps<FormField>, field: string, prevValues: boolean, fieldDateStart: string, fieldDateEnd: string) => {
        FormikProps.setFieldValue(field, ! prevValues)

        if ( ! prevValues) {
            FormikProps.setFieldValue(fieldDateStart, midnightDate())
            FormikProps.setFieldValue(fieldDateEnd, midnightDate())
        }
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
                            <DatePicker
                                selected={FormikPropsValuesDateStart}
                                onChange={date => FormikProps.setFieldValue(FormikSetValuesDateStart, date)}
                                onBlur={() => FormikProps.setFieldTouched(FormikSetValuesDateStart, true)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                className="form-control form-control-alternative"
                                placeholderText="Waktu Buka"
                                disabled={FormikPropsValuesIsClosed}
                                onChangeRaw={this.handleDateChangeRaw}
                                required
                            />
                        </div>

                        <div className="d-inline-block ml-3">
                            <DatePicker
                                selected={FormikPropsValuesDateEnd}
                                onChange={date => FormikProps.setFieldValue(FormikSetValuesDateEnd, date)}
                                onBlur={() => FormikProps.setFieldTouched(FormikSetValuesDateEnd, true)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                className="form-control form-control-alternative"
                                placeholderText="Waktu Tutup"
                                disabled={FormikPropsValuesIsClosed}
                                onChangeRaw={this.handleDateChangeRaw}
                                required
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

export default FormDay