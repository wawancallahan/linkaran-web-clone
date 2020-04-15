import React, { Component } from 'react';

import {
    Button,
    FormGroup,
    Input,
} from 'reactstrap';

import { Formik, getIn, FormikProps } from 'formik';
import { Driver, FormField } from '../../../types/admin/driver';
import ReactSelectAsyncPaginate, { AsyncResult } from 'react-select-async-paginate';
import { connect } from 'react-redux';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import {
    SubBrandVehicle,
} from '../../../types/admin/subBrandVehicle';
import {
    VehicleTypeList,
} from '../../../types/admin/vehicleType';
import {
    fetchListSubBrandVehicleAction,
    fetchListVehicleTypeAction
} from '../../../actions/admin/subBrandVehicle';
import { Paginator } from '../../../types/paginator';

type FormKendaraanProps = {
    FormikProps: FormikProps<FormField>,
};

type Props = FormKendaraanProps & LinkDispatchToProps;

class FormKendaraan extends Component<Props> {

    loadTipeKendaraanHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListVehicleTypeAction(search, options.page)
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

    loadMerekHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListSubBrandVehicleAction(search, options.page)
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

    render() {

        const { FormikProps } = this.props;

        return (
            <>
                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-tipe-kendaraan"
                    >
                        Tipe Kendaraan
                    </label>
                    <ReactSelectAsyncPaginate 
                        value={FormikProps.values.tipe_kendaraan}
                        loadOptions={this.loadTipeKendaraanHandler}
                        onChange={(option) => FormikProps.setFieldValue('tipe_kendaraan', option)}
                        onBlur={() => FormikProps.setFieldTouched('tipe_kendaraan', true)}
                        additional={{
                            page: 1
                        }}
                        debounceTimeout={250}
                        />
                    <div>
                        { FormikProps.errors.tipe_kendaraan && FormikProps.touched.tipe_kendaraan ? FormikProps.errors.tipe_kendaraan.value : '' }
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
                        value={FormikProps.values.merek}
                        loadOptions={this.loadMerekHandler}
                        onChange={(option) => FormikProps.setFieldValue('merek', option)}
                        onBlur={() => FormikProps.setFieldTouched('merek', true)}
                        additional={{
                            page: 1
                        }}
                        debounceTimeout={250}
                        />
                    <div>
                        { FormikProps.errors.merek && FormikProps.touched.merek ? FormikProps.errors.merek.value : '' }
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
                    value={FormikProps.values.no_stnk}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.no_stnk && FormikProps.errors.no_stnk) }
                    />
                    <div>
                        {FormikProps.errors.no_stnk && FormikProps.touched.no_stnk ? FormikProps.errors.no_stnk : ''}
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
                    value={FormikProps.values.no_polisi}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.no_polisi && FormikProps.errors.no_polisi) }
                    />
                    <div>
                        {FormikProps.errors.no_polisi && FormikProps.touched.no_polisi ? FormikProps.errors.no_polisi : ''}
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
                    value={FormikProps.values.no_rangka}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.no_rangka && FormikProps.errors.no_rangka) }
                    />
                    <div>
                        {FormikProps.errors.no_rangka && FormikProps.touched.no_rangka ? FormikProps.errors.no_rangka : ''}
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
                    value={FormikProps.values.jumlah_seat || 0}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.jumlah_seat && FormikProps.errors.jumlah_seat) }
                    />
                    <div>
                        {FormikProps.errors.jumlah_seat && FormikProps.touched.jumlah_seat ? FormikProps.errors.jumlah_seat : ''}
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
                    value={FormikProps.values.warna}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.warna && FormikProps.errors.warna) }
                    />
                    <div>
                        {FormikProps.errors.warna && FormikProps.touched.warna ? FormikProps.errors.warna : ''}
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
                    value={FormikProps.values.keterangan}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.keterangan && FormikProps.errors.keterangan) }
                    />
                    <div>
                        {FormikProps.errors.keterangan && FormikProps.touched.keterangan ? FormikProps.errors.keterangan : ''}
                    </div>
                </FormGroup>
            </>
        )
    }

} 


type LinkDispatchToProps = {
    fetchListVehicleTypeAction: (search: string, page: number) => Promise<ApiResponseList<VehicleTypeList>>
    fetchListSubBrandVehicleAction: (search: string, page: number) => Promise<ApiResponseList<SubBrandVehicle>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormKendaraanProps): LinkDispatchToProps => {
    return {
        fetchListVehicleTypeAction: (search: string, page: number) => dispatch(fetchListVehicleTypeAction(search, page)),
        fetchListSubBrandVehicleAction: (search: string, page: number) => dispatch(fetchListSubBrandVehicleAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(FormKendaraan);