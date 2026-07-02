import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
}

export function Loader({ size = 'large', color = '#208AEF' }: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
