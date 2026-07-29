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
    const selectedIconColor = isDark ? '#ffffff' : '#18181b';
    const selectedBorderColor = isDark ? '#52525b' : '#18181b';
    const selectedIndicatorColor = isDark ? '#ffffff' : '#18181b';

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
                                { backgroundColor: theme.background, borderColor: selectedCameraId === camera.deviceId ? selectedBorderColor : 'transparent' },
                                selectedCameraId === camera.deviceId && { backgroundColor: isDark ? '#27272a' : '#f1f5f9' },
                            ]}
                            onPress={() => onCameraSelect(camera.deviceId)}>
                            <View style={styles.cameraOptionContent}>
                                <Camera
                                    size={20}
                                    color={selectedCameraId === camera.deviceId ? selectedIconColor : theme.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.cameraOptionText,
                                        { color: theme.textSecondary },
                                        selectedCameraId === camera.deviceId && { color: selectedIconColor, fontWeight: '600' },
                                    ]}>
                                    {camera.label || `Camera ${index + 1}`}
                                </Text>
                            </View>
                            {selectedCameraId === camera.deviceId && (
                                <View style={[styles.selectedIndicator, { backgroundColor: selectedIndicatorColor }]} />
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
