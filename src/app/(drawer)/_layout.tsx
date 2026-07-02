import { Drawer } from 'expo-router/drawer';
import { useTheme } from 'tamagui';
import { DrawerHeader } from '../../components/ui/drawer-header';

export default function DrawerLayout() {
  const theme = useTheme();

  const background = theme.background?.val ?? '#ffffff';
  const color = theme.color?.val ?? '#111111';
  const primary = theme.primary?.val ?? '#6366f1';
  const muted = theme.muted?.val ?? '#64748b';

  return (
    <Drawer
      screenOptions={{
        header: () => <DrawerHeader />,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: background,
          width: 280,
        },
        drawerActiveTintColor: primary,
        drawerInactiveTintColor: muted,
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '500',
          color,
        },
        overlayColor: 'rgba(0,0,0,0.3)',
      }}>
      <Drawer.Screen name="index" options={{ drawerLabel: 'Home', title: 'Home' }} />
      <Drawer.Screen name="news" options={{ drawerLabel: 'News', title: 'News' }} />
      <Drawer.Screen name="market" options={{ drawerLabel: 'Market', title: 'Market' }} />
      <Drawer.Screen name="settings" options={{ drawerLabel: 'Settings', title: 'Settings' }} />
    </Drawer>
  );
}
