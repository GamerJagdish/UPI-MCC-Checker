import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import {
  useCameraPermissions,
  PermissionResponse,
  PermissionStatus,
} from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCamera = () => {
  const [nativePermission, requestNativePermission] = useCameraPermissions();
  const [webPermission, setWebPermission] = useState<PermissionResponse | null>(
    () => {
      if (Platform.OS !== 'web') return null;
      return {
        status: PermissionStatus.UNDETERMINED,
        expires: 'never',
        canAskAgain: true,
        granted: false,
      };
    },
  );
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>(
    [],
  );
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [cameraKey, setCameraKey] = useState(0);

  const permission =
    Platform.OS === 'web'
      ? (nativePermission ?? webPermission)
      : nativePermission;

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'web') {
      try {
        if (navigator?.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          stream.getTracks().forEach((track) => track.stop());
          const grantedResponse: PermissionResponse = {
            status: PermissionStatus.GRANTED,
            expires: 'never',
            canAskAgain: true,
            granted: true,
          };
          setWebPermission(grantedResponse);

          // Refresh camera list
          const devices = await navigator.mediaDevices.enumerateDevices();
          const cameras = devices.filter(
            (device) => device.kind === 'videoinput',
          );
          setAvailableCameras(cameras);
          if (cameras.length > 0) {
            setSelectedCameraId((prev) => prev || cameras[0].deviceId);
          }

          return grantedResponse;
        }
      } catch (err) {
        console.warn('Camera permission denied or unavailable on web:', err);
        const deniedResponse: PermissionResponse = {
          status: PermissionStatus.DENIED,
          expires: 'never',
          canAskAgain: true,
          granted: false,
        };
        setWebPermission(deniedResponse);
        return deniedResponse;
      }
    }
    return requestNativePermission();
  }, [requestNativePermission]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const loadSavedCameraAndDevices = async () => {
        try {
          if (!navigator?.mediaDevices?.enumerateDevices) return;

          // Load saved camera preference
          const savedCameraId = await AsyncStorage.getItem('selectedCameraId');

          // Get available cameras
          const devices = await navigator.mediaDevices.enumerateDevices();
          const cameras = devices.filter(
            (device) => device.kind === 'videoinput',
          );
          setAvailableCameras(cameras);

          // If cameras have labels, permission has already been granted in this session
          if (cameras.some((cam) => cam.label && cam.label.length > 0)) {
            setWebPermission({
              status: PermissionStatus.GRANTED,
              expires: 'never',
              canAskAgain: true,
              granted: true,
            });
          }

          // Set the camera ID
          if (
            savedCameraId &&
            cameras.some((cam) => cam.deviceId === savedCameraId)
          ) {
            setSelectedCameraId(savedCameraId);
          } else if (cameras.length > 0) {
            setSelectedCameraId(cameras[0].deviceId);
          }
        } catch (error) {
          console.error('Error loading cameras:', error);
        }
      };

      loadSavedCameraAndDevices();
    }
  }, []);

  const handleCameraSelection = async (cameraId: string) => {
    try {
      setSelectedCameraId(cameraId);
      await AsyncStorage.setItem('selectedCameraId', cameraId);
      setCameraKey((prev) => prev + 1); // Force camera remount
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
