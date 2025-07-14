import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import Button from '../../components/Button/Button';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import { MainStackParamList } from '../../routes/AppRoutes';

const logo = require('../../assets/images/logo_nexus.png');

export default function HomePage() {
  const navigation = useTypedNavigation();
  function handleButtonPress(pageName: string) {
    navigation.navigate(pageName as keyof MainStackParamList);
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Gerenciamento de Almoxarifado</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={() => handleButtonPress('ProductRegistration')}>
          <Text style={styles.buttonText}>Cadastrar Produto</Text>
        </Button>
        <Button>
          <Text style={styles.buttonText}>Registrar Movimentação</Text>
        </Button>
        <Button>
          <Text style={styles.buttonText}>Estoque</Text>
        </Button>
      </View>
    </View>
  );
}
