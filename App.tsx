import TabNavigator from '@/routes/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
        <StatusBar style='auto' />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
