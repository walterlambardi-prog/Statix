import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface DrawerHeaderProps {
  showBurger?: boolean;
}

export function DrawerHeader({ showBurger = true }: DrawerHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      {showBurger && (
        <Pressable
          onPress={() => navigation.dispatch({ type: 'TOGGLE_DRAWER' })}
          style={({ pressed }) => [styles.burgerBtn, pressed && styles.burgerBtnPressed]}
          hitSlop={8}>
          <Ionicons name="menu" size={24} color="#111" />
        </Pressable>
      )}
      <Text style={styles.title}>Stratix</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  burgerBtn: {
    width: 34,
    height: 34,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  burgerBtnPressed: {
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.3,
  },
});
