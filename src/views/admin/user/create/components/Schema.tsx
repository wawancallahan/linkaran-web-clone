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
    roles: Yup.array()
                .min(1, "Bidang pilihan role wajib diisi")
                .of(
                    Yup.object().shape({
                        label: Yup.string().required('Bidang pilihan role wajib diisi'),
                        value: Yup.number().notOneOf([0], 'Bidang pilihan role wajib diisi').required('Bidang pilihan role wajib diisi')
                    })
                ).required("Bidang pilihan role wajib diisi"),
    telegramuser: Yup.string().nullable(true)
});