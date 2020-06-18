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
    alternativeName: Yup.string()
            .test('len', 'Bidang isian nama alternatif tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nama alternatif wajib diiisi'),
    province: Yup.object().shape({
                label: Yup.string().required("Bidang pilihan province wajib diisi"),
                value: Yup.number().notOneOf([0], 'Bidang pilihan province wajib diisi').required("Bidang pilihan province wajib diisi")
            }),
});