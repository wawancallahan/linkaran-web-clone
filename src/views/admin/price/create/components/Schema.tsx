import * as React from 'react'
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    basePrice: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
        .test('len', 'Bidang isian harga dasar tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian harga dasar wajib diisi'),
    perKilometer: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
        .test('len', 'Bidang isian harga per kilometer tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian harga per kilometer wajib diisi'),
    minKm: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
        .test('len', 'Bidang isian minimal jarak tempuh tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian minimal jarak tempuh wajib diisi')
});