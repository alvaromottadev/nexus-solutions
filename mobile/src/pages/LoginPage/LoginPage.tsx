import { Image, Text, View } from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { styles } from './styles';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { showToast } from '../../utils/showToast';

const logo = require('../../assets/images/logo_nexus.png');

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleLogin() {
    validateForm();
  }

  function validateForm() {
    if (email.length === 0 || !email.includes('@')) {
      showToast(
        'error',
        'Email inválido',
        'Por favor, insira um email válido.',
      );
      setEmailError(true);
      return;
    }
    if (password.length < 6) {
      setPasswordError(true);
      showToast(
        'error',
        'Senha inválida',
        'A senha deve ter pelo menos 6 caracteres.',
      );
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />

      <Text style={styles.title}>Nexus Solutions</Text>
      <Text style={styles.welcomeText}>Bem-vindo de volta! 👋</Text>

      <View style={styles.inputContainer}>
        <Input
          label="Email"
          onChangeText={e => {
            setEmail(e);
            setEmailError(false);
          }}
          isError={emailError}
        />
        <Input
          autoCapitalize="none"
          autoComplete="off"
          secureTextEntry
          label="Senha"
          onChangeText={e => {
            setPassword(e);
            setPasswordError(false);
          }}
          isError={passwordError}
        />
      </View>
      <Button title="LOGIN" onPress={handleLogin} />
    </View>
  );
}
