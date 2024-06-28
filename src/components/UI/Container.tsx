import React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const Container = (props: Props) => {
  return <View className='px-6 py-10'>{props.children}</View>;
};
export default Container;
