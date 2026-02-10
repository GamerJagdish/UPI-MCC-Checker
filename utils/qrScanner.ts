import { Platform } from 'react-native';
import { Camera } from 'expo-camera';
import jsQR from 'jsqr';

export const scanQRFromImage = async (imageUri: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
        // Web: Use jsQR to scan the image
        return new Promise((resolve) => {
            const img = new window.Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    resolve(null);
                    return;
                }
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                resolve(code ? code.data : null);
            };
            img.onerror = () => resolve(null);
            img.src = imageUri;
        });
    } else {
        // Native: Use Camera.scanFromURLAsync
        try {
            const scanResults = await Camera.scanFromURLAsync(imageUri, ['qr']);
            if (scanResults && scanResults.length > 0) {
                return scanResults[0].data;
            }
            return null;
        } catch (error) {
            console.error('Error scanning with Camera.scanFromURLAsync:', error);
            return null;
        }
    }
};
