import { IClassName } from '@/types';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
  customClass?: ViewProps['className'];
};

const Container = ({ children, customClass }: Props) => {
  return (
    <View style={{ flex: 1 }} className={`px-6 py-10    ${customClass}`}>
      {children}
    </View>
  );
};
export default Container;
