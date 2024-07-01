import * as React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const DeleteModal = () => {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant='bodyMedium'>
            Are you sure you want to delete this expense ?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => console.log('Cancel')}>Cancel</Button>
          <Button onPress={() => console.log('Ok')}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteModal;
