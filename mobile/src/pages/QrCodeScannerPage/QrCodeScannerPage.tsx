import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../../routes/AppRoutes';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

type QrCodeScannerRouteProp = RouteProp<MainStackParamList, 'QrCodeScanner'>;

export default function QrCodeScannerPage() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const route = useRoute<QrCodeScannerRouteProp>();
  const { isActive, onScan } = route.params;

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8'],
    onCodeScanned: event => {
      handleCodeScanned(event);
    },
  });

  useEffect(() => {
    if (hasPermission === false) {
      requestPermission();
    }
  }, [hasPermission, device]);

  function handleCodeScanned(event: Code[]) {
    if (onScan) {
      onScan(event[0].value ? event[0].value : 'Não possui valor');
    }
  }

  return device ? (
    <View style={{ backgroundColor: 'green', flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
      />
    </View>
  ) : (
    <LoadingIndicator />
  );
}
