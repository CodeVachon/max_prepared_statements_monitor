import ClassNames from "@codevachon/classnames";
import { FC } from "react";

interface IconProps {
    className?: string | ClassNames;
}

export const UpIcon: FC<IconProps> = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={new ClassNames()
            .add(className)
            .ifNotAdd(new RegExp("w-([0-9]{1,}|auto)"), "w-6")
            .ifNotAdd(new RegExp("h-([0-9]{1,}|auto)"), "w-h")
            .list()}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
    </svg>
);

export const DownIcon: FC<IconProps> = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={new ClassNames()
            .add(className)
            .ifNotAdd(new RegExp("w-([0-9]{1,}|auto)"), "w-6")
            .ifNotAdd(new RegExp("h-([0-9]{1,}|auto)"), "w-h")
            .list()}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
    </svg>
);

export const UpDownIcon: FC<IconProps> = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={new ClassNames()
            .add(className)
            .ifNotAdd(new RegExp("w-([0-9]{1,}|auto)"), "w-6")
            .ifNotAdd(new RegExp("h-([0-9]{1,}|auto)"), "w-h")
            .list()}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        />
    </svg>
);
