import ClassNames from "@codevachon/classnames";
import { useEffect, useState } from "react";
import { reverseRecords } from "~/lib/reverseRecords";
import { DownIcon, UpIcon } from "~/ui/Icons";
import { Line } from "react-chartjs-2";
// import "./../styles/global.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

let isUpdateRunning = false;

export default function Homepage() {
    const [data, setData] = useState<Array<{ x: string; y: number }>>([]);

    const updateData = () => {
        if (isUpdateRunning) {
            return;
        }

        isUpdateRunning = true;
        fetch("/api/value")
            .then((response) => {
                return response.json();
            })
            .then((recordSet) => {
                setData((current) => {
                    const updated = [...current].reverse();

                    const newDataset = [];
                    for (let i = 0; i < 25; i++) {
                        const thisRecord = updated[i];
                        if (thisRecord) {
                            newDataset.push(updated[i]);
                        }
                    }

                    newDataset.reverse().push({
                        x: new Date().toString(),
                        y: recordSet
                    });

                    isUpdateRunning = false;

                    return newDataset;
                });
            });
    };

    useEffect(() => {
        updateData();
        const interval = setInterval(() => {
            updateData();
        }, 1000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    const lastRecord = data[data.length - 1];
    const trending: "up" | "down" =
        (lastRecord?.y ?? 0) < (data[data.length - 2]?.y ?? 0) ? "down" : "up";

    return (
        <main className={new ClassNames(["h-screen"]).list()}>
            <div className="flex flex-col gap-4 h-full">
                {lastRecord && (
                    <h1 className={new ClassNames(["flex gap-6 items-center", "p-6"]).list()}>
                        <p>
                            {trending === "up" ? (
                                <UpIcon className="text-red-500 w-10 h-10" />
                            ) : (
                                <DownIcon className="text-green-500 w-10 h-10" />
                            )}
                        </p>

                        <p
                            className={new ClassNames(["text-4xl font-mono"])
                                .if(lastRecord.y > 12000 && lastRecord.y < 15000, "text-amber-500")
                                .if(lastRecord.y >= 15000, "text-red-500")
                                .list()}
                        >
                            {lastRecord.y}
                        </p>
                    </h1>
                )}
                <div className={new ClassNames(["p-6"]).list()}>
                    <Line
                        options={{
                            responsive: true
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
                <ul className={new ClassNames(["flex-grow overflow-y-auto", "p-6"]).list()}>
                    {reverseRecords(data).map((record) => (
                        <li
                            key={record.x}
                            className={new ClassNames(["flex gap-4 font-mono"]).list()}
                        >
                            <p>{dayjs(record.x ?? new Date()).format("YYYY-MM-DD HH:mm:ss")}</p>
                            <p
                                className={new ClassNames([])
                                    .if(
                                        lastRecord.y > 12000 && lastRecord.y < 15000,
                                        "text-amber-500"
                                    )
                                    .if(record.y > 15000, "text-red-500")
                                    .list()}
                            >
                                {record.y ?? 0}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <div></div>
        </main>
    );
}
