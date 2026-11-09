import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Camera as CameraIcon,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react-native';
import { styles } from '../constants/styles';

interface PermissionViewProps {
  onRequestPermission: () => void;
  onSelectPhoto: () => void;
}

export const PermissionView: React.FC<PermissionViewProps> = ({
  onRequestPermission,
  onSelectPhoto,
}) => {
  const handleLearnMore = () => {
    Linking.openURL(
      'https://github.com/GamerJagdish/UPI-MCC-Checker/blob/master/README.md#how-it-works',
    );
  };

  return (
    <LinearGradient
      colors={['#000000', '#27272a']}
      style={styles.permissionContainer}
    >
      <CameraIcon size={64} color="#fff" strokeWidth={1.5} />
      <Text style={styles.permissionTitle}>Camera Access Required</Text>
      <Text style={styles.permissionMessage}>
        We need your permission to scan QR codes
      </Text>
      <Text style={[styles.permissionMessage, { marginTop: 8 }]}>
        We only use the camera locally to scan QR codes. No images leave your
        device.
      </Text>

      <View
        style={{ gap: 12, alignItems: 'center', width: '100%', maxWidth: 280 }}
      >
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={onRequestPermission}
          activeOpacity={0.8}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.permissionSecondaryButton}
          onPress={onSelectPhoto}
          activeOpacity={0.8}
        >
          <ImageIcon size={20} color="#fff" />
          <Text style={styles.permissionSecondaryButtonText}>Upload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            gap: 6,
          }}
          onPress={handleLearnMore}
        >
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>
            Learn More
          </Text>
          <ExternalLink size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
