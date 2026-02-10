import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Share } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { RefreshCw, Copy, AlertCircle, Settings } from 'lucide-react-native';
import { ThemeColors } from '../types';
import { styles } from '../constants/styles';

interface ErrorViewProps {
    type: 'no-qr' | 'invalid-upi';
    theme: ThemeColors;
    rawUrl?: string;
    copied?: boolean;
    onScanAgain: () => void;
    onCopy?: () => void;
    onSettingsPress: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
    type,
    theme,
    rawUrl,
    copied,
    onScanAgain,
    onCopy,
    onSettingsPress,
}) => {
    const handleCopy = async () => {
        if (!rawUrl || !onCopy) return;
        try {
            await Share.share({
                message: rawUrl,
                url: rawUrl,
            });
            onCopy();
        } catch (error) {
            console.error('Error copying:', error);
        }
    };

    return (
        <>
            <BlurView intensity={80} tint="dark" style={styles.headerBlurContainer}>
                <LinearGradient
                    colors={['rgba(30, 58, 138, 0.8)', 'rgba(59, 130, 246, 0.8)']}
                    style={styles.header}>
                    <Text style={styles.headerTitle}>UPI MCC Checker</Text>
                    <Text style={styles.headerSubtitle}>
                        {type === 'no-qr' ? 'No QR Code Found' : 'Invalid QR Code'}
                    </Text>
                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={onSettingsPress}>
                        <Settings size={28} color="#fff" />
                    </TouchableOpacity>
                </LinearGradient>
            </BlurView>

            <ScrollView style={styles.resultsContainer}>
                <View style={[styles.errorCard, { backgroundColor: theme.card }]}>
                    <View style={styles.errorIconContainer}>
                        <AlertCircle size={48} color={type === 'no-qr' ? '#f59e0b' : '#dc2626'} />
                    </View>
                    <Text style={[styles.errorCardTitle, { color: theme.text }]}>
                        {type === 'no-qr' ? 'No QR Code Found' : 'Not a UPI QR Code'}
                    </Text>
                    <Text style={[styles.errorCardMessage, { color: theme.textSecondary }]}>
                        {type === 'no-qr'
                            ? 'No QR code was detected in the selected image.'
                            : "The scanned QR code doesn't appear to be a valid UPI payment code."}
                    </Text>

                    {type === 'invalid-upi' && rawUrl && (
                        <View style={[styles.contentBox, { backgroundColor: theme.card }]}>
                            <Text style={[styles.contentLabel, { color: theme.textSecondary }]}>Scanned Content:</Text>
                            <Text style={[styles.contentValue, { color: theme.text }]}>{rawUrl}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.errorActionButtons}>
                {type === 'invalid-upi' && rawUrl && (
                    <TouchableOpacity
                        style={styles.copyButton}
                        onPress={handleCopy}>
                        <Copy size={20} color="#fff" />
                        <Text style={styles.copyButtonText}>
                            {copied ? 'Copied!' : 'Copy'}
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[styles.scanAgainButtonError, { backgroundColor: theme.card }]}
                    onPress={onScanAgain}>
                    <RefreshCw size={20} color="#3b82f6" />
                    <Text style={styles.scanAgainButtonTextError}>
                        {type === 'no-qr' ? 'Try Again' : 'Scan Again'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};
