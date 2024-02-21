import type { NextApiRequest, NextApiResponse } from "next";

import { prod } from "~/lib/prod";

const publicENVOutput = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === "GET") {
        const data = await prod
            .raw<[[{ Variable_name: "Prepared_stmt_count"; Value: string }]]>(
                `
                    SHOW GLOBAL STATUS LIKE '%prepared_stmt_count%';
                `
            )
            .then((recordSet) => {
                return Number(recordSet[0][0].Value);
            });
        res.json(data);
    } else {
        res.status(404).json({ error: "not found" });
    }
};

export default publicENVOutput;
