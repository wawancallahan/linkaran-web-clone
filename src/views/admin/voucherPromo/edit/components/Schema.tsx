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
            .required('Bidang isian nama wajib diisi'),
    code: Yup.string()
            .test('len', 'Bidang isian kode tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian kode wajib diisi'),
    description: Yup.string()
            .test('len', 'Bidang isian deskripsi tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian deskripsi wajib diisi'),
    amount: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian nominal tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nominal wajib diisi'),
    minimumPurchase: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian minimal pembelian tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian minimal pembelian wajib diisi'),
    quota: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian kouta tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian kouta wajib diisi'),
    quantity: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian jumlah penggunaan tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian jumlah penggunaan wajib diisi'),
    image_preview: Yup.string()
             .required('Bidang upload foto wajib diisi'),
    service: Yup.array()
            .min(1, "Bidang pilihan layanan wajib diisi")
            .of(
                Yup.object().shape({
                    label: Yup.string().required('Bidang pilihan layanan wajib diisi'),
                    value: Yup.number().notOneOf([0], 'Bidang pilihan layanan wajib diisi').required('Bidang pilihan layanan wajib diisi')
                })
            ).required("Bidang pilihan layanan wajib diisi"),
    voucherType: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan tipe voucher wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan tipe voucher wajib diisi').required("Bidang pilihan tipe voucher wajib diisi")
    }),
    isLimited: Yup.string().required('Bidang pilihan target pengunaan wajib diisi'),
    isAutoSet: Yup.string().required('Bidang pilihan auto set wajib diisi')
});