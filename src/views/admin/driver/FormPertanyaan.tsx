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

    choiceOfActiveWorkHours = (choice: boolean, FormikProps: FormikProps<FormField>) => {
        FormikProps.setFieldValue('choiceOfActiveWorkHoursOther', choice)
    }

    render() {

        const { FormikProps } = this.props;

        return (
            <>
                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-wasOnceAnOnlineDriver"
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
                                id="wasOnceAnOnlineDriver_yes"
                                name="wasOnceAnOnlineDriver"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="wasOnceAnOnlineDriver_yes">
                                Sudah
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="wasOnceAnOnlineDriver_no"
                                name="wasOnceAnOnlineDriver"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="wasOnceAnOnlineDriver_no">
                                Belum
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.wasOnceAnOnlineDriver && FormikProps.touched.wasOnceAnOnlineDriver ? FormikProps.errors.wasOnceAnOnlineDriver : ''}
                    </div>
                </FormGroup>

                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-isActivelyBecomingAnotherOnlineDriver"
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
                                id="isActivelyBecomingAnotherOnlineDriver_yes"
                                name="isActivelyBecomingAnotherOnlineDriver"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="isActivelyBecomingAnotherOnlineDriver_yes">
                                Masih Aktif
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="isActivelyBecomingAnotherOnlineDriver_no"
                                name="isActivelyBecomingAnotherOnlineDriver"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="isActivelyBecomingAnotherOnlineDriver_no">
                                Sudah Tidak Aktif
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.isActivelyBecomingAnotherOnlineDriver && FormikProps.touched.isActivelyBecomingAnotherOnlineDriver ? FormikProps.errors.isActivelyBecomingAnotherOnlineDriver : ''}
                    </div>
                </FormGroup>

                 <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-isJoiningTheDriverCommunity"
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
                                id="isJoiningTheDriverCommunity_yes"
                                name="isJoiningTheDriverCommunity"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="isJoiningTheDriverCommunity_yes">
                                Masih Aktif
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="isJoiningTheDriverCommunity_no"
                                name="isJoiningTheDriverCommunity"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="isJoiningTheDriverCommunity_no">
                                Sudah Tidak Aktif
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.isJoiningTheDriverCommunity && FormikProps.touched.isJoiningTheDriverCommunity ? FormikProps.errors.isJoiningTheDriverCommunity : ''}
                    </div>
                </FormGroup>

                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-isJoiningLinkaranAsmainJob"
                    >
                        Apakah bergabung ke Linkaran sebagai pekerjaan utama atau sebagai sampingan?
                    </label>
                    <fieldset>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked
                                id="isJoiningLinkaranAsmainJob_yes"
                                name="isJoiningLinkaranAsmainJob"
                                type="radio"
                                value="1"
                            />
                            <label className="custom-control-label" htmlFor="isJoiningLinkaranAsmainJob_yes">
                                Pekerjaan Utama
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="isJoiningLinkaranAsmainJob_no"
                                name="isJoiningLinkaranAsmainJob"
                                type="radio"
                                value="0"
                            />
                            <label className="custom-control-label" htmlFor="isJoiningLinkaranAsmainJob_no">
                                Pekerjaan Sampingan
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.isJoiningLinkaranAsmainJob && FormikProps.touched.isJoiningLinkaranAsmainJob ? FormikProps.errors.isJoiningLinkaranAsmainJob : ''}
                    </div>
                </FormGroup>

                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-choiceOfActiveWorkHours"
                    >
                        Pilihlah jam kerja yang dikehendaki!
                    </label>
                    <fieldset>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked
                                id="choiceOfActiveWorkHours_0"
                                name="choiceOfActiveWorkHours"
                                type="radio"
                                value="0"
                                onChange={() => this.choiceOfActiveWorkHours(false, FormikProps)}
                            />
                            <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_0">
                                Sepanjang Waktu
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="choiceOfActiveWorkHours_1"
                                name="choiceOfActiveWorkHours"
                                type="radio"
                                value="1"
                                onChange={() => this.choiceOfActiveWorkHours(false, FormikProps)}
                            />
                            <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_1">
                                06:00 - 14:00
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="choiceOfActiveWorkHours_2"
                                name="choiceOfActiveWorkHours"
                                type="radio"
                                value="2"
                                onChange={() => this.choiceOfActiveWorkHours(false, FormikProps)}
                            />
                            <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_2">
                                14:00 - 22:00
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="choiceOfActiveWorkHours_3"
                                name="choiceOfActiveWorkHours"
                                type="radio"
                                value="3"
                                onChange={() => this.choiceOfActiveWorkHours(false, FormikProps)}
                            />
                            <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_3">
                                22:00 - 06:00
                            </label>
                        </div>

                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                id="choiceOfActiveWorkHours_4"
                                name="choiceOfActiveWorkHours"
                                type="radio"
                                value="4"
                                onChange={() => this.choiceOfActiveWorkHours(true, FormikProps)}
                            />
                            <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_4">
                                Waktu Lainnya
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.choiceOfActiveWorkHours && FormikProps.touched.choiceOfActiveWorkHours ? FormikProps.errors.choiceOfActiveWorkHours : ''}
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
                                dateFormat="HH:mm"
                                className="form-control form-control-alternative"
                                disabled={ ! FormikProps.values.choiceOfActiveWorkHoursOther}
                                required={FormikProps.values.choiceOfActiveWorkHoursOther}
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
                                dateFormat="HH:mm"
                                className="form-control form-control-alternative"
                                disabled={ ! FormikProps.values.choiceOfActiveWorkHoursOther}
                                required={FormikProps.values.choiceOfActiveWorkHoursOther}
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