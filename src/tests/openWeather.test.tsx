import React from "react"
import axios from 'axios'
import {render, fireEvent, findByTestId} from "@testing-library/react"
import { act } from "react-dom/test-utils"
import {Button} from 'react-bootstrap'
import OpenWeather from "../openWeather"
import * as openWeatherResponse from "./fixtures/openWeatherResponse.json"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

function TestComponent({zip}: { zip: string }): JSX.Element {
    const [getWeatherByZip, weatherData,,] = OpenWeather()

    const handleGetWeather = async () => {
        await getWeatherByZip(zip)
    }

    return (
        <div>
            <div data-testid='weatherData'>
            {weatherData ? `${weatherData.city} - ${weatherData.description}` : 'No weather detected!'}
            </div>
            <Button data-testid='getWeatherDataButton' onClick={handleGetWeather}>
                Get Weather Data
            </Button>
        </div>
    )
}

describe('the OpenWeather hook', () => {
    it('shows initial state', async () => {
        const { findByTestId } = render(<TestComponent zip="some zip" />)
        const button = await findByTestId('getWeatherDataButton')
        const weatherData = await findByTestId('weatherData')
        expect(button.textContent).toBe("Get Weather Data")
        expect(weatherData.textContent).toBe('No weather detected!')
    })

    describe('weather data', () => {
        it('returns weather data', async () => {
            await act(async () => {
                mockedAxios.get.mockResolvedValue({data: openWeatherResponse, status: 200})
                const { findByTestId } = render(<TestComponent zip="80301"/>)
                const button = await findByTestId('getWeatherDataButton')
                fireEvent.click(button)
                const weatherData = await findByTestId('weatherData')
                expect(weatherData.textContent).toBe('Boulder - few clouds')
            })
        })
    })
})
