import * as React from 'react'

import {
    FormGroup,
    Row,
    Col
} from 'reactstrap';
import { FormikProps } from 'formik';
import { FormField } from '../../../../../../../types/admin/driver';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type OwnProps = {
    form: FormikProps<FormField>,
};

type Props = OwnProps;

const Pertanyaan: React.FC<Props> = (props) => {
    const  choiceOfActiveWorkHours = (choice: boolean, formikProps: FormikProps<FormField>) => {
        formikProps.setFieldValue('choiceOfActiveWorkHoursOther', choice)
    }

    const { form } = props;

    return (
        <React.Fragment>
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
                            defaultChecked={form.values.wasOnceAnOnlineDriver == '1'}
                            id="wasOnceAnOnlineDriver_yes"
                            name="wasOnceAnOnlineDriver"
                            type="radio"
                            value="1"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="wasOnceAnOnlineDriver_yes">
                            Sudah
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.wasOnceAnOnlineDriver == '0'}
                            id="wasOnceAnOnlineDriver_no"
                            name="wasOnceAnOnlineDriver"
                            type="radio"
                            value="0"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="wasOnceAnOnlineDriver_no">
                            Belum
                        </label>
                    </div>
                </fieldset>
                <div>
                    {form.errors.wasOnceAnOnlineDriver && form.touched.wasOnceAnOnlineDriver ? form.errors.wasOnceAnOnlineDriver : ''}
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
                            defaultChecked={form.values.isActivelyBecomingAnotherOnlineDriver == '1'}
                            id="isActivelyBecomingAnotherOnlineDriver_yes"
                            name="isActivelyBecomingAnotherOnlineDriver"
                            type="radio"
                            value="1"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isActivelyBecomingAnotherOnlineDriver_yes">
                            Masih Aktif
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.isActivelyBecomingAnotherOnlineDriver == '0'}
                            id="isActivelyBecomingAnotherOnlineDriver_no"
                            name="isActivelyBecomingAnotherOnlineDriver"
                            type="radio"
                            value="0"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isActivelyBecomingAnotherOnlineDriver_no">
                            Sudah Tidak Aktif
                        </label>
                    </div>
                </fieldset>
                <div>
                    {form.errors.isActivelyBecomingAnotherOnlineDriver && form.touched.isActivelyBecomingAnotherOnlineDriver ? form.errors.isActivelyBecomingAnotherOnlineDriver : ''}
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
                            defaultChecked={form.values.isJoiningTheDriverCommunity == '1'}
                            id="isJoiningTheDriverCommunity_yes"
                            name="isJoiningTheDriverCommunity"
                            type="radio"
                            value="1"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isJoiningTheDriverCommunity_yes">
                            Masih Aktif
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.isJoiningTheDriverCommunity == '0'}
                            id="isJoiningTheDriverCommunity_no"
                            name="isJoiningTheDriverCommunity"
                            type="radio"
                            value="0"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isJoiningTheDriverCommunity_no">
                            Sudah Tidak Aktif
                        </label>
                    </div>
                </fieldset>
                <div>
                    {form.errors.isJoiningTheDriverCommunity && form.touched.isJoiningTheDriverCommunity ? form.errors.isJoiningTheDriverCommunity : ''}
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
                            defaultChecked={form.values.isJoiningLinkaranAsmainJob == '1'}
                            id="isJoiningLinkaranAsmainJob_yes"
                            name="isJoiningLinkaranAsmainJob"
                            type="radio"
                            value="1"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isJoiningLinkaranAsmainJob_yes">
                            Pekerjaan Utama
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.isJoiningLinkaranAsmainJob == '0'}
                            id="isJoiningLinkaranAsmainJob_no"
                            name="isJoiningLinkaranAsmainJob"
                            type="radio"
                            value="0"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isJoiningLinkaranAsmainJob_no">
                            Pekerjaan Sampingan
                        </label>
                    </div>
                </fieldset>
                <div>
                    {form.errors.isJoiningLinkaranAsmainJob && form.touched.isJoiningLinkaranAsmainJob ? form.errors.isJoiningLinkaranAsmainJob : ''}
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
                            defaultChecked={form.values.choiceOfActiveWorkHours == '0'}
                            id="choiceOfActiveWorkHours_0"
                            name="choiceOfActiveWorkHours"
                            type="radio"
                            value="0"
                            onChange={() => choiceOfActiveWorkHours(false, form)}
                        />
                        <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_0">
                            Sepanjang Waktu
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.choiceOfActiveWorkHours == '1'}
                            id="choiceOfActiveWorkHours_1"
                            name="choiceOfActiveWorkHours"
                            type="radio"
                            value="1"
                            onChange={() => choiceOfActiveWorkHours(false, form)}
                        />
                        <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_1">
                            06:00 - 14:00
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.choiceOfActiveWorkHours == '2'}
                            id="choiceOfActiveWorkHours_2"
                            name="choiceOfActiveWorkHours"
                            type="radio"
                            value="2"
                            onChange={() => choiceOfActiveWorkHours(false, form)}
                        />
                        <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_2">
                            14:00 - 22:00
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.choiceOfActiveWorkHours == '3'}
                            id="choiceOfActiveWorkHours_3"
                            name="choiceOfActiveWorkHours"
                            type="radio"
                            value="3"
                            onChange={() => choiceOfActiveWorkHours(false, form)}
                        />
                        <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_3">
                            22:00 - 06:00
                        </label>
                    </div>

                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.choiceOfActiveWorkHours == '4'}
                            id="choiceOfActiveWorkHours_4"
                            name="choiceOfActiveWorkHours"
                            type="radio"
                            value="4"
                            onChange={() => choiceOfActiveWorkHours(true, form)}
                        />
                        <label className="custom-control-label" htmlFor="choiceOfActiveWorkHours_4">
                            Waktu Lainnya
                        </label>
                    </div>
                </fieldset>
                <div>
                    {form.errors.choiceOfActiveWorkHours && form.touched.choiceOfActiveWorkHours ? form.errors.choiceOfActiveWorkHours : ''}
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
                            selected={form.values.custom_interval_jam_kerja_start}
                            onChange={date => form.setFieldValue('custom_interval_jam_kerja_start', date)}
                            onBlur={() => form.setFieldTouched('custom_interval_jam_kerja_start', true)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            className="form-control form-control-alternative"
                            disabled={ ! form.values.choiceOfActiveWorkHoursOther}
                            required={form.values.choiceOfActiveWorkHoursOther}
                            />
                    </Col>
                    <Col className="react-datepicker-w100">
                        <DatePicker
                            selected={form.values.custom_interval_jam_kerja_end}
                            onChange={date => form.setFieldValue('custom_interval_jam_kerja_end', date)}
                            onBlur={() => form.setFieldTouched('custom_interval_jam_kerja_end', true)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            className="form-control form-control-alternative"
                            disabled={ ! form.values.choiceOfActiveWorkHoursOther}
                            required={form.values.choiceOfActiveWorkHoursOther}
                            />
                    </Col>
                </Row>
                <div>
                    {form.errors.custom_interval_jam_kerja_end && form.touched.custom_interval_jam_kerja_end ? form.errors.custom_interval_jam_kerja_end : ''}
                </div>
            </FormGroup>       
        </React.Fragment>
    )
}

export default Pertanyaan;