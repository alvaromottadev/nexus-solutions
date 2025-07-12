import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import Button from '../../components/Button/Button';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';

const logo = require('../../assets/images/logo_nexus.png');

export default function HomePage() {
  const navigation = useTypedNavigation();

  function handleNavigation() {
    navigation.navigate('Produtos');
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Gerenciamento de Almoxarifado</Text>
      <View style={styles.buttonContainer}>
        <Button title="Produtos" onPress={handleNavigation} />
        <Button title="Registrar Movimentação" />
        <Button title="Estoque" />
      </View>
    </View>
  );
}
