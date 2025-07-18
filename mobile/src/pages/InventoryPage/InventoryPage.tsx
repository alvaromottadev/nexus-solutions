import { FlatList, View } from 'react-native';
import InventoryCard from '../../components/InventoryCard/InventoryCard';
import { styles } from './styles';
import { useContext, useEffect, useState } from 'react';
import InventoryType from '../../types/InventoryType';
import api from '../../client/api-client';
import { AuthContext } from '../../contexts/auth';
import AddButton from '../../components/AddButton/AddButton';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import { ActivityIndicator } from 'react-native-paper';

export default function InventoryPage() {
  const [inventories, setInventories] = useState<InventoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useTypedNavigation();

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

  function handleAddInventory() {
    navigation.navigate('InventoryRegistrationPage');
  }

  return !isLoading ? (
    <>
      <AddButton onPress={handleAddInventory} />
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
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator
        color=""
        size={'large'}
        theme={{ colors: { primary: '#322866' } }}
      />
    </View>
  );
}
