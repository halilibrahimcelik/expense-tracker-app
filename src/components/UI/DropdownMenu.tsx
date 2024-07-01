import * as React from 'react';
import { View } from 'react-native';
import { IconButton, Menu, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  toggleVisibility: () => void;
  handleOpenExpenseModal: () => void;
  handleEditExpense: () => void;
};
const DropDownMenu = ({
  visible,
  toggleVisibility,
  handleOpenExpenseModal,
  handleEditExpense,
}: Props) => {
  const theme = useTheme();
  return (
    <Menu
      style={{
        width: 110,
        //backgroundColor: theme.colors.background,
        borderRadius: 10,
      }}
      contentStyle={{
        right: 40,
        top: -10,
      }}
      theme={{ roundness: 10 }}
      visible={visible}
      anchorPosition='bottom'
      onDismiss={toggleVisibility}
      anchor={
        <IconButton
          onPress={toggleVisibility}
          className='  h-9 w-9 relative  '
          icon={() => (
            <Entypo
              name='dots-three-vertical'
              size={24}
              color={theme.colors.primary}
            />
          )}
        />
      }
    >
      <Menu.Item
        style={{
          borderRadius: 10,
          padding: 0,
          margin: 0,
          minWidth: 110,
          flex: 1,
        }}
        contentStyle={{
          // backgroundColor: 'white',
          padding: 0,
          minHeight: 20,
          margin: 0,
          borderRadius: 10,
        }}
        theme={{ roundness: 10 }}
        leadingIcon={() => (
          <MaterialIcons name='edit' size={24} color={theme.colors.primary} />
        )}
        onPress={() => {
          toggleVisibility();
          handleEditExpense();
        }}
        title='Edit'
      />
      <Menu.Item
        style={{
          borderRadius: 10,
          minWidth: 110,
        }}
        contentStyle={{
          // backgroundColor: 'white',
          padding: 0,
          width: 90,
          margin: 0,

          borderRadius: 10,
        }}
        leadingIcon={() => (
          <MaterialIcons name='delete' size={24} color={theme.colors.primary} />
        )}
        onPress={() => {
          handleOpenExpenseModal();
          toggleVisibility();
        }}
        title={'Delete'}
      />
    </Menu>
  );
};

export default DropDownMenu;
