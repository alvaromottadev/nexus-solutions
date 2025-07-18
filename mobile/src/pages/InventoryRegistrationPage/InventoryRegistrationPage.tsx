import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { PaperProvider } from 'react-native-paper';
import SelectListComponent from '../../components/SelectList/SelectList';
import { LocationType } from '../../types/LocationType';
import api from '../../client/api-client';
import { AuthContext } from '../../contexts/auth';
import { SelectType } from '../../types/SelectType';
import { ProductType } from '../../types/ProductType';
import { showToast } from '../../utils/showToast';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';

export default function InventoryRegistrationPage() {
  const { token } = useContext(AuthContext);
  const navigation = useTypedNavigation();

  const [locationSelected, setLocationSelected] = useState<string>('');
  const [productSelected, setProductSelected] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [minStock, setMinStock] = useState<number>(0);

  const [locationsData, setLocationsData] = useState<SelectType[]>([]);

  const [productsData, setProductsData] = useState<SelectType[]>([]);

  useEffect(() => {
    getLocations();
    getProducts();
  }, []);

  function handleRegister() {
    const json = {
      productId: productSelected,
      locationId: locationSelected,
      quantity,
      minStock,
    };
    api
      .post(`/inventories`, json, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        showToast(
          'success',
          'Estoque registrado',
          'O estoque foi registrado com sucesso.',
        );
        navigation.goBack();
      });
  }

  function getLocations() {
    api
      .get(`/locations?size=999`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        response.data.content.map((location: LocationType) => {
          setLocationsData(prevData => [
            ...prevData,
            { key: location.id, value: location.name },
          ]);
        });
      });
  }

  function getProducts() {
    api
      .get(`/products?size=999`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setProductsData([]);
        response.data.content.map((product: ProductType) => {
          setProductsData(prevData => [
            ...prevData,
            { key: product.id, value: product.name },
          ]);
        });
      });
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <SelectListComponent
          data={productsData}
          setSelected={setProductSelected}
          label="Produto"
          placeholder="Selecione um produto"
          notFoundText="Nenhum produto encontrado. Tente mudar o almoxarifado."
        />
        <SelectListComponent
          data={locationsData}
          setSelected={setLocationSelected}
          label="Almoxarifado"
          placeholder="Selecione um almoxarifado"
        />
        <Input
          keyboardType="numeric"
          label="Quantidade"
          onChangeText={e => setQuantity(Number(e))}
          value={quantity.toString()}
        />
        <Input
          keyboardType="numeric"
          label="Estoque Mínimo"
          onChangeText={e => setMinStock(Number(e))}
          value={minStock.toString()}
        />
        <Button title="Registrar Estoque" onPress={handleRegister} />
      </View>
    </PaperProvider>
  );
}
