import { binding, given, when, then } from 'cucumber-tsflow'

import { validProps, createHttpClient } from '../steps.helper'

const httpClient = createHttpClient()

@binding()
class ValidateCredentialsSteps {

  private response: any

  @given(/Dado que eu esteja cadastrado/)
  initResponse() { this.response = {} }

  @when(/Quando eu enviar as credenciais (.*)/)
  sendCredentials(credentials: string): Promise<any> {
    return httpClient
      .post('/api/token')
      .send(JSON.parse(credentials))
      .then(res => this.response = res.body.message)
  }

  @then(/Para obter o token eu devo obter a mensagem (.*)/)
  validateResponse(json: string) {
    validProps(json, this.response)
  }

}

export = ValidateCredentialsSteps