import * as React from 'react'
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    price: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan harga wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan harga wajib diisi').required("Bidang pilihan harga wajib diisi")
    }),
    driverPaymentDeductions: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
        .test('len', 'Bidang isian pengurangan pembayaran driver tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian pengurangan pembayaran driver wajib diisi'),
    servicePaymentDeductions: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
        .test('len', 'Bidang isian pengurangan pembayaran layanan tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian pengurangan pembayaran layanan wajib diisi'),
    maxDriverDistanceRadius: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
        .test('len', 'Bidang isian radius maksimal jarak driver tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian radius maksimal jarak driver wajib diisi'),
    district: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan wilayah wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan wilayah wajib diisi').required("Bidang pilihan wilayah wajib diisi")
    }),
    service: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan layanan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan layanan wajib diisi').required("Bidang pilihan layanan wajib diisi")
    }),
    vehicleType: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan jenis kendaraan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan jenis kendaraan wajib diisi').required("Bidang pilihan jenis kendaraan wajib diisi")
    })
});