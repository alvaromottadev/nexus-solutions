import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import RoleType from '../../types/RoleType';
import { InfoIcon } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import api from '../../client/api-client';
import { AuthMeType } from '../../types/AuthMeType';

const defaultAvatar = require('../../assets/images/default-avatar.jpg');

export default function ProfilePage() {
  const [profile, setProfile] = useState<AuthMeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getProfile().then(response => {
      console.log(response.data);
      setProfile(response.data);
      setIsLoading(false);
    });
  }, []);

  async function getProfile() {
    return api.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpYW5hQGdtYWlsLmNvbSIsImlhdCI6MTc1MjM0ODY1MSwiZXhwIjoxNzUyNDM1MDUxfQ._DvA6NxUj_uVpF9Eys94C3eQnMF7vgThkbU07qebodrTRE_UhgKjPOrki45Ste_4wyBju636YXRkMnCa_vqMYg`,
      },
    });
  }

  const roleType: Record<RoleType, string> = {
    operator: 'Operador',
    manager: 'Gerente',
    admin: 'Administrador',
    company: 'Empresa',
  };

  return (
    !isLoading &&
    profile && (
      <View style={styles.container}>
        <Image
          source={profile.avatar ? { uri: profile.avatar } : defaultAvatar}
          style={styles.avatar}
        />
        <Text style={styles.text}>{profile.name}</Text>
        <View style={styles.infoContainer}>
          <Input label="Email" value={profile.email} editable={false} />
          <Input
            label="Cargo"
            value={
              roleType[
                (profile.type.toLowerCase() === 'company'
                  ? 'company'
                  : (profile.role?.toLowerCase() as RoleType)) as RoleType
              ]
            }
            editable={false}
          />
        </View>
        <View style={styles.editContainer}>
          <InfoIcon size={16} />
          <Text style={styles.textInfo}>
            Para editar seu perfil, acesse o site da Nexus Solutions.
          </Text>
        </View>

        <Button title="Logout" style={styles.logout} />
      </View>
    )
  );
}
