export interface UPIParams {
    pa?: string;
    pn?: string;
    mc?: string;
    tr?: string;
    tn?: string;
    am?: string;
    cu?: string;
    ver?: string;
    mode?: string;
    purpose?: string;
    orgid?: string;
    sign?: string;
}

export interface MCCEntry {
    id: number;
    mcc: string;
    description: string;
}

export type ThemeMode = 'system' | 'light' | 'dark';

export type SettingsView = 'menu' | 'camera' | 'about';

export interface ThemeColors {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    iconBg: string;
    modalOverlay: string;
    divider: string;
}
