import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, useTheme } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

type Props = {
  visible: boolean;
  showModal: () => void;
  hideModal: () => void;
};

const ExpenseModal = ({ showModal, visible, hideModal }: Props) => {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const defaultStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      padding: 20,
      height: '50%',
      width: '100%',
    },
  });
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={defaultStyle.container}
        >
          <TextInput
            returnKeyLabel='Done'
            label='Title'
            placeholderTextColor={theme.colors.primaryContainer}
            textColor='red'
            theme={{ roundness: 8 }}
            mode='outlined'
            style={{
              borderRadius: 10,
            }}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </Modal>
      </Portal>
    </>
  );
};

export default ExpenseModal;
