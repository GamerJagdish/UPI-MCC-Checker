import { MCCEntry } from '../types';
import mccData from '../../assets/mcc-short.json';

export const getMCCDescription = (mccCode: string): string => {
    const entry = (mccData as MCCEntry[]).find((item) => item.mcc === mccCode);
    if (entry) {
        return `${entry.mcc} - ${entry.description}`;
    }
    return mccCode;
};
