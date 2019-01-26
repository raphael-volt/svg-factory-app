export const getStringValuesFromEnum = <T>(myEnum: T): keyof T => {
    return Object.keys(myEnum).filter(k => typeof (myEnum as any)[k] === 'number') as any;
}