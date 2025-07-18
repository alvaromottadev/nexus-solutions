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
  maxHeight?: number;
  isError?: boolean;
}

export default function SelectListComponent({
  label,
  placeholder,
  onSelect,
  setSelected,
  data,
  notFoundText = 'Nenhum item encontrado',
  maxHeight,
  isError = false,
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
        boxStyles={{ borderColor: isError ? 'red' : '#322866', width: '80%' }}
        notFoundText={notFoundText}
        searchPlaceholder="Buscar..."
        dropdownStyles={{ maxWidth: '80%' }}
        maxHeight={maxHeight ? maxHeight : 200}
      />
    </>
  );
}
