import React, { useEffect, useState } from "react"
import Link from "next/link"
import api from "../utils/Api"

interface Paciente {
    nome: string,
    cpf: string,
    rg: string,
    dt_nascimento: string,
    sexo: string,
    estado_civil: string,
    pano_saude: string,
    numero_carteirinha: string
    telefone_fixo: string,
    telefone_movel: string,
    email: string,
    nome_responsavel: string,
    telefone_responsavel: string,
    email_responsavel: string
}

const CadastroUsuario = () => {

    const [paciente, setPaciente] = useState<Paciente>()

    const updateName = e => {
        const fieldName = e.target.name
        setPaciente(existingValues => ({
            ...existingValues,
            [fieldName]: e.target.value,
        }))
    }

    const sendPacienteData = () => {
        api.post('/paciente', paciente)
            .then(function (response) {
                if (response.status === 201)
                    alert("Salvo com sucesso")
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <form className="m-5 p-5 rounded-lg shadow-lg">

            <p className="text-gray-600 font-bold">Dados Pessoais</p>
            <hr />
            <div className="w-full pl-6 mb-8 flex flex-row flex-wrap justify-between">

                <div className="w-full md:w-1/2 pr-2 pt-3">
                    <label className="text-gray-700 ">Email</label>
                    <input type="email" id="email" name="email" onChange={updateName} className="form-input rounded-lg text-gray-600 w-full" placeholder="Ex: antonio@gmail.com" />
                </div>

                <div className="w-full md:w-1/2 pt-3">
                    <label className="text-gray-700 ">Senha</label>
                    <input type="password" id="senha" name="senha" onChange={updateName} className="form-input rounded-lg text-gray-600 w-full" placeholder="**********" />
                </div>

                <div className="w-full md:w-3/5 pr-2 pt-3">
                    <label className="text-gray-700 ">Nome completo</label>
                    <input type="text" id="nome" name="nome" onChange={updateName} className="form-input rounded-lg text-gray-600 w-full" placeholder="Ex.: Marcelo Algusto" />
                </div>

                <div className="w-full md:w-2/5 pr-2 pt-3">
                    <label className="text-gray-700 ">Celular</label>
                    <input type="text" id="telefone_movel" name="telefone_movel" onChange={updateName} className="form-input rounded-lg text-gray-600 w-full" placeholder="Ex: (61) 99999-9999" />
                </div>

            </div>

            <p className="text-gray-600 font-bold">Dados da clínica</p>
            <hr />
            <div className="w-full pl-6 mb-8 flex flex-row flex-wrap justify-between">

                <div className="w-full md:w-3/4 pr-2 pt-3">
                    <label className="text-gray-700 ">Nome da clinica</label>
                    <input type="text" id="nome_clinica" name="nome_clinica" onChange={updateName} className="form-input rounded-lg text-gray-600 w-full" placeholder="Ex.: Clinica Odonto" />
                </div>

                <div className="w-full md:w-1/1 pr-2 pt-3 flex flex-row gap-4">
                    <div className="flex items-center ">
                        <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2" />
                        <label className="ml-2 font-medium text-gray-700">Pessoa física</label>
                    </div>
                    <div className="flex items-center">
                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600  focus:ring-blue-500  focus:ring-2" />
                        <label className="ml-2 font-medium text-gray-700">Pessoa jurídica</label>
                    </div>
                </div>

                <div className="w-full md:w-3/4 pt-3">
                    <label className="text-gray-700 ">CNPJ/CPF</label>
                    <input type="text" id="cnpj_cpf" name="cnpj_cpf" onChange={updateName} className="form-input rounded-lg text-gray-600 w-full" placeholder="000.000.000-00" />
                </div>
            </div>

            <hr />
            <div className="flex justify-end gap-3">
                <button onClick={sendPacienteData} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mt-5">
                    Salvar
                </button>

                <Link href="/listaPacientes">
                    <button className="bg-white hover:bg-gray-200 text-purple-800 border font-bold py-2 px-4 rounded-full mt-5">
                        Cancelar
                    </button>
                </Link>
            </div>

        </form >
    )
}

export default CadastroUsuario