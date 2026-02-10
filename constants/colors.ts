import { ThemeColors } from '../types';

export const Colors: { light: ThemeColors; dark: ThemeColors } = {
    light: {
        background: '#f8fafc',
        card: '#ffffff',
        text: '#0f172a',
        textSecondary: '#64748b',
        border: '#e2e8f0',
        iconBg: '#eff6ff',
        modalOverlay: 'rgba(0, 0, 0, 0.5)',
        divider: '#e2e8f0',
    },
    dark: {
        background: '#0f172a',
        card: '#1e293b',
        text: '#f8fafc',
        textSecondary: '#94a3b8',
        border: '#334155',
        iconBg: '#1e3a8a',
        modalOverlay: 'rgba(0, 0, 0, 0.7)',
        divider: '#334155',
    },
};
