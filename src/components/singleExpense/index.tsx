import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
type Props = {};
type AndroidMode = 'date' | 'time' | 'datetime' | 'countdown';
const SingleExpense = (props: Props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setShow(false);
    currentDate && setDate(currentDate);
  };

  const showMode = (currentMode: AndroidMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <Card className='p-1' mode='elevated'>
      <Card.Title
        title='Card Title'
        subtitle='Card Subtitle'
        // left={(props) => <Avatar.Icon {...props} icon='folder' />}
        right={(props) => (
          <IconButton
            onPress={showDatepicker}
            icon={() => (
              <AntDesign
                name='calendar'
                size={24}
                color={theme.colors.primary}
              />
            )}
          />
        )}
      />

      <Card.Content>
        <Text > {date.} </Text>
      </Card.Content>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )}
    </Card>
  );
};

export default SingleExpense;

const styles = StyleSheet.create({});
