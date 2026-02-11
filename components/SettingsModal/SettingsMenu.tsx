import React from 'react';
import { View, Text, TouchableOpacity, Switch, Platform } from 'react-native';
import { ArrowRight, Camera, Moon, Info, Zap } from 'lucide-react-native';
import { ThemeColors } from '../../types';
import { styles } from '../../constants/styles';

interface SettingsMenuProps {
    theme: ThemeColors;
    isDark: boolean;
    onToggleTheme: (value: boolean) => void;
    hapticsEnabled: boolean;
    onToggleHaptics: (value: boolean) => void;
    onNavigateTo: (view: 'camera' | 'about') => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
    theme,
    isDark,
    onToggleTheme,
    hapticsEnabled,
    onToggleHaptics,
    onNavigateTo,
}) => {
    return (
        <View style={styles.settingsMenu}>
            {Platform.OS === 'web' && (
                <TouchableOpacity
                    style={[styles.menuItem, { backgroundColor: theme.background }]}
                    onPress={() => onNavigateTo('camera')}>
                    <View style={[styles.menuItemIcon, { backgroundColor: theme.iconBg }]}>
                        <Camera size={24} color="#3b82f6" />
                    </View>
                    <View style={styles.menuItemContent}>
                        <Text style={[styles.menuItemTitle, { color: theme.text }]}>Camera Settings</Text>
                        <Text style={[styles.menuItemDescription, { color: theme.textSecondary }]}>Choose which camera to use</Text>
                    </View>
                    <ArrowRight size={20} color={theme.border} />
                </TouchableOpacity>
            )}

            <View style={[styles.menuItem, { backgroundColor: theme.background }]}>
                <View style={[styles.menuItemIcon, { backgroundColor: theme.iconBg }]}>
                    <Moon size={24} color="#3b82f6" />
                </View>
                <View style={styles.menuItemContent}>
                    <Text style={[styles.menuItemTitle, { color: theme.text }]}>Dark Mode</Text>
                    <Text style={[styles.menuItemDescription, { color: theme.textSecondary }]}>Switch between dark and light themes</Text>
                </View>
                <Switch
                    trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
                    thumbColor={Platform.OS === 'ios' ? '#fff' : isDark ? '#fff' : '#f4f3f4'}
                    ios_backgroundColor="#cbd5e1"
                    onValueChange={onToggleTheme}
                    value={isDark}
                />
            </View>

            <View style={[styles.menuItem, { backgroundColor: theme.background }]}>
                <View style={[styles.menuItemIcon, { backgroundColor: theme.iconBg }]}>
                    <Zap size={24} color="#3b82f6" />
                </View>
                <View style={styles.menuItemContent}>
                    <Text style={[styles.menuItemTitle, { color: theme.text }]}>Haptics</Text>
                    <Text style={[styles.menuItemDescription, { color: theme.textSecondary }]}>Vibrate on successful scan</Text>
                </View>
                <Switch
                    trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
                    thumbColor={Platform.OS === 'ios' ? '#fff' : hapticsEnabled ? '#fff' : '#f4f3f4'}
                    ios_backgroundColor="#cbd5e1"
                    onValueChange={onToggleHaptics}
                    value={hapticsEnabled}
                />
            </View>

            <TouchableOpacity
                style={[styles.menuItem, { backgroundColor: theme.background }]}
                onPress={() => onNavigateTo('about')}>
                <View style={[styles.menuItemIcon, { backgroundColor: theme.iconBg }]}>
                    <Info size={24} color="#3b82f6" />
                </View>
                <View style={styles.menuItemContent}>
                    <Text style={[styles.menuItemTitle, { color: theme.text }]}>About</Text>
                    <Text style={[styles.menuItemDescription, { color: theme.textSecondary }]}>App info and developer details</Text>
                </View>
                <ArrowRight size={20} color={theme.border} />
            </TouchableOpacity>
        </View>
    );
};
