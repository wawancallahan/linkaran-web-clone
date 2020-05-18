import React, { Component } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Row,
    Col,
    FormGroup,
    Input,
    Button
} from 'reactstrap'

import { FormikProps, Formik } from 'formik'
import { FormField } from '../../../types/admin/restaurant'
import Dropzone from '../../../components/Dropzone/Dropzone'

import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import { fetchListDistrictAction } from '../../../actions/admin/region/district';
import { DistrictList } from '../../../types/admin/region/district';
import ReactSelect from 'react-select'
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../types/paginator';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
import { connect } from 'react-redux';
import { ProvinceList } from '../../../types/admin/region/province'
import { fetchListProvinceAction } from '../../../actions/admin/region/province'

type FormInformationProps = {
    FormikProps: FormikProps<FormField>,
};

type Props = FormInformationProps & LinkDispatchToProps

class FormInformation extends Component<Props> {

    onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
        const file: {
            lastModified: number,
            name: string,
            preview: string,
            size: number,
            type: string
        } = files.length > 0 ? files[0] : null;
    
        if (file) {
            FormikProps.setFieldValue(setPreview, file.preview, true);
            FormikProps.setFieldValue(setValue, file);
        }
    }

    loadProvinceHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return this.props.fetchListProvinceAction(search, options.page)
            .then((response: ApiResponseList<ProvinceList>) => {
    
                const data: ApiResponseSuccessList<ProvinceList> = response.response!;
    
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
    
                    result = data.result.map((item: ProvinceList) => {
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

    loadDistrictHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        if (this.props.FormikProps.values.province.value && this.props.FormikProps.values.province.value > 0) {

            return this.props.fetchListDistrictAction(search, options.page, this.props.FormikProps.values.province.value)
                .then((response: ApiResponseList<DistrictList>) => {

                    const data: ApiResponseSuccessList<DistrictList> = response.response!;

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

                        result = data.result.map((item: DistrictList) => {
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
                            page: options.page + 1
                        },
                    };
                });
        }

        return new Promise((resolve, reject) => {
                resolve();
            }).then(() => {
                return {
                    options: [],
                    hasMore: false,
                    additional: {
                        page: 0,
                    },
                };
            })
    }

    render() {

        const { FormikProps } = this.props

        return (
            <Card className="mb-4">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col>
                            <h3 className="mb-0">Informasi Restoran</h3>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="pl-lg-4">
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-name"
                            >
                                Nama
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="Nama"
                            type="text"
                            name="name"
                            maxLength={255}
                            value={FormikProps.values.name}
                            required
                            onChange={FormikProps.handleChange}
                            onBlur={FormikProps.handleBlur}
                            invalid={ !!(FormikProps.touched.name && FormikProps.errors.name) }
                            />
                            <div>
                                {FormikProps.errors.name && FormikProps.touched.name ? FormikProps.errors.name : ''}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-phoneNumber"
                            >
                                No Telepon
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-phoneNumber"
                                placeholder="No Telepon"
                                type="text"
                                name="phoneNumber"
                                maxLength={255}
                                value={FormikProps.values.phoneNumber}
                                required
                                onChange={FormikProps.handleChange}
                                onBlur={FormikProps.handleBlur}
                                invalid={ !!(FormikProps.touched.phoneNumber && FormikProps.errors.phoneNumber) }
                                />
                            <div>
                                {FormikProps.errors.phoneNumber && FormikProps.touched.phoneNumber ? FormikProps.errors.phoneNumber : ''}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-address"
                            >
                                Alamat
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Alamat"
                            type="textarea"
                            name="address"
                            maxLength={255}
                            value={FormikProps.values.address}
                            required
                            onChange={FormikProps.handleChange}
                            onBlur={FormikProps.handleBlur}
                            invalid={ !!(FormikProps.touched.address && FormikProps.errors.address) }
                            />
                            <div>
                                {FormikProps.errors.address && FormikProps.touched.address ? FormikProps.errors.address : ''}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-point-lat"
                            >
                                Latitude
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-point-lat"
                            placeholder="Lat"
                            type="text"
                            name="lat"
                            value={FormikProps.values.point.lat}
                            required
                            onChange={e => {
                                FormikProps.handleChange(e)

                                let value = e.currentTarget.value

                                FormikProps.setFieldValue('point.lat', value, true)
                            }}
                            onBlur={e => {
                                FormikProps.handleBlur(e)

                                let value = e.currentTarget.value

                                FormikProps.setFieldValue('point.lat', value, true)
                            }}
                            invalid={ !!(FormikProps.touched.point && FormikProps.errors.point && FormikProps.touched.point.lat && FormikProps.errors.point.lat) }
                            />
                            <div>
                                {FormikProps.touched.point && FormikProps.errors.point && FormikProps.touched.point.lat && FormikProps.errors.point.lat ? FormikProps.errors.point.lat : ''}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-point-lng"
                            >
                                Longtitude
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-point-lng"
                            placeholder="Lng"
                            type="text"
                            name="lng"
                            value={FormikProps.values.point.lng}
                            required
                            onChange={e => {
                                FormikProps.handleChange(e)

                                let value = e.currentTarget.value

                                FormikProps.setFieldValue('point.lng', value, true)
                            }}
                            onBlur={e => {
                                FormikProps.handleBlur(e)

                                let value = e.currentTarget.value

                                FormikProps.setFieldValue('point.lng', value, true)
                            }}
                            invalid={ !!(FormikProps.touched.point && FormikProps.errors.point && FormikProps.touched.point.lng && FormikProps.errors.point.lng) }
                            />
                            <div>
                                {FormikProps.touched.point && FormikProps.errors.point && FormikProps.touched.point.lng && FormikProps.errors.point.lng ? FormikProps.errors.point.lng : ''}
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-province"
                            >
                                Provinsi
                            </label>
                            <ReactSelectAsyncPaginate 
                                value={FormikProps.values.province}
                                loadOptions={this.loadProvinceHandler}
                                onChange={(option) => {
                                    FormikProps.setFieldValue('province', option)
                                    FormikProps.setFieldValue('district', {
                                        value: 0,
                                        label: ''
                                    })
                                }}
                                onBlur={() => FormikProps.setFieldTouched('province', true)}
                                additional={{
                                    page: 1
                                }}
                                debounceTimeout={250}
                                />
                            <div>
                                { FormikProps.errors.province && FormikProps.touched.province ? FormikProps.errors.province.value : '' }
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-district"
                            >
                                Kabupaten / Kota
                            </label>
                            <ReactSelectAsyncPaginate 
                                value={FormikProps.values.district}
                                loadOptions={this.loadDistrictHandler}
                                onChange={(option) => FormikProps.setFieldValue('district', option)}
                                onBlur={() => FormikProps.setFieldTouched('district', true)}
                                additional={{
                                    page: 1
                                }}
                                key={JSON.stringify(FormikProps.values.province.value)}
                                debounceTimeout={250}
                                />
                            <div>
                                { FormikProps.errors.district && FormikProps.touched.district ? FormikProps.errors.district.value : '' }
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-rating"
                            >
                                Rating
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-rating"
                            placeholder="Rating"
                            type="number"
                            name="rating"
                            min="0"
                            max="100"
                            value={FormikProps.values.rating}
                            required
                            onChange={FormikProps.handleChange}
                            onBlur={FormikProps.handleBlur}
                            invalid={ !!(FormikProps.touched.rating && FormikProps.errors.rating) }
                            />
                            <div>
                                {FormikProps.errors.rating && FormikProps.touched.rating ? FormikProps.errors.rating : ''}
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-registered"
                            >
                                Registrasi
                            </label>
                        </FormGroup>

                        <FormGroup>
                            <fieldset>
                                <div className="custom-control custom-radio mb-3">
                                    <input
                                        className="custom-control-input"
                                        defaultChecked={FormikProps.values.registered == '0'}
                                        id="registered_no"
                                        name="registered"
                                        type="radio"
                                        value="0"
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                    />
                                    <label className="custom-control-label" htmlFor="registered_no">
                                        Tidak
                                    </label>
                                </div>
                                <div className="custom-control custom-radio mb-3">
                                    <input
                                        className="custom-control-input"
                                        defaultChecked={FormikProps.values.registered == '1'}
                                        id="registered_yes"
                                        name="registered"
                                        type="radio"
                                        value="1"
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                    />
                                    <label className="custom-control-label" htmlFor="registered_yes">
                                        Ya
                                    </label>
                                </div>
                            </fieldset>
                            <div>
                                {FormikProps.errors.registered && FormikProps.touched.registered ? FormikProps.errors.registered : ''}
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-upload-photo"
                            >
                                Upload Gambar
                            </label>
                            <Dropzone onFilesAdded={(files: any[]) => {
                                this.onFilesAdded(files, FormikProps, 'photo_preview', 'photo');
                            }} disabled={false} multiple={false} previewUrl={FormikProps.values.photo_preview} removeFile={true} onClickRemove={(file, index) => {
                                FormikProps.setFieldValue('image_preview', '');
                                FormikProps.setFieldValue('image', null)
                            }} />
                            
                            <div>
                                {FormikProps.errors.photo_preview && FormikProps.touched.photo_preview ? FormikProps.errors.photo_preview : ''}
                            </div>
                        </FormGroup>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

type LinkDispatchToProps = {
    fetchListProvinceAction: (search: string, page: number) => Promise<ApiResponseList<ProvinceList>>,
    fetchListDistrictAction: (search: string, page: number, id: number) => Promise<ApiResponseList<DistrictList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormInformationProps): LinkDispatchToProps => {
    return {
        fetchListProvinceAction: (search: string, page: number) => dispatch(fetchListProvinceAction(search, page)),
        fetchListDistrictAction: (search: string, page: number, id: number) => dispatch(fetchListDistrictAction(search, page, id)),
    }
}

export default connect(null, mapDispatchToProps)(FormInformation);