import * as React from 'react'
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    nama: Yup.string()
        .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian nama wajib diiisi'),
    bankName: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
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