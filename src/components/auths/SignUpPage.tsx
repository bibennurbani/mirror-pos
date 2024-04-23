import { Container, Box, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../routes/paths';
import { CGTextField } from '../form';
import FormProvider from '../../contexts/FormProvider';

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { client } = useAuth();
  const methods = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      const response = await client.register(data.email, data.password);
      if (response.error) {
        alert('Failed to sign up: ' + response.error.message);
      } else {
        navigate(PATH_DASHBOARD.root);
      }
    } catch (error) {
      console.error('SignUp error:', error);
      alert('Failed to sign up');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box>
            <CGTextField name='email' label='Email Address' autoComplete='email' autoFocus required />
            <CGTextField name='password' label='Password' type='password' autoComplete='current-password' required />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default SignUpPage;
