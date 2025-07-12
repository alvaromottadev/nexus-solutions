import { Image, Text, View } from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { styles } from './styles';

const logo = require('../../assets/images/logo_nexus.png');
//

export default function LoginPage() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />

      <Text style={styles.title}>Nexus Solutions</Text>
      <Text style={styles.welcomeText}>Bem-vindo de volta! 👋</Text>

      <View style={styles.inputContainer}>
        <Input label="Email" />
        <Input />
      </View>
      <Button title="LOGIN" />
    </View>
  );
}
