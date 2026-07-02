import { Drawer } from 'expo-router/drawer';
import { DrawerHeader } from '../../components/ui/drawer-header';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        header: () => <DrawerHeader />,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 280,
        },
        drawerActiveTintColor: '#208AEF',
        drawerInactiveTintColor: '#444',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '500',
        },
        overlayColor: 'rgba(0,0,0,0.3)',
      }}>
      <Drawer.Screen name="index" options={{ drawerLabel: 'Home', title: 'Home' }} />
      <Drawer.Screen name="settings" options={{ drawerLabel: 'Settings', title: 'Settings' }} />
      <Drawer.Screen name="news" options={{ drawerLabel: 'News', title: 'News' }} />
    </Drawer>
  );
}
