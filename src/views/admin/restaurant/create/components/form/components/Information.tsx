import * as React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    FormGroup,
    Input
} from 'reactstrap'
import { FormikProps } from 'formik'
import { FormField } from '../../../../../../../types/admin/restaurant'
import { ApiResponseList, ApiResponseSuccessList } from '../../../../../../../types/api';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../../../types';
import { connect } from 'react-redux';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { ProvinceList } from '../../../../../../../types/admin/region/province';
import { DistrictList } from '../../../../../../../types/admin/region/district';
import { fetchListProvinceAction } from '../../../../../../../actions/admin/region/province';
import { fetchListDistrictAction } from '../../../../../../../actions/admin/region/district';
import Dropzone from '../../../../../../../components/Dropzone/Dropzone';
import { Paginator } from '../../../../../../../types/paginator';

type OwnProps = {
    form: FormikProps<FormField>,
};

type Props = OwnProps & LinkDispatchToProps

const Information: React.FC<Props> = (props) => {

    const onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
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

    const loadProvinceHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListProvinceAction(search, options.page)
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

    const loadDistrictHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        if (props.form.values.province.value && props.form.values.province.value > 0) {

            return props.fetchListDistrictAction(search, options.page, props.form.values.province.value)
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

    const { form } = props

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
                        value={form.values.name}
                        required
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        invalid={ !!(form.touched.name && form.errors.name) }
                        />
                        <div>
                            {form.errors.name && form.touched.name ? form.errors.name : ''}
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
                            value={form.values.phoneNumber}
                            required
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            invalid={ !!(form.touched.phoneNumber && form.errors.phoneNumber) }
                            />
                        <div>
                            {form.errors.phoneNumber && form.touched.phoneNumber ? form.errors.phoneNumber : ''}
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
                        value={form.values.address}
                        required
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        invalid={ !!(form.touched.address && form.errors.address) }
                        />
                        <div>
                            {form.errors.address && form.touched.address ? form.errors.address : ''}
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
                        value={form.values.point.lat}
                        required
                        onChange={e => {
                            form.handleChange(e)

                            let value = e.currentTarget.value

                            form.setFieldValue('point.lat', value, true)
                        }}
                        onBlur={e => {
                            form.handleBlur(e)

                            let value = e.currentTarget.value

                            form.setFieldValue('point.lat', value, true)
                        }}
                        invalid={ !!(form.touched.point && form.errors.point && form.touched.point.lat && form.errors.point.lat) }
                        />
                        <div>
                            {form.touched.point && form.errors.point && form.touched.point.lat && form.errors.point.lat ? form.errors.point.lat : ''}
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
                        value={form.values.point.lng}
                        required
                        onChange={e => {
                            form.handleChange(e)

                            let value = e.currentTarget.value

                            form.setFieldValue('point.lng', value, true)
                        }}
                        onBlur={e => {
                            form.handleBlur(e)

                            let value = e.currentTarget.value

                            form.setFieldValue('point.lng', value, true)
                        }}
                        invalid={ !!(form.touched.point && form.errors.point && form.touched.point.lng && form.errors.point.lng) }
                        />
                        <div>
                            {form.touched.point && form.errors.point && form.touched.point.lng && form.errors.point.lng ? form.errors.point.lng : ''}
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
                            value={form.values.province}
                            loadOptions={loadProvinceHandler}
                            onChange={(option) => {
                                form.setFieldValue('province', option)
                                form.setFieldValue('district', {
                                    value: 0,
                                    label: ''
                                })
                            }}
                            onBlur={() => form.setFieldTouched('province', true)}
                            additional={{
                                page: 1
                            }}
                            debounceTimeout={250}
                            />
                        <div>
                            { form.errors.province && form.touched.province ? form.errors.province.value : '' }
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
                            value={form.values.district}
                            loadOptions={loadDistrictHandler}
                            onChange={(option) => form.setFieldValue('district', option)}
                            onBlur={() => form.setFieldTouched('district', true)}
                            additional={{
                                page: 1
                            }}
                            key={JSON.stringify(form.values.province.value)}
                            debounceTimeout={250}
                            />
                        <div>
                            { form.errors.district && form.touched.district ? form.errors.district.value : '' }
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
                        value={form.values.rating}
                        required
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        invalid={ !!(form.touched.rating && form.errors.rating) }
                        />
                        <div>
                            {form.errors.rating && form.touched.rating ? form.errors.rating : ''}
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
                                    defaultChecked={form.values.registered == '0'}
                                    id="registered_no"
                                    name="registered"
                                    type="radio"
                                    value="0"
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                />
                                <label className="custom-control-label" htmlFor="registered_no">
                                    Tidak
                                </label>
                            </div>
                            <div className="custom-control custom-radio mb-3">
                                <input
                                    className="custom-control-input"
                                    defaultChecked={form.values.registered == '1'}
                                    id="registered_yes"
                                    name="registered"
                                    type="radio"
                                    value="1"
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                />
                                <label className="custom-control-label" htmlFor="registered_yes">
                                    Ya
                                </label>
                            </div>
                        </fieldset>
                        <div>
                            {form.errors.registered && form.touched.registered ? form.errors.registered : ''}
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
                            onFilesAdded(files, form, 'photo_preview', 'photo');
                        }} disabled={false} multiple={false} previewUrl={form.values.photo_preview} removeFile={true} onClickRemove={(file, index) => {
                            form.setFieldValue('image_preview', '');
                            form.setFieldValue('image', null)
                        }} />
                        
                        <div>
                            {form.errors.photo_preview && form.touched.photo_preview ? form.errors.photo_preview : ''}
                        </div>
                    </FormGroup>
                </div>
            </CardBody>
        </Card>
        )
}

type LinkDispatchToProps = {
    fetchListProvinceAction: (search: string, page: number) => Promise<ApiResponseList<ProvinceList>>,
    fetchListDistrictAction: (search: string, page: number, id: number) => Promise<ApiResponseList<DistrictList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchListProvinceAction: (search: string, page: number) => dispatch(fetchListProvinceAction(search, page)),
        fetchListDistrictAction: (search: string, page: number, id: number) => dispatch(fetchListDistrictAction(search, page, id)),
    }
}

export default connect(null, mapDispatchToProps)(Information);