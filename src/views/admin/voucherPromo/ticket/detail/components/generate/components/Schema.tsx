import * as React from 'react'
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    redeemCode: Yup.string()
            .test('len', 'Bidang isian kode tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian kode wajib diisi'),
});