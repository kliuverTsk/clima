import { useState } from "react"

export function MostrarClima({ temperatura, tempMax, tempMin, sensacionTermica, humedad, descripcion, icono, viento, ciudad, pais, presion, pronostico }){
    const [mostrarDetalles, setMostrarDetalles] = useState(false)

    if(!ciudad){
        return <h1>No hay datos</h1>
    }
    
    const pronosticoPorDia = pronostico?.reduce((dias, medicion) => {
        const fecha = new Date(medicion.dt * 1000).toLocaleDateString()
        if (!dias[fecha]) {
            dias[fecha] = medicion
        }
        return dias
    }, {})
    
    return (
        <div className="clima-actual">
            <h2 className="ciudad-titulo">{ciudad}, {pais}</h2>
            <img src={icono} alt="clima" />
            <p className="temperatura-principal">{temperatura}°C</p>
            <p className="descripcion">{descripcion}</p>
            
            <button 
                className="mostrar-detalles"
                onClick={() => setMostrarDetalles(!mostrarDetalles)}
            >
                {mostrarDetalles ? 'Mostrar menos' : 'Mostrar más'}
            </button>

            {mostrarDetalles && (
                <div className="detalles-clima">
                    <p>Máxima: {tempMax}°C</p>
                    <p>Mínima: {tempMin}°C</p>
                    <p>Sensación térmica: {sensacionTermica}°C</p>
                    <p>Humedad: {humedad}%</p>
                    <p>Viento: {viento} km/h</p>
                    <p>Presión: {presion} hPa</p>
                </div>
            )}

            <div className="pronostico-container">
                <h3>Pronóstico próximos días:</h3>
                <div className="pronostico-dias">
                    {pronostico && Object.values(pronosticoPorDia).map((dia, index) => (
                        <div key={index} className="dia-card">
                            <p>{new Date(dia.dt * 1000).toLocaleDateString()}</p>
                            <img 
                                src={`https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`}
                                alt="clima"
                            />
                            <p>{dia.main.temp}°C</p>
                            <p>{dia.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}