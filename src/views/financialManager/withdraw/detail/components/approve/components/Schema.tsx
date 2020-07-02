import * as React from 'react'
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    image_preview: Yup.string().required("Bidang pilihan bukti foto wajib diisi"),
});