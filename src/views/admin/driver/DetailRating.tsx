import React, { Component } from 'react'

import {
    Card,
    CardTitle,
    CardBody
} from 'reactstrap'

import {
    icoStarActive, icoStarUnActive
} from '../../../helpers/Assets'

import { DriverShow } from '../../../types/admin/driver';

type Props = {
    driver: DriverShow | null
}

class DetailRating extends  Component<Props> {

    render() {

        const { driver } = this.props

        if (driver) {
            const starFeedActive = [...Array.from(Array(driver.rating).keys())].map((value: number, index: number) => (
                <img className="d-inline-block img-star-feedback mr-2" key={index} src={icoStarActive} />
            ));

            let numberUnActive = 5;

            if (driver.rating >= 5) {
                numberUnActive = 0;
            } else {
                numberUnActive -= driver.rating;
            }
    
            const starFeedUnActive = [...Array.from(Array(numberUnActive).keys())].map((value: number, index: number) => (
                <img className="d-inline-block img-star-feedback mr-2" key={index} src={icoStarUnActive} />
            ));
    
            return (
                <Card className="mb-2">
                    <CardBody>
                        <CardTitle className="font-weight-bold">Rating</CardTitle>
                        <div className="d-flex">
                            <div>{driver.rating}</div>
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
}

export default DetailRating