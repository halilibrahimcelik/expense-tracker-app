import { BottomNavigation, Text } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import AllExpenses from '@/screens/AllExpenses';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LastExpenses from '@/screens/LastExpenses';
import { RootStackParamList, STACK_NAMES } from '@/types';

interface Props {}
const Tab = createBottomTabNavigator<RootStackParamList>();
const TabNavigator = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: { height: 50, backgroundColor: 'red' },
        headerTitleAlign: 'left',
        headerTitle(props) {
          return (
            <Text style={{}} variant='titleLarge'>
              {props.children}
            </Text>
          );
        },
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
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
