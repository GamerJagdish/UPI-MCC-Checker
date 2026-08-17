import { Platform } from 'react-native';
import jsQR from 'jsqr';
import { Buffer } from 'buffer';
import * as ImageManipulator from 'expo-image-manipulator';
import jpeg from 'jpeg-js';

export const scanQRFromImage = async (imageUri: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
        // Web: Use jsQR to scan the image via canvas
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
        // Native: Manipulate and decode image bytes for jsQR
        try {
            const manipulated = await ImageManipulator.manipulateAsync(
                imageUri,
                [{ resize: { width: 1000 } }],
                {
                    compress: 0.9,
                    format: ImageManipulator.SaveFormat.JPEG,
                    base64: true,
                }
            );

            if (!manipulated.base64) {
                return null;
            }

            const imageBuffer = Buffer.from(manipulated.base64, 'base64');
            const rawImageData = jpeg.decode(imageBuffer, { useTArray: true });
            const code = jsQR(
                new Uint8ClampedArray(rawImageData.data),
                rawImageData.width,
                rawImageData.height
            );

            if (code) {
                return code.data;
            }
            return null;
        } catch (error) {
            console.error('Error scanning with jsQR:', error);
            return null;
        }
    }
};
