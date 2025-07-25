import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import Button from '../../components/Button/Button';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import { MainStackParamList } from '../../routes/AppRoutes';

const logo = require('../../assets/images/logo_nexus.png');

export default function HomePage() {
  const navigation = useTypedNavigation();
  function handleButtonPress(
    pageName: 'ProductRegistration' | 'MovementRegistration' | 'InventoryPage',
  ) {
    navigation.navigate({ name: pageName, params: undefined });
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Gerenciamento de Almoxarifado</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Cadastrar Produto"
          onPress={() => handleButtonPress('ProductRegistration')}
        />
        <Button
          title="Registrar Movimentação"
          onPress={() => handleButtonPress('MovementRegistration')}
        />
        <Button
          title="Consultar Estoque"
          onPress={() => handleButtonPress('InventoryPage')}
        />
      </View>
    </View>
  );
}
