import { useEffect, useState } from 'react';
import { Modal, PaperProvider, Portal, Text } from 'react-native-paper';
import { styles } from './styles';
import Button from '../Button/Button';
import { TouchableOpacity, View } from 'react-native';
import CustomText from '../CustomText/CustomText';
import { SelectType } from '../../types/SelectType';
import api from '../../client/api-client';
import { showToast } from '../../utils/showToast';
import SelectListComponent from '../SelectList/SelectList';
import Input from '../Input/Input';
import { QrCodeIcon } from 'phosphor-react-native';
import ProductWithQuantityType from '../../types/ProductWithQuantityType';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import { ProductType } from '../../types/ProductType';

interface AddProductModalProps {
  locationId: string;
  token: string;
  setProductsSelected: (products: ProductWithQuantityType[]) => void;
  productsSelected: ProductWithQuantityType[];
}

export default function AddProductModal({
  locationId,
  token,
  setProductsSelected,
  productsSelected,
}: AddProductModalProps) {
  const navigation = useTypedNavigation();

  const [visible, setVisible] = useState<boolean>(false);
  const [productSelected, setProductSelected] = useState<string>('');
  const [productError, setProductError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [productsData, setProductsData] = useState<SelectType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  const [placeholder, setPlaceholder] = useState<string>(
    'Selecione um produto',
  );

  const [cameraOpen, setCameraOpen] = useState<boolean>(false);

  const showModal = () => {
    if (!locationId) {
      showToast(
        'error',
        'Seleção de Almoxarifado',
        'Por favor, selecione um almoxarifado.',
      );
      return;
    }
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (token && locationId) {
      api
        .get(`/products?locationId=${locationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          const data = response.data.content.map((item: any) => ({
            key: item.id,
            value: item.name,
          }));
          setProductsData(data);
          setProducts(response.data.content);
        });
    }
  }, [locationId]);

  function handleAddProduct() {
    const isValid = validateForm();
    if (!isValid) return;

    const product = productsData.find(item => item.key === productSelected);
    if (!product) {
      showToast(
        'error',
        'Produto Não Encontrado',
        'Por favor, selecione um produto válido.',
      );
      return;
    }
    const newProduct: ProductWithQuantityType = {
      id: product.key,
      name: product.value,
      quantity,
    };

    const exists = productsSelected.some(item => {
      if (item.id === newProduct.id) {
        item.quantity += newProduct.quantity;
        return true;
      }
    });

    if (exists) {
      setProductsSelected([...productsSelected]);
      hideModal();
      return;
    }
    setProductsSelected([...productsSelected, newProduct]);
    hideModal();
  }

  function validateForm() {
    if (!productSelected) {
      showToast(
        'error',
        'Produto Não Selecionado',
        'Por favor, selecione um produto.',
      );
      setProductError(true);
      return false;
    }
    if (quantity <= 0) {
      showToast(
        'error',
        'Quantidade Inválida',
        'A quantidade deve ser maior que zero.',
      );
      setQuantityError(true);
      return false;
    }

    return true;
  }

  function handleQrCode() {
    setVisible(false);
    navigation.navigate('QrCodeScanner', {
      isActive: true,
      onScan: (data: string) => {
        navigation.goBack();
        const product = productsData.find(product => {
          if (product.key === data) {
            setProductSelected(product.key);
            setPlaceholder(product.value);
            setVisible(true);
            return true;
          }
        });
        if (!product) {
          const product = products.find(product => {
            if (product.code === data) {
              setProductSelected(product.id);
              setPlaceholder(product.name);
              return true;
            }
            return false;
          });
          if (!product) {
            showToast(
              'error',
              'Produto Não Encontrado',
              'Nenhum produto encontrado com o código escaneado.',
            );
            return;
          }
        }
        setVisible(true);
      },
    });
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <View style={styles.modalContent}>
            <CustomText>Adicionar Produto</CustomText>
            <Text style={styles.description}>
              Preencha os campos abaixo para adicionar um novo produto.
            </Text>
            <SelectListComponent
              data={productsData}
              onSelect={() => setProductError(false)}
              setSelected={setProductSelected}
              placeholder={placeholder}
              isError={productError}
            />
            <View style={styles.qrCodeContainer}>
              <TouchableOpacity onPress={handleQrCode}>
                <QrCodeIcon size={48} color="#322866" />
              </TouchableOpacity>
              <CustomText>Use o QRCode para encontrar o produto.</CustomText>
            </View>

            <Input
              label="Quantidade"
              keyboardType="numeric"
              onChangeText={e => {
                setQuantity(Number(e));
                setQuantityError(false);
              }}
              isError={quantityError}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Cancelar"
                onPress={hideModal}
                style={[styles.button, styles.cancelButton]}
                textColor="red"
              />
              <Button
                title="Adicionar"
                onPress={handleAddProduct}
                style={styles.button}
              />
            </View>
          </View>
        </Modal>
      </Portal>
      <Button title="Adicionar Produto" onPress={showModal} />
    </>
  );
}
