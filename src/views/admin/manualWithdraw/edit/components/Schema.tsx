import * as React from 'react'
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    amount: Yup.string()
    .matches(/^[0-9]*$/, "Wajib Diisi dengan angka") 
    .test('len', 'Bidang isian jumlah tidak boleh lebih dari 255 karakter', (val: any): boolean => {
        if (val) {
            return val.length <= 255;
        }

        return true;
    })
    .required('Bidang isian jumlah wajib diisi'),
    bank: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan bank wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan bank wajib diisi').required("Bidang pilihan bank wajib diisi")
    }),
    driverProfile: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan driver wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan driver wajib diisi').required("Bidang pilihan driver wajib diisi")
    }),
    bankName: Yup.string()
        .test('len', 'Bidang isian nama bank tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian nama bank wajib diiisi'),
    accountName: Yup.string()
             .test('len', 'Bidang isian nama akun tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
             .required('Bidang isian nama akun wajib diiisi'),
    accountNumber: Yup.string()
             .test('len', 'Bidang isian nomor akun tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
             .required('Bidang isian nomor akun wajib diiisi'),
});