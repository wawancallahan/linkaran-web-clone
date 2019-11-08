import { Paginator } from '../paginator';

export const FETCH_DRIVER = "FETCH_DRIVER";
export const SET_PAGINATOR_DRIVER = "SET_PAGINATOR_DRIVER";

export const ALERT_DRIVER_SHOW = "ALERT_DRIVER_SHOW";
export const ALERT_DRIVER_HIDE = "ALERT_DRIVER_HIDE";

export type FormField = {
    nama: string,
    no_telepon: string,
    email: string,
    tanggal_lahir: Date | null,
    jenis_kelamin: number | null,
    no_ktp: string,
    ktp_file: File | null,
    ktp_file_preview: string,
    no_sim: string,
    sim_file: File | null,
    sim_file_preview: string,
    alamat: string,
    negara: string,
    provinsi: string,
    kabupaten_kota: string,
    kecamatan: string,
    kelurahan: string,
    foto_profil: File | null,
    foto_profil_preview: string,
    tipe_kendaraan: {
        label: string,
        value: number
    },
    no_stnk: string,
    no_polisi: string,
    no_rangka: string,
    merek: {
        label: string,
        value: number
    },
    jumlah_seat: number | null,
    warna: string,
    keterangan: string 
}


export interface Driver {
}

export interface FetchDriverActionType {
    type: typeof FETCH_DRIVER,
    list: Driver[]
}

export interface SetPaginatorDriverActionType {
    type: typeof SET_PAGINATOR_DRIVER,
    paginate: Paginator
}

export interface AlertDriverHideActionType {
    type: typeof ALERT_DRIVER_HIDE
}

export interface AlertDriverShowActionType {
    type: typeof ALERT_DRIVER_SHOW,
    message: string,
    color: string
}

export type DriverActionTypes =
    | FetchDriverActionType
    | AlertDriverHideActionType
    | AlertDriverShowActionType
    | SetPaginatorDriverActionType