import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

export const useHaptics = () => {
    const [hapticsEnabled, setHapticsEnabled] = useState(true);

    useEffect(() => {
        loadHapticsPreference();
    }, []);

    const loadHapticsPreference = async () => {
        try {
            const savedPreference = await AsyncStorage.getItem('hapticsEnabled');
            if (savedPreference !== null) {
                setHapticsEnabled(savedPreference === 'true');
            }
        } catch (error) {
            console.error('Error loading haptics preference:', error);
        }
    };

    const toggleHaptics = async (value: boolean) => {
        try {
            setHapticsEnabled(value);
            await AsyncStorage.setItem('hapticsEnabled', String(value));
            // Light selection-style haptic on toggle change
            await Haptics.selectionAsync();
        } catch (error) {
            console.error('Error saving haptics preference:', error);
        }
    };

    const triggerSuccessHaptic = () => {
        if (hapticsEnabled) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    };

    return {
        hapticsEnabled,
        toggleHaptics,
        triggerSuccessHaptic,
    };
};
