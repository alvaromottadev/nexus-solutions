import { Image, Text, View } from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { styles } from './styles';
import { useContext, useState } from 'react';
import { showToast } from '../../utils/showToast';
import { AuthContext } from '../../contexts/auth';

const logo = require('../../assets/images/logo_nexus.png');

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [buttonPressed, setButtonPressed] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  function handleLogin() {
    if (buttonPressed) return;
    const isValid = validateForm();
    if (!isValid) return;
    setButtonPressed(true);
    login(email, password);
    setTimeout(() => {
      setButtonPressed(false);
    }, 3000);
  }

  function validateForm() {
    let isValid = true;
    if (email.length === 0 || !email.includes('@')) {
      showToast(
        'error',
        'Email inválido',
        'Por favor, insira um email válido.',
      );
      setEmailError(true);
      return false;
    }
    if (password.length < 6) {
      setPasswordError(true);
      showToast(
        'error',
        'Senha inválida',
        'A senha deve ter pelo menos 6 caracteres.',
      );
      return false;
    }
    return isValid;
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
      <Button onPress={handleLogin} title="Entrar" isPressed={buttonPressed} />
    </View>
  );
}
