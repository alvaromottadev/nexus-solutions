import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import CustomText from '../../components/CustomText/CustomText';
import Input from '../../components/Input/Input';
import { CameraIcon, QrCodeIcon } from 'phosphor-react-native';
import Button from '../../components/Button/Button';
import BackButton from '../../components/ButtonBack/ButtonBack';
import { useContext, useEffect, useState } from 'react';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import { showToast } from '../../utils/showToast';
import api from '../../client/api-client';
import { AuthContext } from '../../contexts/auth';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export default function ProductRegistrationPage() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [image, setImage] = useState<Asset[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { token } = useContext(AuthContext);

  async function handleCreate() {
    const isValid = validateForm();
    if (!isValid) return;

    const bodyJson = JSON.stringify({
      name: name,
      description: description,
      code: code,
    });

    api
      .post(`/products`, bodyJson, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async response => {
        if (imagePreview && image) await updateImage(response.data.id, image);
        showToast(
          'success',
          'Produto cadastrado com sucesso',
          'O produto foi adicionado à lista.',
        );
        resetForm();
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
      return false;
    }
    return true;
  }

  function resetForm() {
    setName('');
    setDescription('');
    setCode('');
    setImagePreview(null);
  }

  const { hasPermission, requestPermission } = useCameraPermission();

  const device = useCameraDevice('back');

  useEffect(() => {
    if (hasPermission === false) {
      requestPermission();
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <Camera
        style={StyleSheet.absoluteFill}
        device={device!}
        isActive={true}
      /> */}
      <BackButton />

      <CustomText style={styles.title}>Cadastro de Produto</CustomText>

      <View style={styles.form}>
        <Input value={name} label="Nome" onChangeText={e => setName(e)} />
        <Input
          value={description}
          label="Descrição"
          multiline
          onChangeText={e => setDescription(e)}
        />
        <View style={styles.codeContainer}>
          <Input value={code} label="Código" onChangeText={e => setCode(e)} />
          <TouchableOpacity>
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

      <Button onPress={handleCreate}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </Button>
    </SafeAreaView>
  );
}
