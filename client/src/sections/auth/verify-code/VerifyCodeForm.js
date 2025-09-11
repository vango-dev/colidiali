import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { OutlinedInput, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function VerifyCodeForm({
  phone,
  justifyButton = 'center',
  buttonStyle,
}) {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isParameter = pathname.includes('parameter');

  const { enqueueSnackbar } = useSnackbar();

  const { registerUser, userInfo, updateUser } = useAuth();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    document.addEventListener('paste', handlePasteClipboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await window.confirmationResult.confirm(
  //       Object.values(data).join('')
  //     );

  //     if (response.user) {
  //       navigate(PATH_AUTH.coordinate);
  //       enqueueSnackbar('Verify success!');
  //     }
  //   } catch (error) {}
  // };

  const handlePasteClipboard = (event) => {
    let data = event?.clipboardData?.getData('Text') || '';

    data = data.split('');

    [].forEach.call(document.querySelectorAll('#field-code'), (node, index) => {
      node.value = data[index];
      const fieldIndex = `code${index + 1}`;
      setValue(fieldIndex, data[index]);
    });
  };

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 6) {
        const nextfield = document.querySelector(
          `input[name=code${fieldIntIndex + 1}]`
        );

        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }

    handleChange(event);
  };

  const onSubmit = async (data) => {
    try {
      if (isParameter) {
        // const code = Object.values(data).join('');

        // const response = await axios.get(
        //   `/api/transporters/verify/+${phone}/code/${code}`
        // );
        // console.log(
        //   '🚀 ~ file: VerifyCodeForm.js:113 ~ onSubmit ~ response:',
        //   response
        // );
        // if (response.data.valid === true) {
        //   await updateUser({ phone });
        //   enqueueSnackbar('Verify success!');
        // }
        const updatedUser = { phone };
        await updateUser(updatedUser);
      } else {
        // const code = Object.values(data).join('');

        // const response = await axios.get(
        //   `/api/transporters/verify/+${phone}/code/${code}`
        // );
        // console.log(
        //   '🚀 ~ file: VerifyCodeForm.js:113 ~ onSubmit ~ response:',
        //   response
        // );

        //
        await registerUser(userInfo);
        navigate(PATH_AUTH.verify);
        // if (response.data.valid === true) {
        //   await registerUser(userInfo);
        //   navigate(PATH_DASHBOARD.profile);
        //   enqueueSnackbar('Verify success!');
        // }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: VerifyCodeForm.js:118 ~ onSubmit ~ error:',
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='row' spacing={2} justifyContent='center'>
        {Object.keys(values).map((name, index) => (
          <Controller
            key={name}
            name={`code${index + 1}`}
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                id='field-code'
                autoFocus={index === 0}
                placeholder='-'
                onChange={(event) =>
                  handleChangeWithNextField(event, field.onChange)
                }
                inputProps={{
                  maxLength: 1,
                  sx: {
                    p: 0,
                    textAlign: 'center',
                    width: { xs: 36, sm: 56 },
                    height: { xs: 36, sm: 56 },
                    color: 'black',
                  },
                }}
              />
            )}
          />
        ))}
      </Stack>

      <Stack direction='row' justifyContent={justifyButton}>
        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
          // disabled={!isValid}
          sx={{
            ...buttonStyle,
            mt: 3,
            width: '50%',
          }}
          color={'warning'}
        >
          Vérifier
        </LoadingButton>
      </Stack>
    </form>
  );
}
