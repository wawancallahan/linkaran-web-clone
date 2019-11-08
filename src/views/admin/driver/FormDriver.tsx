import React from 'react';

import {
    Button,
    FormGroup,
    Input,
} from 'reactstrap';

import { Formik, getIn, FormikProps } from 'formik';

import { Driver, FormField } from '../../../types/admin/driver';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import Dropzone from '../../../components/Dropzone/Dropzone';

const onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
    const file: {
        lastModified: number,
        name: string,
        preview: string,
        size: number,
        type: string
    } = files.length > 0 ? files[0] : null;

    if (file) {
        FormikProps.setFieldValue(setPreview, file.preview, true);
        FormikProps.setFieldValue(setValue, file);
    }
}

const FormDriver = (props: {
    FormikProps: FormikProps<FormField>
}) => {
    const { FormikProps } = props;

    return (
        <>
            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-nama"
                >
                    Nama
                </label>
                <Input
                className="form-control-alternative"
                id="input-nama"
                placeholder="Nama"
                type="text"
                name="nama"
                maxLength={255}
                value={FormikProps.values.nama}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.nama && FormikProps.errors.nama) }
                />
                <div>
                    {FormikProps.errors.nama && FormikProps.touched.nama ? FormikProps.errors.nama : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-no_telepon"
                >
                    No Telepon
                </label>
                <Input
                className="form-control-alternative"
                id="input-no_telepon"
                placeholder="No Telepon"
                type="text"
                name="no_telepon"
                maxLength={255}
                value={FormikProps.values.no_telepon}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.no_telepon && FormikProps.errors.no_telepon) }
                />
                <div>
                    {FormikProps.errors.no_telepon && FormikProps.touched.no_telepon ? FormikProps.errors.no_telepon : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-email"
                >
                    Email
                </label>
                <Input
                className="form-control-alternative"
                id="input-email"
                placeholder="Email"
                type="email"
                name="email"
                maxLength={255}
                value={FormikProps.values.email}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.email && FormikProps.errors.email) }
                />
                <div>
                    {FormikProps.errors.email && FormikProps.touched.email ? FormikProps.errors.email : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-tanggal-lahir"
                >
                    Tanggal Lahir
                </label>
                <div>
                <DatePicker
                    selected={FormikProps.values.tanggal_lahir}
                    onChange={date => FormikProps.setFieldValue('tanggal_lahir', date)}
                    onBlur={() => FormikProps.setFieldTouched('tanggal_lahir', true)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control form-control-alternative"
                    required
                    />
                </div>
                <div>
                    {FormikProps.errors.tanggal_lahir && FormikProps.touched.tanggal_lahir ? FormikProps.errors.tanggal_lahir : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-jenis-kelamin"
                >
                    Jenis Kelamin
                </label>
                <Input
                className="form-control-alternative"
                id="input-jenis_kelamin"
                placeholder="Jenis Kelamin"
                type="select"
                name="jenis_kelamin"
                value={FormikProps.values.jenis_kelamin || ''}
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.jenis_kelamin && FormikProps.errors.jenis_kelamin) }
                >
                    <option value="">Jenis Kelamin</option>
                    <option value="1">Laki Laki</option>
                    <option value="0">Perempuan</option>
                </Input>
                <div>
                    {FormikProps.errors.jenis_kelamin && FormikProps.touched.jenis_kelamin ? FormikProps.errors.jenis_kelamin : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-no-ktp"
                >
                    No KTP
                </label>
                <Input
                className="form-control-alternative"
                id="input-no_ktp"
                placeholder="No KTP"
                type="text"
                name="no_ktp"
                maxLength={255}
                value={FormikProps.values.no_ktp}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.no_ktp && FormikProps.errors.no_ktp) }
                />
                <div>
                    {FormikProps.errors.no_ktp && FormikProps.touched.no_ktp ? FormikProps.errors.no_ktp : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-upload-ktp"
                >
                    Upload KTP
                </label>
                <Dropzone onFilesAdded={(files: any[]) => {
                    onFilesAdded(files, FormikProps, 'ktp_file_preview', 'ktp_file');
                }} disabled={false} multiple={false} />
                
                <div>
                    {FormikProps.errors.ktp_file_preview && FormikProps.touched.ktp_file_preview ? FormikProps.errors.ktp_file_preview : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-no_sim"
                >
                    No SIM
                </label>
                <Input
                className="form-control-alternative"
                id="input-no_sim"
                placeholder="No SIM"
                type="text"
                name="no_sim"
                maxLength={255}
                value={FormikProps.values.no_sim}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.no_sim && FormikProps.errors.no_sim) }
                />
                <div>
                    {FormikProps.errors.no_sim && FormikProps.touched.no_sim ? FormikProps.errors.no_sim : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-upload-sim"
                >
                    Upload SIM
                </label>
                <Dropzone onFilesAdded={(files: any[]) => {
                    onFilesAdded(files, FormikProps, 'sim_file_preview', 'sim_file');
                }} disabled={false} multiple={false} />
                
                <div>
                    {FormikProps.errors.sim_file_preview && FormikProps.touched.sim_file_preview ? FormikProps.errors.sim_file_preview : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-alamat"
                >
                    Alamat
                </label>
                <Input
                className="form-control-alternative"
                id="input-alamat"
                placeholder="Alamat"
                type="textarea"
                name="alamat"
                maxLength={255}
                value={FormikProps.values.alamat}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.alamat && FormikProps.errors.alamat) }
                />
                <div>
                    {FormikProps.errors.alamat && FormikProps.touched.alamat ? FormikProps.errors.alamat : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-negara"
                >
                    Negara
                </label>
                <Input
                className="form-control-alternative"
                id="input-negara"
                placeholder="Negara"
                type="text"
                name="negara"
                maxLength={255}
                value={FormikProps.values.negara}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.negara && FormikProps.errors.negara) }
                />
                <div>
                    {FormikProps.errors.negara && FormikProps.touched.negara ? FormikProps.errors.negara : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-provinsi"
                >
                    Provinsi
                </label>
                <Input
                className="form-control-alternative"
                id="input-provinsi"
                placeholder="Provinsi"
                type="text"
                name="provinsi"
                maxLength={255}
                value={FormikProps.values.provinsi}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.provinsi && FormikProps.errors.provinsi) }
                />
                <div>
                    {FormikProps.errors.provinsi && FormikProps.touched.provinsi ? FormikProps.errors.provinsi : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-kabupaten_kota"
                >
                    Kabupaten/ Kota
                </label>
                <Input
                className="form-control-alternative"
                id="input-kabupaten_kota"
                placeholder="Kabupaten/ Kota"
                type="text"
                name="kabupaten_kota"
                maxLength={255}
                value={FormikProps.values.kabupaten_kota}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.kabupaten_kota && FormikProps.errors.kabupaten_kota) }
                />
                <div>
                    {FormikProps.errors.kabupaten_kota && FormikProps.touched.kabupaten_kota ? FormikProps.errors.kabupaten_kota : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-kecamatan"
                >
                    Kecamatan
                </label>
                <Input
                className="form-control-alternative"
                id="input-kecamatan"
                placeholder="Kecamatan"
                type="text"
                name="kecamatan"
                maxLength={255}
                value={FormikProps.values.kecamatan}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.kecamatan && FormikProps.errors.kecamatan) }
                />
                <div>
                    {FormikProps.errors.kecamatan && FormikProps.touched.kecamatan ? FormikProps.errors.kecamatan : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-kelurahan"
                >
                    Kelurahan
                </label>
                <Input
                className="form-control-alternative"
                id="input-kelurahan"
                placeholder="Kelurahan"
                type="text"
                name="kelurahan"
                maxLength={255}
                value={FormikProps.values.kelurahan}
                required
                onChange={FormikProps.handleChange}
                onBlur={FormikProps.handleBlur}
                invalid={ !!(FormikProps.touched.kelurahan && FormikProps.errors.kelurahan) }
                />
                <div>
                    {FormikProps.errors.kelurahan && FormikProps.touched.kelurahan ? FormikProps.errors.kelurahan : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-foto-profil"
                >
                    Upload Foto Profil
                </label>
                <Dropzone onFilesAdded={(files: any[]) => {
                    onFilesAdded(files, FormikProps, 'foto_profil_preview', 'foto_profil');
                }} disabled={false} multiple={false} />
                
                <div>
                    {FormikProps.errors.foto_profil_preview && FormikProps.touched.foto_profil_preview ? FormikProps.errors.foto_profil_preview : ''}
                </div>
            </FormGroup>
        </>
    )
}

export default FormDriver;