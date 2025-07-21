import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ProductType } from '../../types/ProductType';
import { styles } from './styles';
import { BoxArrowUpIcon, PencilIcon } from 'phosphor-react-native';
import formatUrl from '../../utils/formatUrl';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import usePermission from '../../hooks/usePermission';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigation = useTypedNavigation();

  const hasPermission = usePermission();

  function handleEdit() {
    navigation.navigate('ProductEdit', { product });
  }

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image style={styles.image} src={formatUrl(product.image)} />
          ) : (
            <BoxArrowUpIcon size={70} />
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{product.name}</Text>
          {product.description ? (
            <Text style={styles.description}>{product.description}</Text>
          ) : (
            <Text style={styles.description}>Sem descrição</Text>
          )}
        </View>
        {hasPermission && (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              height: '100%',
              position: 'absolute',
              right: 10,
            }}
            onPress={handleEdit}
          >
            <PencilIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
