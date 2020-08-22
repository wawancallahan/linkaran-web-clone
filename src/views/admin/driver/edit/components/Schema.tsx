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
                .required('Bidang isian nama wajib diisi'),
    no_telepon: Yup.string()
                .required('Bidang isian no telepon wajib diisi'),
    email: Yup.string()
                .email('Bidang isian harus berupa email')
                .required('Bidang isian email wajib diisi'),
    jenis_kelamin: Yup.number()
                      .oneOf([0, 1], 'Bidang pilihan jenis kelamin wajib diisi')
                      .required('Bidang pilihan jenis kelamin wajib diisi'),
    tempat_lahir: Yup.string()
                    .test('len', 'Bidang isian tempat lahir tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                        if (val) {
                            return val.length <= 255;
                        }

                        return true;
                    })
                    .required('Bidang isian tempat lahir wajib diisi'),
    no_ktp: Yup.string()
                .test('len', 'Bidang isian no ktp tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                    if (val) {
                        return val.length <= 255;
                    }

                    return true;
                })
                .required('Bidang isian no ktp wajib diisi'),
    // ktp_file: File | null,
    ktp_file_preview: Yup.string()
                        .required('Bidang upload ktp wajib diisi'),
    foto_profil_preview: Yup.string()
                        .required('Bidang upload foto profil wajib diisi'),
    // no_sim: Yup.string()
    //             .length(255, 'Bidang isian no sim tidak boleh lebih dari 255 karakter')
    //             .required('Bidang isian no sim wajib diisi'),
    // sim_file: File | null,
    alamat: Yup.string()
                .required('Bidang isian alamat wajib diisi'),
    alamat_domisili: Yup.string()
                .required('Bidang isian alamat domisili wajib diisi'),
    negara: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan negara wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan negara wajib diisi').required("Bidang pilihan negara wajib diisi")
    }),
    provinsi: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan provinsi wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan provinsi wajib diisi').required("Bidang pilihan provinsi wajib diisi")
    }),
    kabupaten_kota: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan kabupaten/kota wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan kabupaten/kota wajib diisi').required("Bidang pilihan kabupaten/kota wajib diisi")
    }),
    kecamatan: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan kecamatan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan kecamatan wajib diisi').required("Bidang pilihan kecamatan wajib diisi")
    }),
    kelurahan: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan kelurahan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan kelurahan wajib diisi').required("Bidang pilihan kelurahan wajib diisi")
    }),
    // rating: Yup.number().required('Bidang isian rating wajib diiisi'),
    // foto_profil: File | null,
    tipe_kendaraan: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan tipe kendaraan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan tipe kendaraan wajib diisi').required("Bidang pilihan tipe kendaraan wajib diisi")
    }),
    merek: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan merek wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan merek wajib diisi').required("Bidang pilihan merek wajib diisi")
    }),
    no_stnk: Yup.string()
                .test('len', 'Bidang isian no stnk tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
                .required('Bidang isian no stnk wajib diisi'),
    no_polisi: Yup.string()
                    .test('len', 'Bidang isian no polisi tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
                    .required('Bidang isian no polisi wajib diisi'),
    no_rangka: Yup.string()
                    .test('len', 'Bidang isian no rangka tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
                    .required('Bidang isian no rangka wajib diisi'),
    // jumlah_seat: Yup.number()
    //             .min(1, 'Bidang isian jumal seat minimal 1')
    //             .required('Bidang isian jumlah seat wajib diisi'),
    warna: Yup.string()
                .test('len', 'Bidang isian warna tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                    if (val) {
                        return val.length <= 255;
                    }

                    return true;
                })
                .required('Bidang isian warna wajib diisi'),
    keterangan: Yup.string()
                    .test('len', 'Bidang isian keterangan tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                        if (val) {
                            return val.length <= 255;
                        }

                        return true;
                    })
                    .required('Bidang isian keterangan wajib diisi'),
    isMeried: Yup.boolean()
                    .required('Bidang isian status pernikahan wajib diisi'),
    driverHelpCenter: Yup.boolean()
                    .required('Bidang isian pusat bantuan pengemudi wajib diisi'),
    isActive: Yup.boolean()
                    .required('Bidang pilihan status aktif wajib diisi') 
});