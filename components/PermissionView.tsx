import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera as CameraIcon, ExternalLink } from 'lucide-react-native';
import { styles } from '../constants/styles';

interface PermissionViewProps {
    onRequestPermission: () => void;
}

export const PermissionView: React.FC<PermissionViewProps> = ({ onRequestPermission }) => {
    const handleLearnMore = () => {
        Linking.openURL('https://github.com/GamerJagdish/UPI-MCC-Checker/blob/master/.github%2FREADME.md#how-it-works');
    };

    return (
        <LinearGradient
            colors={['#1e3a8a', '#3b82f6']}
            style={styles.permissionContainer}>
            <CameraIcon size={64} color="#fff" strokeWidth={1.5} />
            <Text style={styles.permissionTitle}>Camera Access Required</Text>
            <Text style={styles.permissionMessage}>
                We need your permission to scan QR codes
            </Text>
            <Text style={[styles.permissionMessage, { marginTop: 8 }]}>
                We only use the camera locally to scan QR codes. No images leave your device.
            </Text>
            
            <View style={{ gap: 12, alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={onRequestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        padding: 12,
                        gap: 6 
                    }}
                    onPress={handleLearnMore}>
                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>Learn More</Text>
                    <ExternalLink size={14} color="#fff" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};
