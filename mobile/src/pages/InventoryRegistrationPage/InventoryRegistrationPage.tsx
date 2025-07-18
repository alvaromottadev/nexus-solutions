import { View } from 'react-native';
import { styles } from './styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function InventoryRegistrationPage() {
  return (
    <View style={styles.container}>
      <Input label="Produto" />
      <Input label="Almoxarifado" />
      <Input keyboardType="numeric" label="Quantidade" />
      <Input keyboardType="numeric" label="Estoque Mínimo" />
      <Button title="Registrar Estoque" />
    </View>
  );
}
