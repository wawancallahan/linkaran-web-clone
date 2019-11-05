import { Paginator } from '../paginator';

export const FETCH_DRIVER = "FETCH_DRIVER";
export const SET_PAGINATOR_DRIVER = "SET_PAGINATOR_DRIVER";

export type FormField = {
    nama: string,
    no_telepon: string,
    email: string,
    tanggal_lahir: Date | null,
    jenis_kelamin: number | null,
    no_ktp: string,
    ktp_file: File | null,
    no_sim: string,
    sim_file: File | null,
    alamat: string,
    negara: string,
    provinsi: string,
    kabupaten_kota: string,
    kecamatan: string,
    kelurahan: string,
    foto_profil: File | null,
    tipe_kendaraan: number | null,
    no_stnk: string,
    no_polisi: string,
    no_rangka: string,
    merek: number | null,
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

export type DriverActionTypes =
    | FetchDriverActionType
    | SetPaginatorDriverActionType