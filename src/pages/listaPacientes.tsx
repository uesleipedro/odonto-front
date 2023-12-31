import React, { use, useEffect, useState, useMemo } from "react"
import { FaTooth, FaBookMedical, FaTrashAlt } from "react-icons/fa"
import { BiSolidFileDoc } from "react-icons/bi"
import { MdAttachMoney } from "react-icons/md"
import Link from "next/link"
import api from "../utils/Api"

type Pacientes = {
    nome: string;
    cpf: string;
    rg: string;
}

type GetPacientesResponse = {
    data: Pacientes[];
}

const ListaPacientes = () => {

    const [paciente, setPaciente] = useState([])
    const [searchVal, setSearchVal] = useState('')

    useEffect(() => {
        fetchPaciente()
    }, []);

    const fetchPaciente = async () => {
        await api.get<any>('paciente')
            .then(response => {
                setPaciente([...paciente, ...response.data])
            })
            .catch(function (error) {
                console.error(error.message);
            })
    }

    const filteredData = useMemo(() => {
        if (searchVal.trim() === '') {
            return paciente
        }
        return paciente.filter(dataItem => dataItem.nome.toLowerCase().includes(searchVal.toLocaleLowerCase()));
    }, [paciente, searchVal])

    return (
        <div className="m-5 p-5  rounded-lg shadow-lg">
            <div className="mb-5 flex flex-row flex-wrap w-full justify-between items-center">
                <input type="text" onChange={e => setSearchVal(e.target.value)} className="form-input mr-4 rounded-lg text-gray-600" placeholder="Buscar paciente" />
                <Link href="/cadastroPacientes">
                    <button className="bg-purple-800 hover:bg-purple-500 rounded-lg p-2 text-white font-bold">
                        Novo paciente
                    </button>
                </Link>
            </div>

            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg shadow overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-purple-800 dark:bg-purple-700">
                                    <tr className="text-white text-left font-medium">
                                        <th scope="col" className="px-6 py-3">Nome</th>
                                        <th scope="col" className="px-6 py-3 ">Prontuário</th>
                                        <th scope="col" className="px-6 py-3">Paciente desde</th>
                                        <th scope="col" className="px-6 py-3">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredData.map((data: any) => (
                                        <tr key={data.cpf}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-900 font-bold">{data.nome}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-900 font-bold">{data.rg}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-900 font-bold">{data.cpf}</td>
                                            <td className="flex flex-row gap-3 px-6 py-4 whitespace-nowrap text-right text-md font-medium">
                                                <a className="text-purple-800 hover:text-purple-900" href="#">
                                                    <FaTooth />
                                                </a>
                                                <a className="text-purple-800 hover:text-purple-900" href="#">
                                                    <FaBookMedical />
                                                </a>
                                                <a className="text-purple-800 hover:text-purple-900" href="#">
                                                    <BiSolidFileDoc />
                                                </a>
                                                <a className="text-purple-800 hover:text-purple-900" href="#">
                                                    <MdAttachMoney />
                                                </a>
                                                <a className="text-purple-800 hover:text-purple-900" href="#">
                                                    <FaTrashAlt />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ListaPacientes