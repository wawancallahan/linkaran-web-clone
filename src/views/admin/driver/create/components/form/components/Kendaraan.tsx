import * as React from 'react';

import {
    FormGroup,
    Input,
} from 'reactstrap';

import { FormikProps } from 'formik';
import { FormField } from '../../../../../../../types/admin/driver';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { connect } from 'react-redux';
import { ApiResponseList, ApiResponseSuccessList } from '../../../../../../../types/api';
import { ThunkDispatch } from 'redux-thunk';
import { VehicleTypeList } from '../../../../../../../types/admin/vehicleType';
import { SubBrandVehicle } from '../../../../../../../types/admin/subBrandVehicle';
import { fetchListVehicleTypeAction } from '../../../../../../../actions/admin/vehicleType';
import { fetchListSubBrandVehicleAction } from '../../../../../../../actions/admin/subBrandVehicle';
import { AppActions } from '../../../../../../../types';
import { Paginator } from '../../../../../../../types/paginator';

type OwnProps = {
    form: FormikProps<FormField>,
};

type Props = OwnProps & LinkDispatchToProps;

const Kendaraan: React.FC<Props> = (props) => {

    const { form } = props

    const loadTipeKendaraanHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListVehicleTypeAction(search, options.page)
            .then((response: ApiResponseList<VehicleTypeList>) => {

                const data: ApiResponseSuccessList<VehicleTypeList> = response.response!;

                let result: {
                    value: number,
                    label: string
                }[] = [];

                let hasMore = false;

                if ( ! data.metaData.isError) {

                    if (data.metaData.paginate) {
                        const paginate = data.metaData.paginate as Paginator;
                        hasMore = paginate.pageCount > options.page;
                    }

                    result = data.result.map((item: VehicleTypeList) => {
                        return {
                            value: item.id,
                            label: `${item.name}`
                        };
                    });
                }

                return {
                    options: result,
                    hasMore: hasMore,
                    additional: {
                      page: options.page + 1,
                    },
                };
            });
    }

    const loadMerekHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListSubBrandVehicleAction(search, options.page)
            .then((response: ApiResponseList<SubBrandVehicle>) => {

                const data: ApiResponseSuccessList<SubBrandVehicle> = response.response!;

                let result: {
                    value: number,
                    label: string
                }[] = [];

                let hasMore = false;

                if ( ! data.metaData.isError) {

                    if (data.metaData.paginate) {
                        const paginate = data.metaData.paginate as Paginator;
                        hasMore = paginate.pageCount > options.page;
                    }

                    result = data.result.map((item: SubBrandVehicle) => {
                        return {
                            value: item.id,
                            label: `${item.name}`
                        };
                    });
                }

                return {
                    options: result,
                    hasMore: hasMore,
                    additional: {
                      page: options.page + 1,
                    },
                };
            });
    }

    return (
        <React.Fragment>
            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-tipe-kendaraan"
                >
                    Tipe Kendaraan
                </label>
                <ReactSelectAsyncPaginate 
                    value={form.values.tipe_kendaraan}
                    loadOptions={loadTipeKendaraanHandler}
                    onChange={(option) => form.setFieldValue('tipe_kendaraan', option)}
                    onBlur={() => form.setFieldTouched('tipe_kendaraan', true)}
                    additional={{
                        page: 1
                    }}
                    debounceTimeout={250}
                    />
                <div>
                    { form.errors.tipe_kendaraan && form.touched.tipe_kendaraan ? form.errors.tipe_kendaraan.value : '' }
                </div>
            </FormGroup>


            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-merek"
                >
                    Merek
                </label>
                <ReactSelectAsyncPaginate 
                    value={form.values.merek}
                    loadOptions={loadMerekHandler}
                    onChange={(option) => form.setFieldValue('merek', option)}
                    onBlur={() => form.setFieldTouched('merek', true)}
                    additional={{
                        page: 1
                    }}
                    debounceTimeout={250}
                    />
                <div>
                    { form.errors.merek && form.touched.merek ? form.errors.merek.value : '' }
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-no_stnk"
                >
                    No STNK
                </label>
                <Input
                className="form-control-alternative"
                id="input-no_stnk"
                placeholder="No STNK"
                type="text"
                name="no_stnk"
                maxLength={255}
                value={form.values.no_stnk}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.no_stnk && form.errors.no_stnk) }
                />
                <div>
                    {form.errors.no_stnk && form.touched.no_stnk ? form.errors.no_stnk : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-no_polisi"
                >
                    No Polisi
                </label>
                <Input
                className="form-control-alternative"
                id="input-no_polisi"
                placeholder="No Polisi"
                type="text"
                name="no_polisi"
                maxLength={255}
                value={form.values.no_polisi}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.no_polisi && form.errors.no_polisi) }
                />
                <div>
                    {form.errors.no_polisi && form.touched.no_polisi ? form.errors.no_polisi : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-no_rangka"
                >
                    No Rangka
                </label>
                <Input
                className="form-control-alternative"
                id="input-no_rangka"
                placeholder="No Rangka"
                type="text"
                name="no_rangka"
                maxLength={255}
                value={form.values.no_rangka}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.no_rangka && form.errors.no_rangka) }
                />
                <div>
                    {form.errors.no_rangka && form.touched.no_rangka ? form.errors.no_rangka : ''}
                </div>
            </FormGroup>

            {/* <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-jumlah_seat"
                >
                    Jumlah Seat
                </label>
                <Input
                className="form-control-alternative"
                id="input-jumlah_seat"
                placeholder="Jumlah Seat"
                type="number"
                name="jumlah_seat"
                maxLength={255}
                value={form.values.jumlah_seat || 0}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.jumlah_seat && form.errors.jumlah_seat) }
                />
                <div>
                    {form.errors.jumlah_seat && form.touched.jumlah_seat ? form.errors.jumlah_seat : ''}
                </div>
            </FormGroup> */}

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-warna"
                >
                    Warna
                </label>
                <Input
                className="form-control-alternative"
                id="input-warna"
                placeholder="Warna"
                type="text"
                name="warna"
                maxLength={255}
                value={form.values.warna}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.warna && form.errors.warna) }
                />
                <div>
                    {form.errors.warna && form.touched.warna ? form.errors.warna : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-keterangan"
                >
                    Keterangan
                </label>
                <Input
                className="form-control-alternative"
                id="input-keterangan"
                placeholder="Keterangan"
                type="textarea"
                name="keterangan"
                maxLength={255}
                value={form.values.keterangan}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.keterangan && form.errors.keterangan) }
                />
                <div>
                    {form.errors.keterangan && form.touched.keterangan ? form.errors.keterangan : ''}
                </div>
            </FormGroup>
        </React.Fragment>
    )
}


type LinkDispatchToProps = {
    fetchListVehicleTypeAction: (search: string, page: number) => Promise<ApiResponseList<VehicleTypeList>>
    fetchListSubBrandVehicleAction: (search: string, page: number) => Promise<ApiResponseList<SubBrandVehicle>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchListVehicleTypeAction: (search: string, page: number) => dispatch(fetchListVehicleTypeAction(search, page)),
        fetchListSubBrandVehicleAction: (search: string, page: number) => dispatch(fetchListSubBrandVehicleAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Kendaraan);