import React, { useRef, useEffect } from 'react';
import jsQR from 'jsqr';

interface WebCameraProps {
    selectedCameraId: string;
    scanned: boolean;
    onBarCodeScanned: (data: { data: string }) => void;
}

export const WebCamera: React.FC<WebCameraProps> = ({ selectedCameraId, scanned, onBarCodeScanned }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        let mounted = true;

        const startCamera = async () => {
            try {
                // Stop existing stream
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                }

                // Start new stream with selected camera
                const constraints: MediaStreamConstraints = {
                    video: selectedCameraId
                        ? { deviceId: { exact: selectedCameraId } }
                        : { facingMode: 'environment' },
                    audio: false,
                };

                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                streamRef.current = stream;

                if (videoRef.current && mounted) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }

                // Start scanning
                if (mounted) {
                    startScanning();
                }
            } catch (error) {
                console.error('Error starting camera:', error);
            }
        };

        const startScanning = () => {
            if (scanIntervalRef.current) {
                clearInterval(scanIntervalRef.current);
            }

            scanIntervalRef.current = setInterval(() => {
                if (videoRef.current && canvasRef.current && !scanned) {
                    const video = videoRef.current;
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');

                    if (ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const code = jsQR(imageData.data, imageData.width, imageData.height);

                        if (code) {
                            onBarCodeScanned({ data: code.data });
                        }
                    }
                }
            }, 300);
        };

        startCamera();

        return () => {
            mounted = false;
            if (scanIntervalRef.current) {
                clearInterval(scanIntervalRef.current);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [selectedCameraId, scanned, onBarCodeScanned]);

    return (
        <>
            <video
                ref={videoRef}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                playsInline
                muted
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
    );
};
