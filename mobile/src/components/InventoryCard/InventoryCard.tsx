import { Text, View } from 'react-native';
import InventoryType from '../../types/InventoryType';
import { styles } from './styles';
import CustomText from '../CustomText/CustomText';

interface InventoryCardProps {
  inventory: InventoryType;
}

export default function InventoryCard({ inventory }: InventoryCardProps) {
  const status = {
    OUT_OF_STOCK: 'Fora de Estoque',
    OK: 'Em Estoque',
    LOW: 'Estoque Baixo',
  };

  return (
    <View style={styles.card}>
      <View style={styles.boxContainer}>
        <CustomText numberOfLines={1} ellipsizeMode="tail">
          <CustomText style={styles.text}>Produto:</CustomText>{' '}
          {inventory.product.name}
        </CustomText>
      </View>
      <View style={styles.quantityStockContainer}>
        <View style={styles.boxQuantityStock}>
          <CustomText style={styles.text}>Quantidade:</CustomText>
          <CustomText>{inventory.quantity}</CustomText>
        </View>
        <View style={styles.boxQuantityStock}>
          <CustomText style={styles.text}>Mínimo:</CustomText>
          <CustomText>{inventory.minStock}</CustomText>
        </View>
      </View>
      <View style={styles.boxContainer}>
        <CustomText ellipsizeMode="tail" numberOfLines={1}>
          <CustomText style={styles.text}>Almoxarifado: </CustomText>
          {inventory.location.name}
        </CustomText>
      </View>
      <View style={styles.boxContainer}>
        <CustomText style={styles.text}>Status:</CustomText>
        <CustomText>{status[inventory.status]}</CustomText>
      </View>
    </View>
  );
}
