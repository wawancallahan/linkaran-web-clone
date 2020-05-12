declare module 'react-time-picker' {
    import * as React from 'react'

    export type TimePickerProps = {
        amPmAriaLabel?: string,
        autoFocus?: boolean,
        className?: string | string[],
        clearAriaLabel?: string,
        clearIcon?: string | React.ReactNode,
        clockAriaLabel?: string,
        clockClassName?: string | string[],
        clockIcon?: string | React.ReactNode,
        closeClock?: boolean,
        disabled?: boolean,
        disableClock?: boolean,
        format?: string,
        hourAriaLabel?: string,
        hourPlaceholder?: string,
        isOpen?: boolean,
        locale?: string,
        maxDetail?: string,
        maxTime?: Date | string,
        minTime?: Date | string,
        minuteAriaLabel?: string,
        minutePlaceholder?: string,
        name?: string,
        nativeInputAriaLabel?: string,
        onChange?: (value: any) => void,
        onClockClose?: () => void,
        onClockOpen?: () => void,
        required?: boolean,
        secondAriaLabel?: string,
        secondPlaceholder?: string,
        value?: Date | string   
    }

    declare class TimePicker extends React.Component<TimePickerProps> { }

    export default TimePicker
}

declare module 'react-time-picker/dist/entry.nostyle' {
    import * as React from 'react'

    export type TimePickerProps = {
        amPmAriaLabel?: string,
        autoFocus?: boolean,
        className?: string | string[],
        clearAriaLabel?: string,
        clearIcon?: string | React.ReactNode,
        clockAriaLabel?: string,
        clockClassName?: string | string[],
        clockIcon?: string | React.ReactNode,
        closeClock?: boolean,
        disabled?: boolean,
        disableClock?: boolean,
        format?: string,
        hourAriaLabel?: string,
        hourPlaceholder?: string,
        isOpen?: boolean,
        locale?: string,
        maxDetail?: string,
        maxTime?: Date | string,
        minTime?: Date | string,
        minuteAriaLabel?: string,
        minutePlaceholder?: string,
        name?: string,
        nativeInputAriaLabel?: string,
        onChange?: (value: any) => void,
        onClockClose?: () => void,
        onClockOpen?: () => void,
        required?: boolean,
        secondAriaLabel?: string,
        secondPlaceholder?: string,
        value?: Date | string   
    }

    declare class TimePicker extends React.Component<TimePickerProps> { }

    export default TimePicker
}