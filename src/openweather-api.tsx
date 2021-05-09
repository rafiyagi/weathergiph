import axios, {AxiosResponse} from 'axios';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY || 'fooApiKey'
const API_BASE_URL = 'api.openweathermap.org/data/2.5/weather'
const COUNTRY_CODE = 'us'

const getOpenWeatherData = (params: object): Promise<AxiosResponse> => {
    const urlParams = new URLSearchParams({
        ...params,
        appid: API_KEY
    })
    return axios.get(`${API_BASE_URL}?${urlParams}`)
}

export function getWeatherByZipCode (zipCode: string): Promise<AxiosResponse> {
    return getOpenWeatherData({zip: `${zipCode},${COUNTRY_CODE}`})
}
