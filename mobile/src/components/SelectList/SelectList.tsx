import { View } from 'react-native';
import { styles } from './styles';
import CustomText from '../CustomText/CustomText';
import { SelectList } from 'react-native-dropdown-select-list';

interface SelectListProps {
  label?: string;
  placeholder?: string;
  onSelect?: () => void;
  setSelected: (value: string) => void;
  data: { key: string; value: string }[];
  notFoundText?: string;
}

export default function SelectListComponent({
  label,
  placeholder,
  onSelect,
  setSelected,
  data,
  notFoundText = 'Nenhum item encontrado',
}: SelectListProps) {
  return (
    <>
      {label && <CustomText style={styles.label}>{label}</CustomText>}
      <SelectList
        placeholder={placeholder ? placeholder : 'Selecione uma opção'}
        onSelect={onSelect ? onSelect : () => {}}
        setSelected={setSelected}
        data={data}
        fontFamily="lato"
        boxStyles={{ borderColor: '#322866', width: '80%' }}
        notFoundText={notFoundText}
        searchPlaceholder="Buscar..."
        dropdownStyles={{ maxWidth: '80%' }}
      />
    </>
  );
}
