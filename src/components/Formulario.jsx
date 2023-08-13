import Mensajes from "./Mensajes"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react'
import Swal from 'sweetalert2'

export const Formulario = ({ setEstado, idMetro, setIdMetro }) => {
    // UseState
    const [error, setError] = useState(false) // Mensajes de error
    const [mensaje, setMensaje] = useState(false) // Mensajes de éxito
    const [form, setform] = useState({ // Formulario
        nombre: "demo",
        sector: "",
        salida: "",
        llegada: "",
        maquinista: "",
        detalles: ""
    })
    // UseEffect
    useEffect(() => {
        console.log(idMetro);
        if (idMetro) {
            (async function (idMetro) {
                try {
                    const respuesta = await (await fetch(`http://localhost:3000/metro/${idMetro}`)).json()
                    const { id, nombre, sector, salida, llegada, maquinista, detalles } = respuesta
                    setform({
                        ...form,
                        nombre,
                        sector,
                        salida,
                        llegada,
                        maquinista,
                        detalles,
                        id
                    })
                }
                catch (error) {
                    Swal.fire(
                        'ERROR',
                        'Ha ocurrido un error al intentar obtener los datos del registro.',
                        'error'
                    )
                }
            })(idMetro)
        }
    }, [idMetro])
    // Handle
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value.trim()
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.values(form).includes("") || Object.entries(form).length === 0) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 1000);
            return
        }
        try {
            // Actualizacion de las rutas
            if (form.id) {
                const url = `http://localhost:3000/metro/${form.id}`
                const respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(form),
                    headers: { 'Content-Type': 'application/json' }
                })
                if (!respuesta.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                setEstado(true)
                setform({})
                setIdMetro(null);
                setTimeout(() => {
                    setEstado(false)
                    setform({})
                }, 1000)
            }
            // Creacion de las rutas
            else {
                const url = "http://localhost:3000/metro"
                form.id = uuidv4()
                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: { 'Content-Type': 'application/json' }
                })
                if (!respuesta.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                setMensaje(true)
                setEstado(true)
                setTimeout(() => {
                    setMensaje(false)
                    setEstado(false)
                    setform({})
                }, 1000);
            }
        } catch (error) {
            Swal.fire(
                'ERROR',
                'Ha ocurrido un error al intentar actualizar o crear el registro.',
                'error'
            )
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <Mensajes tipo="bg-red-900">"Existen campos vacíos"</Mensajes>}
            {mensaje && <Mensajes tipo="bg-green-900">"Registro exitoso"</Mensajes>}
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de la ruta'
                    name='nombre'
                    value={form.nombre || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='sector'
                    className='text-gray-700 uppercase font-bold text-sm'>Sector: </label>
                <input
                    id='sector'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='sector de la ruta'
                    name='sector'
                    value={form.sector || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='salida'
                    className='text-gray-700 uppercase font-bold text-sm'>Punto de salida: </label>
                <input
                    id='salida'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de salida'
                    name='salida'
                    value={form.salida || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='llegada'
                    className='text-gray-700 uppercase font-bold text-sm'>Punto de llegada: </label>
                <input
                    id='llegada'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de llegada'
                    name='llegada'
                    value={form.llegada || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='maquinista'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del maquinista: </label>
                <input
                    id='maquinista'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del maquinista'
                    name='maquinista'
                    value={form.maquinista || ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='detalles'
                    className='text-gray-700 uppercase font-bold text-sm'>Detalles: </label>
                <textarea
                    id='detalles'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    name='detalles'
                    value={form.detalles || ""}
                    onChange={handleChange}
                />
            </div>

            <input type="submit"
                className='bg-sky-900 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-red-900 cursor-pointer transition-all'
                value={form.id ? "Actualizar ruta" : "Registrar ruta"} />

        </form>
    )
}
