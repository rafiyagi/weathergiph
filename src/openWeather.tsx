import { useState } from 'react'
import axios, {AxiosResponse} from 'axios'

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY || 'fooApiKey'
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const COUNTRY_CODE = 'us'

const get = (params: object): Promise<AxiosResponse> => {
    const urlParams = new URLSearchParams({
        ...params,
        units: 'imperial',
        appid: API_KEY
    })
    return axios.get(`${API_BASE_URL}?${urlParams}`)
}

export type OpenWeatherResponse = IOpenWeatherData | null

export interface IOpenWeatherData {
    city: string
    description: string
    feels_like: number
}

export default (): [(zip: string) => void, OpenWeatherResponse, string, boolean] => {
    const [response, setResponse] = useState<OpenWeatherResponse>(null)
    const [processing, setProcessing] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const getWeatherByZipCode = async (zip: string) => {
        setProcessing(true)

        try {
            const { data, status } = await get({zip: `${zip},${COUNTRY_CODE}`})
            if (status === 200 && data) {
                setResponse({
                    city: data?.name,
                    description: data?.weather[0].description,
                    feels_like: data?.main.feels_like
                });
                setErrorMsg("")
            }
            setProcessing(false)
        } catch (error) {
            setResponse(null)
            setErrorMsg(error.message)
        }

        setProcessing(false)
    };

    return [getWeatherByZipCode, response, errorMsg, processing];
};
