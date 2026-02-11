import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Clipboard, ToastAndroid, Platform } from 'react-native';
import { Github, Coffee, Check } from 'lucide-react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { ThemeColors } from '../../types';
import { styles } from '../../constants/styles';

interface AboutSectionProps {
    theme: ThemeColors;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
    const [upiCopied, setUpiCopied] = useState(false);
    const displayVersion = 
        Application.nativeApplicationVersion ?? 
        Constants.expoConfig?.version ?? 
        '1.2.3';

    const handleUPICopy = () => {
        const upiId = 'gamerjagdish@upi';
        Clipboard.setString(upiId);
        setUpiCopied(true);
        
        if (Platform.OS === 'android') {
            ToastAndroid.show('UPI ID copied to clipboard', ToastAndroid.SHORT);
        }
        
        setTimeout(() => setUpiCopied(false), 2000);
    };

    return (
        <ScrollView style={styles.settingsScrollView}>
            <View style={styles.settingsSection}>
                <View style={[styles.aboutContainer, { backgroundColor: theme.background }]}>

                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/images/hd-logo.png')} style={styles.logo} resizeMode="contain" />
                    </View>

                    <Text style={[styles.appName, { color: theme.text }]}>UPI MCC Checker</Text>

                    <View style={[styles.versionPill, { backgroundColor: theme.iconBg }]}>
                        <Text style={[styles.versionText, { color: theme.textSecondary }]}>v{displayVersion}</Text>
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
                            onPress={() => Linking.openURL('https://github.com/GamerJagdish/UPI-MCC-Checker')}>
                            <Github size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>GitHub</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.coffeeButton]}
                            onPress={() => Linking.openURL('https://buymeacoffee.com/gamerjagdish')}>
                            <Coffee size={20} color="#000" />
                            <Text style={[styles.actionButtonTextBlack]}>Buy Me a Coffee</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: '#2b71f0' }]}
                            onPress={handleUPICopy}>
                            {upiCopied ? (
                                <Check size={20} color="#fff" />
                            ) : (
                                <Image 
                                    source={require('../../assets/images/bhim.png')} 
                                    style={{ width: 20, height: 20, tintColor: '#fff' }} 
                                    resizeMode="contain" 
                                />
                            )}
                            <Text style={styles.actionButtonText}>
                                {upiCopied ? 'Copied!' : 'UPI Donation'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
