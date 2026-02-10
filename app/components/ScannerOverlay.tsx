import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../constants/styles';

export const ScannerOverlay: React.FC = () => {
    return (
        <View style={styles.scannerOverlay}>
            <View style={styles.scannerFrame} />
            <Text style={styles.scannerInstruction}>
                Point your camera at a UPI QR code
            </Text>
        </View>
    );
};
