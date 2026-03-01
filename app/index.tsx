import { useState } from 'react';
import * as React from 'react';
import {
  View,
  Text,
  Linking,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView, BlurTargetView } from 'expo-blur';
import { RefreshCw, Settings, Image as ImageIcon } from 'lucide-react-native';

// Types
import { UPIParams, SettingsView } from '../types';

// Constants
import { styles } from '../constants/styles';

// Hooks
import { useTheme } from '../hooks/useTheme';
import { useCamera } from '../hooks/useCamera';
import { useHaptics } from '../hooks/useHaptics';

// Utils
import { parseUPIUrl } from '../utils/upiParser';
import { scanQRFromImage } from '../utils/qrScanner';

// Components
import { WebCamera } from '../components/WebCamera';
import { PermissionView } from '../components/PermissionView';
import { ScannerOverlay } from '../components/ScannerOverlay';
import { ResultsView } from '../components/ResultsView';
import { ErrorView } from '../components/ErrorView';
import { SettingsModal } from '../components/SettingsModal';

export default function Home() {
  const { isDark, theme, toggleTheme } = useTheme();
  const { hapticsEnabled, toggleHaptics, triggerSuccessHaptic } = useHaptics();
  const {
    permission,
    requestPermission,
    availableCameras,
    selectedCameraId,
    cameraKey,
    handleCameraSelection,
  } = useCamera();

  const [scanned, setScanned] = useState(false);
  const [upiData, setUpiData] = useState<UPIParams | null>(null);
  const [rawUrl, setRawUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [noQRFound, setNoQRFound] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [settingsView, setSettingsView] = useState<SettingsView>('menu');

  const blurTargetRef = React.useRef<View>(null);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    // Trigger haptic feedback on successful scan
    triggerSuccessHaptic();
    
    setRawUrl(data);
    const parsed = parseUPIUrl(data);
    setUpiData(parsed);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setUpiData(null);
    setRawUrl('');
    setCopied(false);
    setSelectedImage(null);
    setNoQRFound(false);
  };

  const handlePayment = () => {
    if (rawUrl) {
      Linking.openURL(rawUrl);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        setScanned(true);
        setNoQRFound(false);

        // Scan QR code from the selected image
        try {
          const qrData = await scanQRFromImage(imageUri);

          if (qrData) {
            setRawUrl(qrData);
            const parsed = parseUPIUrl(qrData);
            setUpiData(parsed);
            setNoQRFound(false);
          } else {
            setNoQRFound(true);
            setUpiData(null);
            setRawUrl('');
          }
        } catch (scanError) {
          console.error('Error scanning QR code:', scanError);
          setNoQRFound(true);
          setUpiData(null);
          setRawUrl('');
        }

        setSelectedImage(null);
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
      setNoQRFound(true);
      setScanned(true);
    }
  };

  const handleSettingsClose = () => {
    setSettingsVisible(false);
    setSettingsView('menu');
  };

  const handleCameraSelectionWrapper = async (cameraId: string) => {
    await handleCameraSelection(cameraId);
    setSettingsView('menu');
    setSettingsVisible(false);
  };

  // Loading state
  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style={isDark ? "light" : "dark"} translucent backgroundColor="transparent" />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading camera...</Text>
      </View>
    );
  }

  // Permission not granted
  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <PermissionView onRequestPermission={requestPermission} />
      </View>
    );
  }

  // Results view (successful scan)
  if (scanned && upiData) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <ResultsView
          upiData={upiData}
          theme={theme}
          onScanAgain={handleScanAgain}
          onPayment={handlePayment}
          onSettingsPress={() => setSettingsVisible(true)}
        />
        <SettingsModal
          visible={settingsVisible}
          settingsView={settingsView}
          theme={theme}
          isDark={isDark}
          availableCameras={availableCameras}
          selectedCameraId={selectedCameraId}
          onClose={handleSettingsClose}
          onNavigateTo={setSettingsView}
          onToggleTheme={toggleTheme}
          hapticsEnabled={hapticsEnabled}
          onToggleHaptics={toggleHaptics}
          onCameraSelect={handleCameraSelectionWrapper}
        />
      </View>
    );
  }

  // Error view (no QR found)
  if (scanned && noQRFound) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <ErrorView
          type="no-qr"
          theme={theme}
          onScanAgain={handleScanAgain}
          onSettingsPress={() => setSettingsVisible(true)}
        />
        <SettingsModal
          visible={settingsVisible}
          settingsView={settingsView}
          theme={theme}
          isDark={isDark}
          availableCameras={availableCameras}
          selectedCameraId={selectedCameraId}
          onClose={handleSettingsClose}
          onNavigateTo={setSettingsView}
          onToggleTheme={toggleTheme}
          hapticsEnabled={hapticsEnabled}
          onToggleHaptics={toggleHaptics}
          onCameraSelect={handleCameraSelectionWrapper}
        />
      </View>
    );
  }

  // Error view (invalid UPI)
  if (scanned && !upiData && rawUrl) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <ErrorView
          type="invalid-upi"
          theme={theme}
          rawUrl={rawUrl}
          copied={copied}
          onScanAgain={handleScanAgain}
          onCopy={handleCopy}
          onSettingsPress={() => setSettingsVisible(true)}
        />
        <SettingsModal
          visible={settingsVisible}
          settingsView={settingsView}
          theme={theme}
          isDark={isDark}
          availableCameras={availableCameras}
          selectedCameraId={selectedCameraId}
          onClose={handleSettingsClose}
          onNavigateTo={setSettingsView}
          onToggleTheme={toggleTheme}
          hapticsEnabled={hapticsEnabled}
          onToggleHaptics={toggleHaptics}
          onCameraSelect={handleCameraSelectionWrapper}
        />
      </View>
    );
  }

  // Processing image view
  if (selectedImage && noQRFound === false && !upiData) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Image
          source={{ uri: selectedImage }}
          style={styles.selectedImage}
        />

        <View style={styles.processingOverlay}>
          <Text style={styles.processingText}>Processing image...</Text>
        </View>

        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity
            style={[styles.scanAgainButtonError, { backgroundColor: theme.card }]}
            onPress={handleScanAgain}>
            <RefreshCw size={20} color="#3b82f6" />
            <Text style={styles.scanAgainButtonTextError}>Back</Text>
          </TouchableOpacity>
        </View>

        <SettingsModal
          visible={settingsVisible}
          settingsView={settingsView}
          theme={theme}
          isDark={isDark}
          availableCameras={availableCameras}
          selectedCameraId={selectedCameraId}
          onClose={handleSettingsClose}
          onNavigateTo={setSettingsView}
          onToggleTheme={toggleTheme}
          hapticsEnabled={hapticsEnabled}
          onToggleHaptics={toggleHaptics}
          onCameraSelect={handleCameraSelectionWrapper}
        />
      </View>
    );
  }

  // Camera view (default)
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      
      <BlurTargetView ref={blurTargetRef} style={StyleSheet.absoluteFill}>
        {Platform.OS === 'web' ? (
          <View style={styles.camera}>
            <WebCamera
              selectedCameraId={selectedCameraId}
              scanned={scanned}
              onBarCodeScanned={handleBarCodeScanned}
            />
          </View>
        ) : (
          <CameraView
            key={cameraKey}
            style={styles.camera}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        )}
        <ScannerOverlay />
      </BlurTargetView>

      <BlurView intensity={80} tint="dark" style={styles.headerBlurContainer} blurTarget={blurTargetRef} blurMethod="dimezisBlurViewSdk31Plus">
        <LinearGradient colors={['rgba(30, 58, 138, 0.8)', 'rgba(59, 130, 246, 0.8)']} style={styles.header}>
          <Text style={styles.headerTitle}>UPI MCC Checker</Text>
          <Text style={styles.headerSubtitle}>Scan UPI QR Code</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setSettingsVisible(true)}>
            <Settings size={28} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </BlurView>

      <BlurView intensity={80} tint="dark" style={styles.blurWrapper} blurTarget={blurTargetRef} blurMethod="dimezisBlurViewSdk31Plus">
        <TouchableOpacity
          style={styles.floatingSelectButton}
          onPress={handleSelectPhoto}
          activeOpacity={0.8}>
          <ImageIcon size={24} color="#fff" />
          <Text style={styles.floatingSelectButtonText}>Select Photo</Text>
        </TouchableOpacity>
      </BlurView>

      <SettingsModal
        visible={settingsVisible}
        settingsView={settingsView}
        theme={theme}
        isDark={isDark}
        availableCameras={availableCameras}
        selectedCameraId={selectedCameraId}
        onClose={handleSettingsClose}
        onNavigateTo={setSettingsView}
        onToggleTheme={toggleTheme}
        hapticsEnabled={hapticsEnabled}
        onToggleHaptics={toggleHaptics}
        onCameraSelect={handleCameraSelectionWrapper}
      />
    </View>
  );
}
