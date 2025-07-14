import { Image, Text, View } from 'react-native';
import { ProductType } from '../../types/ProductType';
import { styles } from './styles';
import { BoxArrowUpIcon, PencilIcon } from 'phosphor-react-native';
import formatUrl from '../../utils/formatUrl';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = formatUrl(product.image);
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image style={styles.image} src={image} />
          ) : (
            <BoxArrowUpIcon />
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
      </View>
    </View>
  );
}
