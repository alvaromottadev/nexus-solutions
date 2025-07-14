import { Image, Text, View } from 'react-native';
import { styles } from './styles';

const nexusSolutions = require('../../assets/images/nexus_solutions.png');

export default function LoadingPage() {
  return (
    <View style={styles.container}>
      <Image source={nexusSolutions} style={styles.image} />
    </View>
  );
}
