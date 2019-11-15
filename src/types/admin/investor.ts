import { Paginator } from '../paginator';

export const FETCH_INVESTOR = "FETCH_INVESTOR";
export const FETCH_INVESTOR_SUCCESS = "FETCH_INVESTOR_SUCCESS";
export const FETCH_INVESTOR_ERROR = "FETCH_INVESTOR_ERROR";
export const SET_PAGINATOR_INVESTOR = "SET_PAGINATOR_INVESTOR";

export const ALERT_INVESTOR_SHOW = "ALERT_INVESTOR_SHOW";
export const ALERT_INVESTOR_HIDE = "ALERT_INVESTOR_HIDE";

export type FormField = {
    nama: string,
    no_telepon: string,
    email: string,
    tanggal_lahir: Date | null,
    jenis_kelamin: string,
    no_ktp: string,
    ktp_file: File | null,
    ktp_file_preview: string,
    alamat: string,
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
    nomor_asosiasi_lingkungan: string,
    nomor_asosiasi_warga_negara: string,
}

interface InvestorField {
    nama: string,
    no_telepon: string,
    email: string,
    tanggal_lahir: string,
    jenis_kelamin: string,
    no_ktp: string,
    ktp_file: File | null,
    alamat: string,
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
    nomor_asosiasi_lingkungan: string,
    nomor_asosiasi_warga_negara: string,
}

interface InvestorList {
    dateOfBirth: string,
    gender: string,
    identityNumber: string,
    ktpPhoto: string,
    photo: string,
    address: string,
    neighboorhoodAssociationNumber: string,
    citizensAssociationNumber: string,
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
        email: string
    }
}

interface InvestorList2 {
    dateOfBirth: string,
    gender: string,
    identityNumber: string,
    ktpPhoto: string,
    photo: string,
    address: string,
    neighboorhoodAssociationNumber: string,
    citizensAssociationNumber: string,
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
interface InvestorResult {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export type Investor = InvestorResult & InvestorList;

export type InvestorCreate = InvestorField;

export type InvestorEdit = InvestorField;

export type InvestorCreateResult = InvestorResult & InvestorList2;

export type InvestorEditResult = InvestorResult &  InvestorList2;

export interface FetchInvestorActionType {
    type: typeof FETCH_INVESTOR,
    list: Investor[]
}

export interface FetchInvestorSuccessActionType {
    type: typeof FETCH_INVESTOR_SUCCESS,
    list: Investor[]
}

export interface FetchInvestorErrorActionType {
    type: typeof FETCH_INVESTOR_ERROR
}


export interface SetPaginatorInvestorActionType {
    type: typeof SET_PAGINATOR_INVESTOR,
    paginate: Paginator
}

export interface AlertInvestorHideActionType {
    type: typeof ALERT_INVESTOR_HIDE
}

export interface AlertInvestorShowActionType {
    type: typeof ALERT_INVESTOR_SHOW,
    message: string,
    color: string
}

export type InvestorActionTypes =
    | FetchInvestorActionType
    | FetchInvestorSuccessActionType
    | FetchInvestorErrorActionType
    | AlertInvestorHideActionType
    | AlertInvestorShowActionType
    | SetPaginatorInvestorActionType