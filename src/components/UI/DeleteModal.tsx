import * as React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

type Props = {
  visible: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  text: string;
  title: string;
};
const DeleteModal = ({
  visible,
  handleDelete,
  handleClose,
  text,
  title,
}: Props) => {
  // const [visible, setVisible] = React.useState(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleClose}>
        <Dialog.Title
          style={{
            fontSize: 20,
            marginBottom: 8,
            padding: 0,
          }}
        >
          {title}
        </Dialog.Title>

        <Dialog.Content>
          <Text variant='bodyMedium'>{text}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleClose}>Cancel</Button>
          <Button onPress={handleDelete}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteModal;
