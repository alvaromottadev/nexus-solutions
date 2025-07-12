import Toast from 'react-native-toast-message';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  subtitle?: string;
}

export function showToast(
  type: 'success' | 'error' | 'info',
  message: string,
  subtitle?: string,
) {
  Toast.show({
    type,
    text1: message,
    text2: subtitle,
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
  });
}
