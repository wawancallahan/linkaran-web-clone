import * as React from 'react'
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    information: Yup.string()
            .required('Bidang isian informasi wajib diisi'),
});