import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../../components/CustomText/CustomText';
import InventoryCard from '../../components/InventoryCard/InventoryCard';
import { styles } from './styles';
import BackButton from '../../components/ButtonBack/ButtonBack';
import { useContext, useEffect, useState } from 'react';
import InventoryType from '../../types/InventoryType';
import api from '../../client/api-client';
import { AuthContext } from '../../contexts/auth';
import AddButton from '../../components/AddButton/AddButton';

export default function InventoryPage() {
  const [inventories, setInventories] = useState<InventoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    api
      .get(`/inventories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setInventories(response.data);
        setIsLoading(false);
      });
  }, []);

  function renderInventoryCard(inventory: InventoryType) {
    return <InventoryCard inventory={inventory} />;
  }

  return (
    !isLoading && (
      <>
        <AddButton />
        <View style={styles.container}>
          <FlatList
            data={inventories}
            keyExtractor={(__, index) => `inventory-${index}`}
            renderItem={({ item }) => renderInventoryCard(item)}
            showsVerticalScrollIndicator={false}
            // ListFooterComponent={renderFooter}
          />
        </View>
      </>
    )
  );
}
