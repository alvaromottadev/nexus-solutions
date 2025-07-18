import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from './styles';

export default function LoadingIndicator() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator
        color=""
        size={'large'}
        theme={{ colors: { primary: '#322866' } }}
      />
    </View>
  );
}
