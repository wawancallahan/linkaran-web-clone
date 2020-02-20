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

import { FormikProps } from 'formik'
import { FormField } from '../../../types/admin/restaurant'
import Dropzone from '../../../components/Dropzone/Dropzone'

import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import { fetchListDistrictAction } from '../../../actions/admin/region/district';
import { DistrictList } from '../../../types/admin/region/district';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../types/paginator';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
import { connect } from 'react-redux';

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

    loadDistrictHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListDistrictAction(search, options.page)
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
                      page: options.page + 1,
                    },
                };
            });
    }

    render() {

        const { FormikProps } = this.props

        return (
            <Card className="mb-4">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col>
                            <h3 className="mb-0">Informasi Restaurant</h3>
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
                            htmlFor="input-upload-photo"
                            >
                                Upload Gambar
                            </label>
                            <Dropzone onFilesAdded={(files: any[]) => {
                                this.onFilesAdded(files, FormikProps, 'photo_preview', 'photo');
                            }} disabled={false} multiple={false} previewUrl={FormikProps.values.photo_preview} />
                            
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
    fetchListDistrictAction: (search: string, page: number) => Promise<ApiResponseList<DistrictList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormInformationProps): LinkDispatchToProps => {
    return {
        fetchListDistrictAction: (search: string, page: number) => dispatch(fetchListDistrictAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(FormInformation);