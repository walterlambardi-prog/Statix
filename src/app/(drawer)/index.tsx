import { Screen } from '@/components/ui/screen';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.body}>Welcome to Stratix</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    fontSize: 16,
    color: '#666',
  },
});
