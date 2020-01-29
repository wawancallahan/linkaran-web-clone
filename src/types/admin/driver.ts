import { Paginator } from '../paginator';

export const FETCH_DRIVER = "FETCH_DRIVER";
export const FETCH_DRIVER_SUCCESS = "FETCH_DRIVER_SUCCESS";
export const FETCH_DRIVER_ERROR = "FETCH_DRIVER_ERROR";
export const SET_PAGINATOR_DRIVER = "SET_PAGINATOR_DRIVER";

export const ALERT_DRIVER_SHOW = "ALERT_DRIVER_SHOW";
export const ALERT_DRIVER_HIDE = "ALERT_DRIVER_HIDE";

export type FormField = {
    nama: string,
    no_telepon: string,
    email: string,
    tanggal_lahir: Date | null,
    tempat_lahir: string,
    jenis_kelamin: number | null,
    no_ktp: string,
    ktp_file: File | null,
    ktp_file_preview: string,
    no_sim: string,
    sim_file: File | null,
    sim_file_preview: string,
    alamat: string,
    alamat_domisili: string,
    negara: {
        label: string,
        value: number
    },
    provinsi: {
        label: string,
        value: number
    },
    kabupaten_kota: {
        label: string,
        value: number
    },
    kecamatan: {
        label: string,
        value: number
    },
    kelurahan: {
        label: string,
        value: number
    },
    foto_profil: File | null,
    foto_profil_preview: string,
    rating: number | null,
    tipe_kendaraan: {
        label: string,
        value: number
    },
    merek: {
        label: string,
        value: number
    },
    no_stnk: string,
    no_polisi: string,
    no_rangka: string,
    jumlah_seat: number | null,
    warna: string,
    keterangan: string,
    wasOnceAnOnlineDriver: string,
    isActivelyBecomingAnotherOnlineDriver: string,
    isJoiningTheDriverCommunity: string,
    isJoiningLinkaranAsmainJob: string,
    choiceOfActiveWorkHours: string,
    choiceOfActiveWorkHoursOther: boolean,
    custom_interval_jam_kerja_start: Date | null,
    custom_interval_jam_kerja_end: Date | null
}

interface DriverField {
    nama: string,
    no_telepon: string,
    email: string,
    tempat_lahir: string,
    tanggal_lahir: string,
    jenis_kelamin: number,
    no_ktp: string,
    ktp_file: File | null,
    no_sim: string,
    sim_file: File | null,
    alamat: string,
    alamat_domisili: string,
    negara: {
        id: number
    },
    provinsi: {
        id: number
    },
    kabupaten_kota: {
        id: number
    },
    kecamatan: {
        id: number
    },
    kelurahan: {
        id: number
    },
    foto_profil: File | null,
    rating: number,
    tipe_kendaraan: {
        id: number
    },
    merek: {
        id: number
    },
    no_stnk: string,
    no_polisi: string,
    no_rangka: string,
    jumlah_seat: number,
    warna: string,
    keterangan: string,
    wasOnceAnOnlineDriver: boolean,
    isActivelyBecomingAnotherOnlineDriver: boolean,
    isJoiningTheDriverCommunity: boolean,
    isJoiningLinkaranAsmainJob: boolean,
    choiceOfActiveWorkHours: string,
}

interface DriverList {
    dateOfBirth: string,
    placeOfBirth: string,
    residenceAddress: string,
    gender: string,
    identityNumber: string,
    ktpPhoto: string,
    photo: string,
    address: string,
    rating: number,
    country: {
        id: number,
        name: string
    },
    province: {
        id: number,
        name: string
    },
    district: {
        id: number,
        name: string
    },
    subDistrict: {
        id: number,
        name: string
    },
    village: {
        id: number,
        name: string
    },
    user: {
        id: number,
        name: string,
        phoneNumber: string,
        email: string,
        vehicle: {
            id: number,
            policeNumber: string,
            stnkNumber: string,
            chassisNumber: string,
            description: string,
            color: string,
            vehicleType: {
                id: number,
                name: string
            },
            subBrandVehicle: {
                id: number,
                name: string,
                brandVehicle: {
                    id: number,
                    name: string
                }
            }
        }
    },
    wasOnceAnOnlineDriver: boolean,
    isActivelyBecomingAnotherOnlineDriver: boolean,
    isJoiningTheDriverCommunity: boolean,
    isJoiningLinkaranAsmainJob: boolean,
    choiceOfActiveWorkHours: string,
}

interface DriverList2 {
    dateOfBirth: string,
    gender: string,
    identityNumber: string,
    ktpPhoto: string,
    photo: string,
    address: string,
    rating: number,
    country: {
        id: string
    },
    province: {
        id: string
    },
    district: {
        id: string
    },
    subDistrict: {
        id: string
    },
    village: {
        id: string
    },
    user: {
        id: number
    },
    deletedAt: string,
    id: number,
    createdAt: string,
    updatedAt: string
}
interface DriverResult {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export type Driver = DriverResult & DriverList;

export type DriverCreate = DriverField;

export type DriverEdit = DriverField;

export type DriverCreateResult = DriverResult & DriverList2;

export type DriverEditResult = DriverResult &  DriverList2;

export interface FetchDriverActionType {
    type: typeof FETCH_DRIVER,
    list: Driver[]
}

export interface FetchDriverSuccessActionType {
    type: typeof FETCH_DRIVER_SUCCESS,
    list: Driver[]
}

export interface FetchDriverErrorActionType {
    type: typeof FETCH_DRIVER_ERROR
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
    | FetchDriverSuccessActionType
    | FetchDriverErrorActionType
    | AlertDriverHideActionType
    | AlertDriverShowActionType
    | SetPaginatorDriverActionType