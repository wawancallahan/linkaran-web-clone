import React, { Component } from 'react'

import {
    Button,
    FormGroup,
    Input,
    Row,
    Col
} from 'reactstrap';
import { Formik, getIn, FormikProps } from 'formik';
import { FormField } from '../../../types/admin/driver';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type FormPertanyaanProps = {
    FormikProps: FormikProps<FormField>,
};

type Props = FormPertanyaanProps;

class FormPertanyaan extends Component<Props> {
    render() {

        const { FormikProps } = this.props;

        return (
            <>
                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-pertanyaan_1"
                    >
                        Apakah saat ini sudah pernah menjadi driver pada aplikator lain?
                    </label>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked
                                id="pertanyaan_1_yes"
                                name="pertanyaan_1"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_1_yes">
                                Sudah
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="pertanyaan_1_no"
                                name="pertanyaan_1"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_1_no">
                                Belum
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.pertanyaan_1 && FormikProps.touched.pertanyaan_1 ? FormikProps.errors.pertanyaan_1 : ''}
                    </div>
                </FormGroup>

                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-pertanyaan_1"
                    >
                        Apakah saat ini masih aktif menjadi driver pada aplikator lain?
                    </label>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked
                                id="pertanyaan_2_yes"
                                name="pertanyaan_2"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_2_yes">
                                Masih Aktif
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="pertanyaan_2_no"
                                name="pertanyaan_2"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_2_no">
                                Sudah Tidak Aktif
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.pertanyaan_2 && FormikProps.touched.pertanyaan_2 ? FormikProps.errors.pertanyaan_2 : ''}
                    </div>
                </FormGroup>

                 <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-pertanyaan_3"
                    >
                        Apakah anda bergabung ke komunitas driver?
                    </label>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked
                                id="pertanyaan_3_yes"
                                name="pertanyaan_3"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_3_yes">
                                Masih Aktif
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="pertanyaan_3_no"
                                name="pertanyaan_3"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_3_no">
                                Sudah Tidak Aktif
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.pertanyaan_3 && FormikProps.touched.pertanyaan_3 ? FormikProps.errors.pertanyaan_3 : ''}
                    </div>
                </FormGroup>

                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-pertanyaan_1"
                    >
                        Apakah saat ini sudah pernah menjadi driver pada aplikator lain?
                    </label>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked
                                id="pertanyaan_1_yes"
                                name="pertanyaan_1"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_1_yes">
                                Sudah
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="pertanyaan_1_no"
                                name="pertanyaan_1"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_1_no">
                                Belum
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.pertanyaan_1 && FormikProps.touched.pertanyaan_1 ? FormikProps.errors.pertanyaan_1 : ''}
                    </div>
                </FormGroup>

                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-pertanyaan_4"
                    >
                        Apakah bergabung ke Linkaran sebagai pekerjaan utama atau sebagai sampingan?
                    </label>
                    <fieldset>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked
                                id="pertanyaan_4_yes"
                                name="pertanyaan_4"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_4_yes">
                                Pekerjaan Utama
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="pertanyaan_4_no"
                                name="pertanyaan_4"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_4_no">
                                Pekerjaan Sampingan
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.pertanyaan_4 && FormikProps.touched.pertanyaan_4 ? FormikProps.errors.pertanyaan_4 : ''}
                    </div>
                </FormGroup>

                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-pertanyaan_5"
                    >
                        Pilihlah jam kerja yang dikehendaki!
                    </label>
                    <fieldset>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked
                                id="pertanyaan_5_1"
                                name="pertanyaan_5"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_5_1">
                                Sepanjang Waktu
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="pertanyaan_5_2"
                                name="pertanyaan_5"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_5_2">
                                06:00 - 14:00
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="pertanyaan_5_3"
                                name="pertanyaan_5"
                                type="radio"
                                value="2"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_5_3">
                                14:00 - 22:00
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="pertanyaan_5_4"
                                name="pertanyaan_5"
                                type="radio"
                                value="3"
                            />
                            <label className="custom-control-label" htmlFor="pertanyaan_5_4">
                                22:00 - 06:00
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.pertanyaan_5 && FormikProps.touched.pertanyaan_5 ? FormikProps.errors.pertanyaan_5 : ''}
                    </div>
                </FormGroup>
                
                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-custom_interval_jam_kerja"
                    >
                        Jika interval waktu di atas tidak ada yang menggambarkan keinginan/rencana anda, tuliskan rencana jam kerja aktif yang dikehendaki!
                    </label>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col className="react-datepicker-w100">
                            <DatePicker
                                selected={FormikProps.values.custom_interval_jam_kerja_start}
                                onChange={date => FormikProps.setFieldValue('custom_interval_jam_kerja_start', date)}
                                onBlur={() => FormikProps.setFieldTouched('custom_interval_jam_kerja_start', true)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                className="form-control form-control-alternative"
                                required
                                />
                        </Col>
                        <Col className="react-datepicker-w100">
                            <DatePicker
                                selected={FormikProps.values.custom_interval_jam_kerja_end}
                                onChange={date => FormikProps.setFieldValue('custom_interval_jam_kerja_end', date)}
                                onBlur={() => FormikProps.setFieldTouched('custom_interval_jam_kerja_end', true)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                className="form-control form-control-alternative"
                                required
                                />
                        </Col>
                    </Row>
                    <div>
                        {FormikProps.errors.custom_interval_jam_kerja_end && FormikProps.touched.custom_interval_jam_kerja_end ? FormikProps.errors.custom_interval_jam_kerja_end : ''}
                    </div>
                </FormGroup>
            </>
        )
    }
}

export default FormPertanyaan;