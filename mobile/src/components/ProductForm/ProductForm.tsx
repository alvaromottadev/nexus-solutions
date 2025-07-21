import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Input from '../../components/Input/Input';
import { CameraIcon, QrCodeIcon } from 'phosphor-react-native';
import Button from '../../components/Button/Button';
import { useContext, useEffect, useState } from 'react';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import { showToast } from '../../utils/showToast';
import api from '../../client/api-client';
import { AuthContext } from '../../contexts/auth';
import { ProductType } from '../../types/ProductType';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import QrCodeScanner from '../QrCodeScanner/QrCodeScanner';

interface ProductFormProps {
  mode: 'create' | 'edit';
  product?: ProductType;
}

export default function ProductForm({ mode, product }: ProductFormProps) {
  const navigation = useTypedNavigation();

  const [name, setName] = useState<string>(product?.name || '');

  const [description, setDescription] = useState<string>(
    product?.description || '',
  );

  const [code, setCode] = useState<string>(product?.code || '');

  const [image, setImage] = useState<Asset[]>([]);

  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.image || null,
  );

  const [nameError, setNameError] = useState<boolean>(false);

  const { token } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function onSubmit() {
    if (isEditing) return;
    const isValid = validateForm();
    if (!isValid) return;

    const bodyJson = {
      name: name,
      description: description,
      code: code,
    };
    if (mode === 'create') return handleCreate(bodyJson);
    if (mode === 'edit' && product) return handleEdit(bodyJson);
    showToast('error', 'Erro', 'Modo inválido para o formulário.');
  }

  async function handleCreate(bodyJson: {
    name: string;
    description: string;
    code: string;
  }) {
    api
      .post(`/products`, bodyJson, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async response => {
        if (imagePreview && image) await updateImage(response.data.id, image);
        showToast('success', 'Produto cadastrado com sucesso');
        navigation.goBack();
      });
  }

  async function handleEdit(bodyJson: {
    name: string;
    description: string;
    code: string;
  }) {
    api
      .put(`/products/${product?.id}`, bodyJson, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async response => {
        if (imagePreview !== product?.image)
          await updateImage(response.data.id, image);
        showToast('success', 'Produto editado com sucesso');
        setIsEditing(true);
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      });
  }

  async function updateImage(productId: string, image: Asset[]) {
    const formData = new FormData();
    formData.append('image', {
      uri: imagePreview,
      type: image[0].type,
      name: image[0].fileName,
    });
    api.put(`/products/${productId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function handleImage() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    const response = await launchImageLibrary(options);
    setImagePreview(response.assets![0].uri || '');
    setImage(response.assets || []);
  }

  function validateForm() {
    if (name.length < 1) {
      showToast('error', 'Nome inválido', 'Por favor, insira um nome válido.');
      setNameError(true);
      return false;
    }
    return true;
  }

  function handleCameraOpen() {
    navigation.navigate('QrCodeScanner', {
      isActive: true,
      onScan: (data: string) => {
        setCode(data);
        navigation.goBack();
      },
    });
  }

  return (
    <>
      <View style={styles.form}>
        <Input
          value={name}
          label="Nome"
          onChangeText={e => setName(e)}
          isError={nameError}
        />
        <Input
          value={description}
          label="Descrição"
          multiline
          onChangeText={e => setDescription(e)}
        />
        <View style={styles.codeContainer}>
          <Input value={code} label="Código" onChangeText={e => setCode(e)} />
          <TouchableOpacity onPress={handleCameraOpen}>
            <QrCodeIcon size={48} style={styles.qrCode} color="#322866" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.imageContainer} onPress={handleImage}>
        {imagePreview ? (
          <Image src={imagePreview} style={styles.image} />
        ) : (
          <CameraIcon size={48} color="#322866" />
        )}
      </TouchableOpacity>
      <Button
        onPress={onSubmit}
        title={mode === 'create' ? 'Cadastrar Produto' : 'Editar Produto'}
      />
    </>
  );
}
