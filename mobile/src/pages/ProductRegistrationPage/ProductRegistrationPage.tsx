import { SafeAreaView } from 'react-native';
import { styles } from './styles';

import { useContext, useEffect, useState } from 'react';
import { Asset } from 'react-native-image-picker';
import { showToast } from '../../utils/showToast';
import api from '../../client/api-client';
import { AuthContext } from '../../contexts/auth';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import ProductForm from '../../components/ProductForm/ProductForm';

export default function ProductRegistrationPage() {
  const { token } = useContext(AuthContext);

  const { hasPermission, requestPermission } = useCameraPermission();

  const device = useCameraDevice('back');

  useEffect(() => {
    if (hasPermission === false) {
      requestPermission();
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <Camera
        style={StyleSheet.absoluteFill}
        device={device!}
        isActive={true}
      /> */}

      <ProductForm mode="create" />
    </SafeAreaView>
  );
}
