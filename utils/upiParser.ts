import { UPIParams } from '../types';

export const parseUPIUrl = (url: string): UPIParams | null => {
    try {
        if (!url.startsWith('upi://')) {
            return null;
        }

        const urlObj = new URL(url);
        const params: UPIParams = {};

        urlObj.searchParams.forEach((value, key) => {
            params[key as keyof UPIParams] = value;
        });

        return params;
    } catch (error) {
        console.error('Error parsing UPI URL:', error);
        return null;
    }
};
