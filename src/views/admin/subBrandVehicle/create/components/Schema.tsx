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
    brandVehicle: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan brand vehicle wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan brand vehicle wajib diisi').required("Bidang pilihan brand vehicle wajib diisi")
    })
});