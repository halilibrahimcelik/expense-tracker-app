import React from 'react';
import ResetForm from '@/components/auth/ResetForm';
import KeyboardWrapper from '@/containers/KeyboardWrapper';
import Container from '@/components/UI/Container';

type Props = {};

const ResetPasswordScreen = (props: Props) => {
  return (
    <KeyboardWrapper>
      <Container>
        <ResetForm />
      </Container>
    </KeyboardWrapper>
  );
};

export default ResetPasswordScreen;
