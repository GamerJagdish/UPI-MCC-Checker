import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { RefreshCw, ArrowRight, Settings } from 'lucide-react-native';
import { UPIParams, ThemeColors } from '../types';
import { styles } from '../constants/styles';
import { getMCCDescription } from '../utils/mccHelper';

interface ResultsViewProps {
    upiData: UPIParams;
    theme: ThemeColors;
    onScanAgain: () => void;
    onPayment: () => void;
    onSettingsPress: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
    upiData,
    theme,
    onScanAgain,
    onPayment,
    onSettingsPress,
}) => {
    return (
        <>
            <BlurView intensity={80} tint="dark" style={styles.headerBlurContainer}>
                <LinearGradient
                    colors={['rgba(30, 58, 138, 0.8)', 'rgba(59, 130, 246, 0.8)']}
                    style={styles.header}>
                    <Text style={styles.headerTitle}>UPI MCC Checker</Text>
                    <Text style={styles.headerSubtitle}>Payment Details</Text>
                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={onSettingsPress}>
                        <Settings size={28} color="#fff" />
                    </TouchableOpacity>
                </LinearGradient>
            </BlurView>

            <ScrollView style={styles.resultsContainer}>
                <View style={[styles.resultCard, { backgroundColor: theme.card }]}>
                    {upiData.pn && (
                        <View style={[styles.paramRow, { borderBottomColor: theme.border }]}>
                            <Text style={[styles.paramLabel, { color: theme.textSecondary }]}>Merchant Name</Text>
                            <Text style={[styles.paramValue, { color: theme.text }]}>{upiData.pn}</Text>
                        </View>
                    )}

                    {upiData.pa && (
                        <View style={[styles.paramRow, { borderBottomColor: theme.border }]}>
                            <Text style={[styles.paramLabel, { color: theme.textSecondary }]}>Merchant VPA</Text>
                            <Text style={[styles.paramValue, { color: theme.text }]}>{upiData.pa}</Text>
                        </View>
                    )}

                    {upiData.mc && (
                        <View style={[styles.paramRow, { borderBottomColor: theme.border }]}>
                            <Text style={[styles.paramLabel, { color: theme.textSecondary }]}>Merchant Code (MCC)</Text>
                            <Text style={[styles.paramValue, { color: theme.text }]}>{getMCCDescription(upiData.mc)}</Text>
                        </View>
                    )}

                    {upiData.am && (
                        <View style={[styles.paramRow, { borderBottomColor: theme.border }]}>
                            <Text style={[styles.paramLabel, { color: theme.textSecondary }]}>Amount</Text>
                            <Text style={[styles.paramValue, { color: theme.text }]}>
                                {upiData.cu || 'INR'} {upiData.am}
                            </Text>
                        </View>
                    )}

                    {upiData.tr && (
                        <View style={[styles.paramRow, { borderBottomColor: theme.border }]}>
                            <Text style={[styles.paramLabel, { color: theme.textSecondary }]}>Transaction Ref ID</Text>
                            <Text style={[styles.paramValue, { color: theme.text }]}>{upiData.tr}</Text>
                        </View>
                    )}

                    {upiData.tn && (
                        <View style={[styles.paramRow, { borderBottomColor: theme.border }]}>
                            <Text style={[styles.paramLabel, { color: theme.textSecondary }]}>Transaction Note</Text>
                            <Text style={[styles.paramValue, { color: theme.text }]}>{upiData.tn}</Text>
                        </View>
                    )}

                    {upiData.orgid && (
                        <View style={[styles.paramRow, { borderBottomColor: theme.border }]}>
                            <Text style={[styles.paramLabel, { color: theme.textSecondary }]}>Organization ID</Text>
                            <Text style={[styles.paramValue, { color: theme.text }]}>{upiData.orgid}</Text>
                        </View>
                    )}

                    {upiData.ver && (
                        <View style={[styles.paramRow, { borderBottomColor: theme.border }]}>
                            <Text style={[styles.paramLabel, { color: theme.textSecondary }]}>Version</Text>
                            <Text style={[styles.paramValue, { color: theme.text }]}>{upiData.ver}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={[styles.scanAgainButton, { backgroundColor: theme.card, borderColor: '#3b82f6' }]}
                    onPress={onScanAgain}>
                    <RefreshCw size={20} color="#3b82f6" />
                    <Text style={styles.scanAgainButtonText}>Scan Again</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.goButton} onPress={onPayment}>
                    <Text style={styles.goButtonText}>Go</Text>
                    <ArrowRight size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    );
};
