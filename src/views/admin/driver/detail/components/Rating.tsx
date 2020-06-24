import * as React from 'react'

import {
    Card,
    CardTitle,
    CardBody,
} from 'reactstrap'

import { DriverShow } from '../../../../../types/admin/driver';
import {
    icoStarActive, icoStarUnActive
} from '../../../../../helpers/Assets'

type OwnProps = {
    data: DriverShow | null
}

type Props = OwnProps

const Rating: React.FC<Props> = (props) => {

    const { data } = props

    if (data) {
        const starFeedActive = [...Array.from(Array(data.rating).keys())].map((value: number, index: number) => (
            <img className="d-inline-block img-star-feedback mr-2" key={index} src={icoStarActive} />
        ));

        let numberUnActive = 5;

        if (data.rating >= 5) {
            numberUnActive = 0;
        } else {
            numberUnActive -= data.rating;
        }

        const starFeedUnActive = [...Array.from(Array(numberUnActive).keys())].map((value: number, index: number) => (
            <img className="d-inline-block img-star-feedback mr-2" key={index} src={icoStarUnActive} />
        ));

        return (
            <Card className="mb-2">
                <CardBody>
                    <CardTitle className="font-weight-bold">Rating</CardTitle>
                    <div className="d-flex">
                        <div>{data.rating}</div>
                        <div className="ml-auto">
                            {starFeedActive}
                            {starFeedUnActive}
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }

    return null
}

export default Rating