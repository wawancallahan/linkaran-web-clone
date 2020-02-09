import React, { Component } from 'react'

import {
    Card,
    CardTitle,
    CardBody
} from 'reactstrap'

import {
    starImage
} from '../../../Assets'

import { DriverDetail } from '../../../types/admin/driver';

type Props = {
    driver: DriverDetail | null
}

class DetailRating extends  Component<Props> {

    render() {

        const { driver } = this.props

        if (driver) {
            const starFeedActive = [...Array.from(Array(driver.rating).keys())].map((value: number, index: number) => (
                <img className="d-inline-block img-star-feedback mr-2" key={index} src={starImage} />
            ));

            let numberUnActive = 5;

            if (driver.rating >= 5) {
                numberUnActive = 0;
            } else {
                numberUnActive -= driver.rating;
            }
    
            const starFeedUnActive = [...Array.from(Array(numberUnActive).keys())].map((value: number, index: number) => (
                <img className="d-inline-block img-star-feedback mr-2" key={index} src={starImage} />
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