import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCamera = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
    const [selectedCameraId, setSelectedCameraId] = useState<string>('');
    const [cameraKey, setCameraKey] = useState(0);

    useEffect(() => {
        if (Platform.OS === 'web') {
            loadSavedCameraAndDevices();
        }
    }, []);

    const loadSavedCameraAndDevices = async () => {
        try {
            // Load saved camera preference
            const savedCameraId = await AsyncStorage.getItem('selectedCameraId');

            // Get available cameras
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === 'videoinput');
            setAvailableCameras(cameras);

            // Set the camera ID
            if (savedCameraId && cameras.some(cam => cam.deviceId === savedCameraId)) {
                setSelectedCameraId(savedCameraId);
            } else if (cameras.length > 0) {
                setSelectedCameraId(cameras[0].deviceId);
            }
        } catch (error) {
            console.error('Error loading cameras:', error);
        }
    };

    const handleCameraSelection = async (cameraId: string) => {
        try {
            setSelectedCameraId(cameraId);
            await AsyncStorage.setItem('selectedCameraId', cameraId);
            setCameraKey(prev => prev + 1); // Force camera remount
        } catch (error) {
            console.error('Error saving camera selection:', error);
        }
    };

    return {
        permission,
        requestPermission,
        availableCameras,
        selectedCameraId,
        cameraKey,
        handleCameraSelection,
    };
};
