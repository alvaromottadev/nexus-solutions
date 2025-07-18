import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../../routes/AppRoutes';
import ProductForm from '../../components/ProductForm/ProductForm';

type ProductEditPageRouteProp = RouteProp<MainStackParamList, 'ProductEdit'>;

export default function ProductEditPage() {
  const route = useRoute<ProductEditPageRouteProp>();
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ProductForm mode="edit" product={product} />
    </SafeAreaView>
  );
}
