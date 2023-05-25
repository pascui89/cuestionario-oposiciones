export const generateUniqueKey = (): string => {
    return Math.random().toString(36).substr(2, 9);
}

export const getRandomNumber = (): number => {
    return 21;//Math.floor(Math.random() * 69) + 1;
}