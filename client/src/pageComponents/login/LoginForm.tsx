import React from 'react';
import { Box, Grid } from '@mui/material';
import M from '../../../src/messages'
import CustomButton from '../../components/button';
import { isEmail, requiredErrMsg } from '../../helpers/formHelper';
import { iLogin } from '../../configs/shared/types';
import StepHOC from '../../components/FormHOC';


interface iProps {
  handleSubmit: () => (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const FormHOC = StepHOC<iLogin>()(
  ["email", "password"]
);

const Form = FormHOC.Form

const LoginForm = FormHOC<iProps>(({ handleSubmit }) => {

  const validateEmail = (value: string) => isEmail(value) ? true : M.get('errors.incorrectEmail');

  return (
    <>
      <Grid item xs={12} sm={12}>
        <Form.TextField
          rules={{ required: requiredErrMsg(M.get('login.email')), validate: validateEmail }}
          name="email"
          placeholder={M.get('login.email')}
          label={M.get('login.email')}
          sxContainer={{ mt: 0 }}
          title={M.get('login.email')}
          helperTooltip={M.get('login.email')}
          borderRadius={8}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Form.TextField
          rules={{ required: requiredErrMsg(M.get('login.password')) }}
          name="password"
          placeholder={M.get('login.password')}
          label={M.get('login.password')}
          sxContainer={{ mt: 0 }}
          title={M.get('login.password')}
          helperTooltip={M.get('login.password')}
          borderRadius={8}
          withEyeIcon
          eyeIconSize={16}
          type='password'
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
          <CustomButton
            label={M.get('actions.submit')}
            btnType='primary'
            sx={{ width: '100%', p: '8px 12px', fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}
            onClick={handleSubmit()}
          />
        </Box>
      </Grid>
    </>
  );
});

export default LoginForm;
