import { ThemeColors } from '../types';

export const Colors: { light: ThemeColors; dark: ThemeColors } = {
    light: {
        background: '#f8fafc',
        card: '#ffffff',
        text: '#0f172a',
        textSecondary: '#64748b',
        border: '#e2e8f0',
        iconBg: '#f1f5f9',
        modalOverlay: 'rgba(0, 0, 0, 0.5)',
        divider: '#e2e8f0',
    },
    dark: {
        background: '#000000',
        card: '#1a1a1a',
        text: '#ffffff',
        textSecondary: '#a1a1aa',
        border: '#3f3f46',
        iconBg: '#27272a',
        modalOverlay: 'rgba(0, 0, 0, 0.8)',
        divider: '#3f3f46',
    },
};
