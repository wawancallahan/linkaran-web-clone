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
    district: Yup.object().shape({
                label: Yup.string().required("Bidang pilihan district wajib diisi"),
                value: Yup.number().notOneOf([0], 'Bidang pilihan district wajib diisi').required("Bidang pilihan district wajib diisi")
            }),
});