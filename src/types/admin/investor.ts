import { Paginator } from '../paginator';
import { SelectType } from '../select';
import { Timestamps } from '../timestamps';
import { Country } from './region/country';
import { Province } from './region/province';
import { District } from './region/district';
import { SubDistrict } from './region/subDistrict';
import { Village } from './region/village';
import { User } from './user';

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
    negara: SelectType,
    provinsi: SelectType,
    kabupaten_kota: SelectType,
    kecamatan: SelectType,
    kelurahan: SelectType,
    foto_profil: File | null,
    foto_profil_preview: string,
    nomor_asosiasi_lingkungan: string,
    nomor_asosiasi_warga_negara: string,
}

export type InvestorField = {
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

export type Investor = {
    id: number,
    dateOfBirth: string,
    gender: string,
    identityNumber: string,
    ktpPhoto: string | null,
    photo: string | null,
    address: string,
    neighboorhoodAssociationNumber: string,
    citizensAssociationNumber: string
}

export type InvestorList = Investor & Partial<Timestamps> & {
    country?: Partial<Country>,
    province?: Partial<Province>,
    district?: Partial<District>,
    subDistrict?: Partial<SubDistrict>,
    village?: Partial<Village>,
    user?: Partial<User>
}

export type InvestorShow = Investor & Partial<Timestamps> & {
    country?: Partial<Country>,
    province?: Partial<Province>,
    district?: Partial<District>,
    subDistrict?: Partial<SubDistrict>,
    village?: Partial<Village>,
    user?: Partial<User>
}

export type InvestorCreateField = InvestorField;

export type InvestorEditField = InvestorField;

export type InvestorCreateResult = Investor & Partial<Timestamps> & {
    country?: Partial<Country>,
    province?: Partial<Province>,
    district?: Partial<District>,
    subDistrict?: Partial<SubDistrict>,
    village?: Partial<Village>,
    user?: Partial<User>
}

export type InvestorEditResult = Investor & Partial<Timestamps> & {
    country?: Partial<Country>,
    province?: Partial<Province>,
    district?: Partial<District>,
    subDistrict?: Partial<SubDistrict>,
    village?: Partial<Village>,
    user?: Partial<User>
}

export type FetchInvestorActionType = {
    type: typeof FETCH_INVESTOR,
    list: Investor[]
}

export type FetchInvestorSuccessActionType = {
    type: typeof FETCH_INVESTOR_SUCCESS,
    list: Investor[]
}

export type FetchInvestorErrorActionType = {
    type: typeof FETCH_INVESTOR_ERROR
}


export type SetPaginatorInvestorActionType = {
    type: typeof SET_PAGINATOR_INVESTOR,
    paginate: Paginator
}

export type AlertInvestorHideActionType = {
    type: typeof ALERT_INVESTOR_HIDE
}

export type AlertInvestorShowActionType = {
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