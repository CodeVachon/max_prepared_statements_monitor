import { FC } from "react";
import { DownIcon, UpDownIcon, UpIcon } from "./Icons";
import { ClassNames } from "@codevachon/classnames";

export type TrendValue = "up" | "down" | "stale";

interface ITrendingProps {
    className?: string;
    state: TrendValue;
}

const Trending: FC<ITrendingProps> = ({ className = "", state = "stale" }) => {
    return state === "up" ? (
        <UpIcon className={new ClassNames("text-red-500").add(className).list()} />
    ) : state === "stale" ? (
        <UpDownIcon className={new ClassNames("text-amber-500").add(className).list()} />
    ) : (
        <DownIcon className={new ClassNames("text-green-500").add(className).list()} />
    );
};

export default Trending;
export { Trending };
