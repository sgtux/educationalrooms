import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useForm from 'react-hook-form'

import {
  Button,
  CircularProgress,
  Checkbox
} from '@material-ui/core'

import { InputHookForm } from 'components'

import { authService } from 'services'
import CardMain from 'components/main/CardMain'
import { AppTexts } from 'helpers/appTexts'
import { FormContainer } from './styles'

const Texts = AppTexts.UserAccount

export default function UserAccount() {

  const [loading, setLoading] = useState(false)

  const appState = useSelector(state => state.appState)

  const { register, watch, handleSubmit, errors, getValues } = useForm()

  const watchChangePassword = watch('changePassword', false)

  function onSubmit(form) {
    if (!loading) {
      setLoading(true)
      authService.updateAccount(form)
        .then(res => {
          setLoading(false)
          console.log(res)
        }).catch(err => {
          setLoading(false)
          console.log(err)
        })
    }
  }

  return (
    <CardMain title={Texts.Title[appState.language]}>
      <FormContainer expanded={watchChangePassword} onSubmit={handleSubmit(onSubmit)}>

        <InputHookForm
          register={register}
          defa
          validateProps={{ required: true, minLength: 3 }}
          name="name"
          label={Texts.Name[appState.language]}
          variant="outlined"
          defaultValue={appState.user.name}
          errors={errors} />

        <br />

        <InputHookForm
          register={register}
          validateProps={{ required: true }}
          name="email"
          label="Email"
          email
          defaultValue={appState.user.email}
          variant="outlined"
          errors={errors} />

        <br />

        <Checkbox
          color="primary"
          name="changePassword"
          inputRef={register} />
        <span style={{ fontSize: '12px', fontFamily: 'Arial' }}>
          {Texts.ChangePassword[appState.language]}
        </span>

        {watchChangePassword &&
          <>
            <br />

            <InputHookForm
              register={register}
              validateProps={{ required: true, minLength: 4 }}
              name="currentPassword"
              label={Texts.CurrentPassword[appState.language]}
              variant="outlined"
              type="password"
              errors={errors} />

            <br />

            <InputHookForm
              register={register}
              validateProps={{ required: true, minLength: 4 }}
              name="newPassword"
              label={Texts.NewPassword[appState.language]}
              variant="outlined"
              type="password"
              errors={errors} />

            <br />

            <InputHookForm
              register={register}
              validateProps={{
                required: true,
                minLength: 4,
                validate: val => val === getValues().newPassword
              }}
              validateError={AppTexts.FormErrors.PasswordNotMatch[appState.language]}
              name="confirmPassword"
              label={Texts.ConfirmPassword[appState.language]}
              variant="outlined"
              type="password"
              validateEquals="teste"
              errors={errors} />
          </>
        }

        <br />

        <div style={{ marginBottom: '20px' }} hidden={!loading}>
          <CircularProgress />
        </div>
        <Button
          variant="contained"
          type="submit"
          color="primary">{AppTexts.Root.Save[appState.language]}</Button>

      </FormContainer>
    </CardMain>
  )
}