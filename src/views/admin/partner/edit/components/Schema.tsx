import * as React from 'react'
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    name: Yup.string()
            .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nama wajib diiisi'),
    phoneNumber: Yup.string()
            .required('Bidang isian no telepon wajib diiisi'),
    email: Yup.string()
            .email('Bidang isian harus berupa email')
            .required('Bidang isian email wajib diiisi'),
    companyName: Yup.string()
            .test('len', 'Bidang isian nama perusahaan tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nama perusahaan wajib diiisi'),
    secret: Yup.string()
            .test('len', 'Bidang isian kode rahasia tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian kode rahasia wajib diiisi'),
    startWorkingTogether: Yup.mixed().required('Bidang isian waktu mulai wajib diisi'),
    endWorkingTogether: Yup.mixed().required('Bidang isian waktu berakhir wajib diisi'),
    ips: Yup.array()
        .of(
            Yup.string()
                .required('Bidang isian ips tidak boleh kosong')
                .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                    if (val) {
                        return val.length <= 255;
                    }
    
                    return true;
                })
        )
});