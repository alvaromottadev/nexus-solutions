import { View } from 'react-native';
import { styles } from './styles';
import { ArchiveIcon } from 'phosphor-react-native';
import CustomText from '../CustomText/CustomText';

interface EmptyIndicatorProps {
  label: string;
}

export default function EmptyIndicator({ label }: EmptyIndicatorProps) {
  return (
    <View style={styles.empty}>
      <ArchiveIcon size={64} color="#322866" />
      <CustomText>Nenhum(a) {label} cadastrado(a)</CustomText>
    </View>
  );
}
