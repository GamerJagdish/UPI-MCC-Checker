import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { Github, Coffee } from 'lucide-react-native';
import { ThemeColors } from '../../types';
import { styles } from '../../constants/styles';

interface AboutSectionProps {
    theme: ThemeColors;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
    return (
        <ScrollView style={styles.settingsScrollView}>
            <View style={styles.settingsSection}>
                <View style={[styles.aboutContainer, { backgroundColor: theme.background }]}>

                    <View style={styles.logoContainer}>
                        <Image source={require('@/assets/images/hd-logo.png')} style={styles.logo} resizeMode="contain" />
                    </View>

                    <Text style={[styles.appName, { color: theme.text }]}>UPI MCC Checker</Text>

                    <View style={[styles.versionPill, { backgroundColor: theme.iconBg }]}>
                        <Text style={[styles.versionText, { color: theme.textSecondary }]}>v1.0.0</Text>
                    </View>

                    <Text style={[styles.appDescription, { color: theme.textSecondary, textAlign: 'center' }]}>
                        Scan UPI QR to view merchant details including MCC (Merchant Category Code),
                        payment information, and transaction details. Built with React Native and Expo.
                    </Text>

                    <View style={styles.developerSectionCentered}>
                        <Text style={[styles.developerLabel, { color: theme.textSecondary }]}>Designed & Developed by</Text>
                        <Text style={[styles.developerName, { color: theme.text }]}>GamerJagdish</Text>
                    </View>

                    <View style={styles.aboutActionButtons}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => Linking.openURL('https://github.com/GamerJagdish')}>
                            <Github size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>GitHub</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.coffeeButton]}
                            onPress={() => Linking.openURL('https://buymeacoffee.com/gamerjagdish')}>
                            <Coffee size={20} color="#000" />
                            <Text style={[styles.actionButtonTextBlack]}>Buy Me a Coffee</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
