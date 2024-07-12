import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { useAuthContext } from '@/providers/AuthProvider';
import { getUserFromDb } from '@/utils/httpRequest';
import { IUserData, IUserDb, STACK_NAMES, StackNavigation } from '@/types';
import ChangePassword from './ChangePassword';
import GenericModal from '../UI/GenericModal';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const SettingsScreenWrapper = (props: Props) => {
  const { userId, setUserCredentials } = useAuthContext();
  const navigation = useNavigation<StackNavigation>();
  const [visibleModal, setVisibleModal] = useState(false);
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
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setUserCredentials({
        isAuth: false,
        userId: '',
        token: '',
        user: '',
      });
      const res = await signOut(auth);
      navigation.navigate(STACK_NAMES.AuthScreen, {
        screen: STACK_NAMES.AuthScreen,
        params: {
          slug: 'login',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
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
      <Card className='' mode='outlined'>
        <View className='p-2 '>
          <Text className=' mb-2' variant='labelLarge'>
            Change Password
          </Text>
          <ChangePassword />
        </View>
      </Card>

      <View className='mt-5'>
        <Button onPress={() => setVisibleModal(true)} mode='elevated'>
          <Text>Logout</Text>
        </Button>
      </View>
      <GenericModal
        title='Logout'
        text='Once you logout, you will be redirected to the login page.
Are you sure you?'
        visible={visibleModal}
        handleClose={() => setVisibleModal(false)}
        handleDelete={handleLogout}
      />
    </ScrollView>
  );
};

export default SettingsScreenWrapper;
