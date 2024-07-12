import { StyleSheet } from 'react-native';
import React from 'react';
import FadeInView from '@/components/animations/FadeInView';
import Container from '@/components/UI/Container';
import { Text } from 'react-native-paper';
import SettingsScreenWrapper from '@/components/settings/SettingsScreenWrapper';

type Props = {};

const SettingsScreen = (props: Props) => {
  return (
    <FadeInView>
      <Container>
        <SettingsScreenWrapper />
      </Container>
    </FadeInView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
