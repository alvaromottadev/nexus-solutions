import { SafeAreaView } from 'react-native';
import { styles } from './styles';

import ProductForm from '../../components/ProductForm/ProductForm';

export default function ProductRegistrationPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ProductForm mode="create" />
    </SafeAreaView>
  );
}
