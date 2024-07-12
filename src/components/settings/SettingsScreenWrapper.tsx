import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Divider, Text } from 'react-native-paper';
import { useAuthContext } from '@/providers/AuthProvider';
import { getUserFromDb } from '@/utils/httpRequest';
import { IUserData, IUserDb } from '@/types';

type Props = {};

const SettingsScreenWrapper = (props: Props) => {
  const { userId } = useAuthContext();
  const [userInfo, setUserInfo] = useState<IUserDb>({
    email: '',
    userName: '',
    id: '',
  });

  useEffect(() => {
    const fetchUserDetails = async (id: string) => {
      try {
        const userData = await getUserFromDb(id);
        //@ts-ignore
        setUserInfo(userData);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      fetchUserDetails(userId);
    }
  }, [userId]);
  return (
    <ScrollView>
      <View className='mb-5'>
        <Text variant='titleLarge'>Welcome back,</Text>
        <Text variant='bodyLarge'>{userInfo.userName}</Text>
      </View>
      <Text variant='bodyMedium'>
        You can update your personal information here.
      </Text>
      <Divider className='h-[1px] my-2 mx-10' />
      <Text variant='bodyMedium'>Change Password</Text>
    </ScrollView>
  );
};

export default SettingsScreenWrapper;
