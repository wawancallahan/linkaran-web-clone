import * as React from 'react';

import {
    Container,
    Row,
    Card,
    CardHeader
} from "reactstrap";

import Header from "../components/Headers/Header";

const NotFound: React.FC = () => {
    return (
        <React.Fragment>
            <Header />

            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">404 Not Found</h3>
                            </CardHeader>
                        </Card>
                    </div>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default NotFound;