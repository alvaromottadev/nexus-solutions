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
  disabled?: boolean;
}

export default function SelectListComponent({
  label,
  placeholder = 'Selecione uma opção',
  onSelect,
  setSelected,
  data,
  notFoundText = 'Nenhum item encontrado',
  maxHeight,
  isError = false,
  disabled = false,
}: SelectListProps) {
  return (
    <>
      {label && (
        <CustomText style={[styles.label, isError && styles.error]}>
          {label}
        </CustomText>
      )}
      <View
        style={[styles.select, disabled && styles.selectDisabled]}
        pointerEvents={disabled ? 'none' : 'auto'}
      >
        <SelectList
          placeholder={placeholder}
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
      </View>
    </>
  );
}
