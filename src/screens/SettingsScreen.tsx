import { StyleSheet } from 'react-native';
import React from 'react';
import FadeInView from '@/components/animations/FadeInView';
import Container from '@/components/UI/Container';
import { Text } from 'react-native-paper';
import SettingsScreenWrapper from '@/components/settings/SettingsScreenWrapper';
import KeyboardWrapper from '@/containers/KeyboardWrapper';

type Props = {};

const SettingsScreen = (props: Props) => {
  return (
    <KeyboardWrapper>
      <FadeInView>
        <Container>
          <SettingsScreenWrapper />
        </Container>
      </FadeInView>
    </KeyboardWrapper>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
