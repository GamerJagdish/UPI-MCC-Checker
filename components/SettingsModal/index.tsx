import React from 'react';
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, X } from 'lucide-react-native';
import { SettingsView, ThemeColors } from '../../types';
import { styles } from '../../constants/styles';
import { SettingsMenu } from './SettingsMenu';
import { CameraSettings } from './CameraSettings';
import { AboutSection } from './AboutSection';

interface SettingsModalProps {
    visible: boolean;
    settingsView: SettingsView;
    theme: ThemeColors;
    isDark: boolean;
    availableCameras: MediaDeviceInfo[];
    selectedCameraId: string;
    onClose: () => void;
    onNavigateTo: (view: SettingsView) => void;
    onToggleTheme: (value: boolean) => void;
    hapticsEnabled: boolean;
    onToggleHaptics: (value: boolean) => void;
    onCameraSelect: (cameraId: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    visible,
    settingsView,
    theme,
    isDark,
    availableCameras,
    selectedCameraId,
    onClose,
    onNavigateTo,
    onToggleTheme,
    hapticsEnabled,
    onToggleHaptics,
    onCameraSelect,
}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}>
            <Pressable
                style={[styles.modalOverlay, { backgroundColor: theme.modalOverlay }]}
                onPress={onClose}>
                <Pressable
                    style={[styles.modalContent, { backgroundColor: theme.card }]}
                    onPress={(e) => e.stopPropagation()}>
                    <View style={styles.modalHeader}>
                        {settingsView !== 'menu' ? (
                            <TouchableOpacity
                                onPress={() => onNavigateTo('menu')}
                                style={styles.backButton}>
                                <ArrowLeft size={24} color={theme.textSecondary} />
                            </TouchableOpacity>
                        ) : null}
                        <Text style={[styles.modalTitle, { color: theme.text }]}>
                            {settingsView === 'menu' ? 'Settings' : settingsView === 'camera' ? 'Camera Settings' : 'About'}
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color={theme.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {settingsView === 'menu' && (
                        <SettingsMenu
                            theme={theme}
                            isDark={isDark}
                            onToggleTheme={onToggleTheme}
                            hapticsEnabled={hapticsEnabled}
                            onToggleHaptics={onToggleHaptics}
                            onNavigateTo={onNavigateTo}
                        />
                    )}

                    {settingsView === 'camera' && (
                        <CameraSettings
                            theme={theme}
                            isDark={isDark}
                            availableCameras={availableCameras}
                            selectedCameraId={selectedCameraId}
                            onCameraSelect={onCameraSelect}
                        />
                    )}

                    {settingsView === 'about' && (
                        <AboutSection theme={theme} />
                    )}
                </Pressable>
            </Pressable>
        </Modal>
    );
};
