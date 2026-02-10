import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera as CameraIcon } from 'lucide-react-native';
import { styles } from '../constants/styles';

interface PermissionViewProps {
    onRequestPermission: () => void;
}

export const PermissionView: React.FC<PermissionViewProps> = ({ onRequestPermission }) => {
    return (
        <LinearGradient
            colors={['#1e3a8a', '#3b82f6']}
            style={styles.permissionContainer}>
            <CameraIcon size={64} color="#fff" strokeWidth={1.5} />
            <Text style={styles.permissionTitle}>Camera Access Required</Text>
            <Text style={styles.permissionMessage}>
                We need your permission to scan QR codes
            </Text>
            <TouchableOpacity
                style={styles.permissionButton}
                onPress={onRequestPermission}>
                <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};
