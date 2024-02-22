import ClassNames from "@codevachon/classnames";
import { useEffect, useState } from "react";
import { reverseRecords } from "~/lib/reverseRecords";
import { Line } from "react-chartjs-2";

import dayjs from "dayjs";
import { generateRandomString } from "~/lib/generateRandomString";
import { isSameValue } from "~/lib/isSameValue";
import { isTrendingDown } from "~/lib/isTrendingDown";
import { TrendValue, Trending } from "~/ui/Trending";

export default function Homepage() {
    const [data, setData] = useState<Array<{ id: string; x: string; y: number }>>([]);

    const updateData = () => {
        fetch("/api/value")
            .then((response) => {
                return response.json();
            })
            .then((record) => {
                setData((current) => {
                    const updated = [...current].reverse().slice(0, 24).reverse();

                    updated.push({
                        id: generateRandomString(),
                        x: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                        y: record
                    });

                    return updated;
                });
            });
    };

    useEffect(() => {
        updateData();
        const interval = setInterval(() => {
            updateData();
        }, 1005);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    // Get the Most Recent Record
    const currentRecord = data[data.length - 1];

    // Get a recordSet to see how we are trending
    const trendingRecordSet = data
        .map((r) => r.y)
        .reverse()
        .slice(0, data.length > 5 ? Math.round(data.length / 2) : 5) // only use half the record set
        .reverse();

    // Figure out if we are trending Up or Down
    const trending: TrendValue = isSameValue(trendingRecordSet)
        ? "stale"
        : isTrendingDown(trendingRecordSet)
          ? "down"
          : "up";

    // Set some colours for values
    const statusClass = (value: number) =>
        new ClassNames()
            .if(value < 12000, "text-emerald-500")
            .if(value >= 12000 && value < 15000, "text-amber-500")
            .if(value >= 15000, "text-red-500")
            .list();

    // Reverse the RecordSet for the Logs
    const logRecords = reverseRecords(data);

    return (
        <main className={new ClassNames(["h-screen"]).list()}>
            <div className="flex flex-col gap-4 h-full">
                {currentRecord && (
                    <h1 className={new ClassNames(["flex gap-6 items-center", "p-6"]).list()}>
                        <p>
                            <Trending state={trending} className="w-10 h-10" />
                        </p>

                        <p
                            className={new ClassNames(["text-4xl font-mono"])
                                .add(statusClass(currentRecord.y))

                                .list()}
                        >
                            {currentRecord.y}
                        </p>
                    </h1>
                )}
                <div className={new ClassNames(["px-6"]).list()}>
                    <Line
                        options={{
                            responsive: true,
                            scales: {
                                y: {
                                    ticks: {
                                        callback: function (value) {
                                            // only integers
                                            if (Number(value) % 1 === 0) {
                                                return value;
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                        data={{
                            labels: data.map((r) => dayjs(r.x).format("HH:mm:ss")),
                            datasets: [
                                {
                                    label: "prepared statements",
                                    data: data.map((r) => r.y), //[12, 19, 3, 5, 2, 3],
                                    borderWidth: 1,
                                    borderColor: "rgb(255, 0, 0)"
                                }
                            ]
                        }}
                    />
                </div>
                <ul className={new ClassNames(["flex-grow overflow-y-auto", "px-6 pb-6"]).list()}>
                    {logRecords.map((record, i) => {
                        const nextY = logRecords[i + 1]?.y;
                        const thisY = record.y;

                        const trend: TrendValue =
                            thisY === nextY || !nextY ? "stale" : thisY > nextY ? "up" : "down";

                        return (
                            <li
                                key={record.id}
                                className={new ClassNames([
                                    "flex items-center gap-4 font-mono"
                                ]).list()}
                            >
                                <p className={new ClassNames(["text-slate-500"]).list()}>
                                    {record.x}
                                </p>
                                <div>
                                    <Trending state={trend} className="w-4 h-4" />
                                </div>
                                <p className={new ClassNames([]).add(statusClass(record.y)).list()}>
                                    {record.y ?? 0}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </main>
    );
}
