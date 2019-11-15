
interface NegaraList {
    name: string
}

interface NegaraResult {
    id: number
}

export type Negara = NegaraResult & NegaraList;

interface ProvinsiList {
    name: string
}

interface ProvinsiResult {
    id: number
}

export type Provinsi = ProvinsiResult & ProvinsiList;


interface KabupatenKotaList {
    name: string
}

interface KabupatenKotaResult {
    id: number
}

export type KabupatenKota = KabupatenKotaResult & KabupatenKotaList;


interface KecamatanList {
    name: string
}

interface KecamatanResult {
    id: number
}

export type Kecamatan = KecamatanResult & KecamatanList;

interface KelurahanList {
    name: string
}

interface KelurahanResult {
    id: number
}

export type Kelurahan = KelurahanResult & KelurahanList;



export type LocationActionTypes = {}