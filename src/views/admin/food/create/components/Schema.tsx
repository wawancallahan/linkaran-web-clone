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
    price: Yup.number()
            .min(0, 'Bidang isian harga tidak boleh kurang dari 0')
            .required('Bidang isian harga wajib diisi'),
    description: Yup.string()
                    .required('Bidang isian deskripsi wajib diisi'),
    rating: Yup.number()
                .min(0, 'Bidang isian rating tidak boleh kurang dari 0')
                .max(100, 'Bidang isian rating tidak boleh lebih dari 100')
                .required('Bidang isian rating wajib diisi'),
    foodCategory: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan kategori makanan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan kategori makanan wajib diisi').required("Bidang pilihan kategori makanan wajib diisi")
    }),
    restaurant: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan restaurant wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan restaurant wajib diisi').required("Bidang pilihan restaurant wajib diisi")
    }),
    status: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan restaurant wajib diisi"),
        value: Yup.string().required("Bidang pilihan restaurant wajib diisi")
    }),
    image_preview: Yup.string().nullable()
});