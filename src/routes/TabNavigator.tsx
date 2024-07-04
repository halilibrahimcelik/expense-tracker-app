import { BottomNavigation, IconButton, useTheme } from 'react-native-paper';
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, useColorScheme } from 'react-native';
import AllExpenses from '@/screens/AllExpenses';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LastExpenses from '@/screens/LastExpenses';
import {
  RootBottomParamList,
  RootStackParamList,
  STACK_NAMES,
  StackNavigation,
} from '@/types';
import { useThemeContext } from '@/theme/ThemeProvider';
import DarkModeToggle from '@/components/UI/DarkModeToggle';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {}
const Tab = createBottomTabNavigator<RootBottomParamList>();

const TabNavigator = (props: Props) => {
  const themeContext = useThemeContext();
  const theme = useTheme();
  const navigation = useNavigation<StackNavigation>();
  useEffect(() => {
    const getTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme === 'dark') {
          themeContext?.toggleTheme();
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTheme();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            fontSize: 20,
          },
          headerBackgroundContainerStyle: {
            justifyContent: 'center',
            height: 100,
            alignContent: 'center',
            backgroundColor: theme.colors.inverseOnSurface,
          },
          headerRight(props) {
            return (
              <View className='flex flex-row gap-4 justify-center items-end'>
                <DarkModeToggle />
                <View>
                  <IconButton
                    size={24}
                    onPress={() =>
                      navigation.navigate(STACK_NAMES.AuthScreen, {
                        screen: STACK_NAMES.AuthScreen,
                        params: { slug: nanoid() },
                      })
                    }
                    icon={() => (
                      <MaterialIcons
                        name={'post-add'}
                        size={24}
                        color={theme.colors.primary}
                      />
                    )}
                    className='min-w-max max-w-[40px]'
                    mode='contained-tonal'
                  />
                </View>
              </View>
            );
          },
          headerTitleAlign: 'left',
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            activeColor={theme.colors.primary}
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : //@ts-ignore
                    route.params.title;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          initialParams={{ title: 'Last Expenses' }}
          name={STACK_NAMES.LastExpenses}
          component={LastExpenses}
          options={{
            tabBarLabel: 'Last Expenses',
            tabBarLabelStyle: {
              color: theme.colors.primary,
            },

            tabBarIcon: ({ color, size }) => {
              return <Icon name='timer-sand' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          initialParams={{ title: 'All Expenses' }}
          name={STACK_NAMES.AllExpenses}
          component={AllExpenses}
          options={{
            tabBarLabel: 'All Expenses',

            tabBarIcon: ({ color, size }) => {
              return <Icon name='chart-timeline' size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
      {/* <ExpenseModal
        visible={isModalVisible}
        hideModal={hideModal}
        showModal={showModal}
      /> */}
      <StatusBar style={themeContext?.isDarkMode ? 'light' : 'dark'} />
    </>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
