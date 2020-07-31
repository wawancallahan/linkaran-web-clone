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
    address: Yup.string()
             .required('Bidang isian alamat wajib diiisi'),
    point: Yup.string()
            .matches(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/, "Wajib diisi dengan lokasi lat,lng")
            .required('Bidang isian point wajib diisi'),
    rating: Yup.number()
             .min(0, 'Bidang isian rating tidak boleh kurang dari 0')
             .required('Bidang isian rating wajib diiisi'),
    photo_preview: Yup.string().nullable(),
    district: Yup.object().shape({
                label: Yup.string().required("Bidang pilihan district wajib diisi"),
                value: Yup.number().notOneOf([0], 'Bidang pilihan district wajib diisi').required("Bidang pilihan district wajib diisi")
            }),
    phoneNumber: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian no telepon tidak boleh lebih dari 16 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 16;
                }

                return true;
            })
            .required('Bidang isian no telepon wajib diisi'),
});