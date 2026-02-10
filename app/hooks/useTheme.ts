import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ThemeColors } from '../types';
import { Colors } from '../constants/colors';

export const useTheme = () => {
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState<ThemeMode>('system');

    const isDark = themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';
    const theme: ThemeColors = Colors[isDark ? 'dark' : 'light'];

    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('themeMode');
            if (savedTheme === 'light' || savedTheme === 'dark') {
                setThemeMode(savedTheme);
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
        }
    };

    const toggleTheme = async (value: boolean) => {
        try {
            const newMode = value ? 'dark' : 'light';
            setThemeMode(newMode);
            await AsyncStorage.setItem('themeMode', newMode);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    return {
        themeMode,
        isDark,
        theme,
        toggleTheme,
    };
};
