interface IGenerateRandomStringArgs {
    characters?: string;
    length?: number;
}

/**
 * Helper to generate a random string that is 20 characters long
 * @returns string randomly generated string
 */
export const generateRandomString = (options: IGenerateRandomStringArgs = {}): string => {
    const seed =
        options.characters || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const len = options.length || 20;
    let randomStr = "";

    for (let i = 0; i < len; i++) {
        const randomNum = Math.floor(Math.random() * seed.length);
        randomStr += seed[randomNum];
    }

    return randomStr;
};
