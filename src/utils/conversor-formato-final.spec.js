const { MissingParamError, InvalidParamError } = require('./errors')
const ConversorFormatoBD = require('./conversor-formato-final')

const makeSut = () => {
  const conversorSpy = makeConversor()
  const conversor = new ConversorFormatoBD()
  return { conversor, conversorSpy }
  // return { conversorSpy }
}

const makeConversor = () => {
  class ConversorSpy {
    convert(dataDenuncia, dataEndereco) {
      this.latitude = dataDenuncia.latitude
      this.longitude = dataDenuncia.longitude
      this.nome = dataDenuncia.denunciante.nome
      this.cpf = dataDenuncia.denunciante.cpf
      this.titulo = dataDenuncia.denuncia.titulo
      this.descricao = dataDenuncia.denuncia.descricao
      this.logradouro = dataEndereco.street
      this.bairro = dataEndereco.adminArea6
      this.cidade = dataEndereco.adminArea5
      this.estado = dataEndereco.adminArea3
      this.pais = dataEndereco.adminArea1
      this.cep = dataEndereco.postalCode
      conversorSpy.denuncia = {
        data: {
          latitude: this.latitude,
          longitude: this.longitude,
          denunciante: {
            nome: this.nome,
            cpf: this.cpf,
          },
          denuncia: {
            titulo: this.titulo,
            descricao: this.descricao,
          },
          endereco: {
            logradouro: this.logradouro,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado,
            pais: this.pais,
            cep: this.cep,
          },
        },
      }
      return this.denuncia
    }
  }
  const conversorSpy = new ConversorSpy()

  return conversorSpy
}

describe('Conversor para o formato que vai salvar o documento no banco de dados', () => {
  test('O resultado do método de converter do ConversorSpy deve ser igual ao modelo de resposta.', async () => {
    const { conversorSpy } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    const respo = {
      data: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const denuncia = await conversorSpy.convert(dataDenuncia, dataEndereco)
    expect(denuncia).toEqual(respo)
  })

  test('O resultado do método de converter da classe de produção Conversor deve ser igual ao modelo de resposta.', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    const respo = {
      data: {
        latitude: -9.648198,
        longitude: -35.713458,
        denunciante: {
          nome: 'José de Oliveira',
          cpf: '95761638037',
        },
        denuncia: {
          titulo: 'Esgoto a céu aberto',
          descricao: 'Existe um esgoto a céu aberto nesta localidade.',
        },
        endereco: {
          logradouro: 'Avenida Dona Constança de Góes Monteiro',
          bairro: '',
          cidade: 'Maceió',
          estado: 'Alagoas',
          pais: 'BR',
          cep: '57036-371',
        },
      },
    }
    const denuncia = await conversor.convert(dataDenuncia, dataEndereco)
    expect(denuncia).toEqual(respo)
  })

  test('Deve dar um throw se a latitude não for fornecida a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new MissingParamError('latitude'))
  })

  test('Deve dar um throw se a longitude não for fornecida a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new MissingParamError('longitude'))
  })

  test('Deve dar um throw se o nome não for fornecido a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new MissingParamError('nome'))
  })

  test('Deve dar um throw se o cpf não for fornecido a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new MissingParamError('cpf'))
  })

  test('Deve dar um throw se o titulo não for fornecido a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new MissingParamError('titulo'))
  })

  test('Deve dar um throw se a descrição não for fornecida a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new MissingParamError('descricao'))
  })

  test('Deve dar um throw se a cidade não for fornecida a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new MissingParamError('cidade'))
  })

  test('Deve dar um throw se o estado não for fornecido a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new MissingParamError('estado'))
  })

  test('Deve dar um throw se o país não for fornecido a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new MissingParamError('pais'))
  })

  test('Deve dar um throw se o cpf fornecido a função de converter não for um numero', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: 'cpf-inválido',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new InvalidParamError('cpf'))
  })

  test('Deve dar um throw se o nome fornecido a função de converter for um numero', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 123456,
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new InvalidParamError('nome'))
  })

  test('Deve dar um throw se o titulo fornecido a função de converter for um numero', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 123,
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new InvalidParamError('titulo'))
  })

  test('Deve dar um throw se a descrição fornecida a função de converter for um numero', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 123,
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new InvalidParamError('descricao'))
  })

  test('Deve dar um throw se a cidade fornecida a função de converter for um numero', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 123,
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new InvalidParamError('cidade'))
  })

  test('Deve dar um throw se o estado fornecido a função de converter for um numero', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 123,
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new InvalidParamError('estado'))
  })

  test('Deve dar um throw se o país fornecido a função de converter for um numero', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 123,
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new InvalidParamError('pais'))
  })

  test('Deve dar um throw se a latitude fornecida a função de converter não for um numero', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: 'latitude-inválida',
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new InvalidParamError('latitude'))
  })

  test('Deve dar um throw se a longitude fornecida a função de converter não for um numero', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: 'longitude-inválida',
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    const dataEndereco = {
      street: 'Avenida Dona Constança de Góes Monteiro',
      adminArea6: '',
      adminArea5: 'Maceió',
      adminArea3: 'Alagoas',
      adminArea1: 'BR',
      postalCode: '57036-371',
    }
    return expect(
      conversor.convert(dataDenuncia, dataEndereco)
    ).rejects.toEqual(new InvalidParamError('longitude'))
  })

  test('Deve dar um throw se o objeto com os dados da denuncia não for fornecido a função de converter', async () => {
    const { conversor } = makeSut()
    return expect(conversor.convert()).rejects.toEqual(
      new MissingParamError('dataDenuncia')
    )
  })

  test('Deve dar um throw se o objeto com o endereço não for fornecido a função de converter', async () => {
    const { conversor } = makeSut()
    const dataDenuncia = {
      latitude: -9.648198,
      longitude: -35.713458,
      denunciante: {
        nome: 'José de Oliveira',
        cpf: '95761638037',
      },
      denuncia: {
        titulo: 'Esgoto a céu aberto',
        descricao: 'Existe um esgoto a céu aberto nesta localidade.',
      },
    }
    return expect(conversor.convert(dataDenuncia)).rejects.toEqual(
      new MissingParamError('dataEndereco')
    )
  })
})
