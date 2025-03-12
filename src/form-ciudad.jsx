import { useState } from "react"
import { MostrarClima } from "./mostrarClima"

export function FormCiudad() {
    const [city, setCity] = useState("")
    const [infoClima, setinfoClima] = useState({})
    const key = '1ff9f056951dc9f26f2d3241c665c712'

    const obtenerClimaGeolocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=es`
                    )
                    const data = await response.json()
                    if (response.ok) {
                        const pronosticoResponse = await fetch(
                            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=es`
                        )
                        const pronosticoData = await pronosticoResponse.json()
                        setinfoClima({
                            pronostico: pronosticoData.list,
                            temperatura: data.main.temp,
                            tempMax: data.main.temp_max,
                            tempMin: data.main.temp_min,
                            sensacionTermica: data.main.feels_like,
                            humedad: data.main.humidity,
                            descripcion: data.weather[0].description,
                            icono: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                            viento: data.wind.speed,
                            ciudad: data.name,
                            pais: data.sys.country,
                            presion: data.main.pressure
                        })
                    }
                } catch (error) {
                    console.log("Error obteniendo el clima")
                }
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!city) return
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=es`)
            const data = await response.json()
            if (response.ok){
                const pronosticoResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric&lang=es`)
                const pronosticoData = await pronosticoResponse.json()
                
                setinfoClima({
                    pronostico: pronosticoData.list,
                    temperatura: data.main.temp,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    sensacionTermica: data.main.feels_like,
                    humedad: data.main.humidity,
                    descripcion: data.weather[0].description,
                    icono: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                    viento: data.wind.speed,
                    ciudad: data.name,
                    pais: data.sys.country,
                    presion: data.main.pressure
                })
                setCity('')
            }else{
                console.log('ciudad no encontrada')
            }
        }catch (error) {
            console.log("error")
        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="search-form">
                <h1>Busca tu ciudad</h1>
                <input 
                    type="text" 
                    name="city" 
                    id="city" 
                    placeholder="Escribe el nombre de una ciudad..."
                    onChange={(e)=> setCity(e.target.value)} 
                    value={city}
                />
                <button type="submit">Buscar</button>
                <button id="geo" type="button" onClick={obtenerClimaGeolocation}>
                    Usar mi ubicación
                </button>
            </form>
            <MostrarClima {...infoClima}/>
        </div>
    )
}
