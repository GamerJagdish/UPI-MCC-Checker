import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Camera, AlertCircle } from 'lucide-react-native';
import { ThemeColors } from '../../types';
import { styles } from '../../constants/styles';

interface CameraSettingsProps {
    theme: ThemeColors;
    isDark: boolean;
    availableCameras: MediaDeviceInfo[];
    selectedCameraId: string;
    onCameraSelect: (cameraId: string) => void;
}

export const CameraSettings: React.FC<CameraSettingsProps> = ({
    theme,
    isDark,
    availableCameras,
    selectedCameraId,
    onCameraSelect,
}) => {
    return (
        <ScrollView style={styles.settingsScrollView}>
            <View style={styles.settingsSection}>
                <Text style={[styles.settingsSectionDescription, { color: theme.textSecondary }]}>
                    Choose which camera to use for scanning
                </Text>

                <View style={styles.cameraList}>
                    {availableCameras.map((camera, index) => (
                        <TouchableOpacity
                            key={camera.deviceId}
                            style={[
                                styles.cameraOption,
                                { backgroundColor: theme.background, borderColor: selectedCameraId === camera.deviceId ? '#3b82f6' : 'transparent' },
                                selectedCameraId === camera.deviceId && { backgroundColor: isDark ? '#1e3a8a' : '#eff6ff' },
                            ]}
                            onPress={() => onCameraSelect(camera.deviceId)}>
                            <View style={styles.cameraOptionContent}>
                                <Camera
                                    size={20}
                                    color={selectedCameraId === camera.deviceId ? '#3b82f6' : theme.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.cameraOptionText,
                                        { color: theme.textSecondary },
                                        selectedCameraId === camera.deviceId && styles.cameraOptionTextSelected,
                                    ]}>
                                    {camera.label || `Camera ${index + 1}`}
                                </Text>
                            </View>
                            {selectedCameraId === camera.deviceId && (
                                <View style={styles.selectedIndicator} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {availableCameras.length === 0 && (
                    <View style={styles.noCamerasContainer}>
                        <AlertCircle size={32} color={theme.textSecondary} />
                        <Text style={[styles.noCamerasText, { color: theme.textSecondary }]}>No cameras detected</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};
