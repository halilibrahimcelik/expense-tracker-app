import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';

type Props = {
  error: string;
};

const CustomErrorMessage = ({ error }: Props) => {
  const theme = useTheme();
  return (
    <Text
      style={{
        color: theme.colors.error,
        marginTop: 3,
      }}
      variant='labelSmall'
    >
      {error}{' '}
    </Text>
  );
};

export default CustomErrorMessage;

const styles = StyleSheet.create({});
