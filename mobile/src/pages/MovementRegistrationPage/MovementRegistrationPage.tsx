import { ScrollView, TouchableOpacity, View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import CustomText from '../../components/CustomText/CustomText';
import { styles } from './styles';
import SelectListComponent from '../../components/SelectList/SelectList';
import { useContext, useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import api from '../../client/api-client';
import { AuthContext } from '../../contexts/auth';
import { SelectType } from '../../types/SelectType';
import Button from '../../components/Button/Button';
import { showToast } from '../../utils/showToast';
import { ProductType } from '../../types/ProductType';
import AddProductModal from '../../components/AddProductModal/AddProductModal';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import { TrashIcon } from 'phosphor-react-native';
import { THEME } from '../../assets/theme';
import ProductWithQuantityType from '../../types/ProductWithQuantityType';

export default function MovementRegistrationPage() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([3, 4, 5]);
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(
    numberOfItemsPerPageList[0],
  );

  const [type, setType] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>('');

  const [locationSelected, setLocationSelected] = useState<string>('');
  const [locationsData, setLocationsData] = useState<SelectType[]>([]);

  const [productsSelected, setProductsSelected] = useState<
    ProductWithQuantityType[]
  >([]);

  const [canChangeLocation, setCanChangeLocation] = useState<boolean>(true);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, productsSelected.length);

  const { token } = useContext(AuthContext);
  const navigation = useTypedNavigation();

  const data = [
    { key: 'IN', value: 'Entrada' },
    { key: 'OUT', value: 'Saída' },
  ];

  useEffect(() => {
    api
      .get(`/locations?size=999`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const locations = response.data.content.map((location: any) => ({
          key: location.id,
          value: location.name,
        }));
        setLocationsData(locations);
      });
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    setCanChangeLocation(productsSelected.length === 0);
  }, [productsSelected]);

  function handleRegister() {
    const isValid = validateForm();
    if (!isValid) return;

    const json = {
      type,
      description,
      locationId: locationSelected,
      movementDate: new Date().toISOString(),
      items: productsSelected.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    api
      .post(`/movements`, json, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        showToast(
          'success',
          'Movimentação registrada',
          'A movimentação foi registrada com sucesso.',
        );
        navigation.goBack();
      });
  }

  function handleRemoveProduct(id: string, name: string) {
    if (productsSelected.length === 0) return;
    const updatedProducts = productsSelected.filter(item => item.id !== id);
    setProductsSelected(updatedProducts);
    showToast(
      'success',
      'Produto removido',
      `O produto ${name} foi removido da lista.`,
    );
  }

  function validateForm() {
    if (!type) {
      showToast('error', 'Tipo inválido', 'Por favor, selecione um tipo.');
      setTypeError(true);
      return false;
    }
    if (productsSelected.length === 0) {
      showToast(
        'error',
        'Nenhum produto selecionado',
        'Por favor, adicione pelo menos um produto.',
      );
      return false;
    }
    return true;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <SelectListComponent
          label="Tipo"
          data={data}
          setSelected={setType}
          maxHeight={120}
          isError={typeError}
          onSelect={() => setTypeError(false)}
          placeholder="Selecione o tipo da movimentação"
        />
        <Input label="Data" />
        <Input label="Descrição" onChangeText={e => setDescription(e)} />
        <SelectListComponent
          label="Almoxarifado"
          setSelected={setLocationSelected}
          data={locationsData}
          placeholder="Selecione um almoxarifado"
          disabled={!canChangeLocation}
        />
        <AddProductModal
          locationId={locationSelected}
          token={token!}
          setProductsSelected={setProductsSelected}
          productsSelected={productsSelected}
        />
        <DataTable style={{ width: '80%' }}>
          <DataTable.Header>
            <DataTable.Title textStyle={styles.cell}>Produto</DataTable.Title>
            <DataTable.Title numeric textStyle={styles.cell}>
              Quantidade
            </DataTable.Title>
            <DataTable.Title numeric textStyle={styles.cell}>
              Ações
            </DataTable.Title>
          </DataTable.Header>
          {productsSelected.slice(from, to).map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell textStyle={styles.cell}>
                {item.name}
              </DataTable.Cell>
              <DataTable.Cell numeric textStyle={styles.cell}>
                {item.quantity}
              </DataTable.Cell>
              <DataTable.Cell numeric textStyle={styles.cell}>
                <TouchableOpacity
                  onPress={() => handleRemoveProduct(item.id, item.name)}
                >
                  <TrashIcon size={18} />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(productsSelected.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${productsSelected.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
            paginationControlRippleColor={THEME.colors.primary}
          />
        </DataTable>

        <Button title="Registrar Movimentação" onPress={handleRegister} />
      </View>
    </ScrollView>
  );
}
