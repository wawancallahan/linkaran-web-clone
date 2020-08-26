import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
    Table
} from 'reactstrap'
import lodash from 'lodash';

type Props = {
    headCount?: number,
    itemCount?: number,
    withOption?: boolean
}

const TableSkeleton = (props: Props) => {
    const headSkeletonCount = (props.headCount || 0) > 0 ? props.headCount : 1;
    const rangeHeadSkeleton = lodash.range(0, headSkeletonCount);

    const itemSkeletonCount = (props.itemCount || 0) > 0 ? props.itemCount : 10;
    const rangeItemSkeleton = lodash.range(0, itemSkeletonCount);

    const withOption = props.withOption ? props.withOption : false;

    return (
        <React.Fragment>
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        {rangeHeadSkeleton.map((_: number, index: number) => (
                            <th key={index}>
                                <Skeleton width={100} />
                            </th>
                        ))}
                        {withOption && (
                            <th><Skeleton width={50}/></th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rangeItemSkeleton.map((_: number, index: number) => (
                        <tr key={index}>
                            {rangeHeadSkeleton.map((_: number, index: number) => (
                                <td key={index}><Skeleton /></td>
                            ))}
                            {withOption && (
                                <td>
                                    <Skeleton width={50} height={25} style={{
                                        marginRight: "5px"
                                    }} />
                                    <Skeleton width={50} height={25} />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
};

export default TableSkeleton;