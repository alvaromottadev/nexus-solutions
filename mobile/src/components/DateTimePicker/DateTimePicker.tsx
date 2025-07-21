import { useState } from 'react';
import {
  Platform,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { formatDate } from '../../utils/formatDate';
import styles from './styles';

interface DatePickerProps extends ViewProps {
  onChange?: (date: Date) => void;
  label: string;
  marginLeft?: number;
  marginTop?: number;
  data?: Date;
}

export default function DatePicker({
  onChange,
  style,
  label,
  marginLeft,
  marginTop,
  data,
}: DatePickerProps) {
  const [date, setDate] = useState<Date>(data ? data : new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  function handleDateChange(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) {
    if (selectedDate) {
      const updatedDate = new Date(selectedDate);
      if (mode === 'date') {
        updatedDate.setFullYear(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
        );
      } else {
        updatedDate.setHours(
          selectedDate.getHours(),
          selectedDate.getMinutes(),
        );
      }
      setDate(updatedDate);

      if (mode === 'date') {
        setMode('time');
        setShow(true);
      } else {
        setShow(false);
        onChange && onChange(updatedDate);
      }
    }
  }

  function showPicker(mode: 'date' | 'time') {
    setShow(true);
    setMode(mode);
  }

  return (
    <>
      {show && (
        <DateTimePicker
          value={date}
          locale="pt-BR"
          mode={mode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}
      <View style={styles.container}>
        <Text style={[styles.label, style]}>{label}</Text>
        <TouchableOpacity onPress={() => showPicker('date')}>
          <View style={[styles.select, { marginLeft, marginTop }]}>
            <Text>{formatDate(date)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
