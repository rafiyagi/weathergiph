import React, {ChangeEventHandler, useState, FormEvent, useEffect} from 'react'
import {Jumbotron, Container, Alert, Spinner, Card, Form, Button, InputGroup} from 'react-bootstrap'
import OpenWeather from './openWeather'
import Giphy from './giphyApi'
import { Gif } from "@giphy/react-components"

const App = (): JSX.Element => {
	const [zip, setZip] = useState<string>('')
	const [errMsg, setErrMsg] = useState<string>('')
	const [getWeatherByZip, weatherData, getWeatherErr, processing] = OpenWeather()
	const [getGif, gifData, getGifErrMsg, processingGif] = Giphy()

	const handleLocationInputChange: ChangeEventHandler<HTMLInputElement> = ({
		target
	}) => {
		setZip(target.value)
	}

	useEffect(() => {
		setErrMsg(getWeatherErr)
	}, [getWeatherErr])

	useEffect(() => {
		setErrMsg(getGifErrMsg)
	}, [getGifErrMsg])

	useEffect(() => {
		getGif(`${weatherData?.description} - ${weatherData?.city}`)
	}, [weatherData])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		await getWeatherByZip(zip)
	}

	return (
		<Container className="p-3">
			<Jumbotron style={{textAlign: 'center'}}>
				<iframe
					title='WeatherGiphy'
					src="https://giphy.com/embed/3oeHLglDZz0DJgXBcY"
					width="480"
					height="193"
					frameBorder="0"
					className="giphy-embed"
					allowFullScreen
				 />
				<h1 className="header">
					<i>WeatherGiphy - the overly dramatic weather app</i>
				</h1>
			</Jumbotron>
			{weatherData && (
				<Card style={{marginLeft: 'auto', marginRight: 'auto', width: 500}}>
					<Card.Header>{weatherData.city}</Card.Header>
					<div style={{textAlign: "center"}}>
						{processingGif && (
							<Spinner
								as="span"
								animation="grow"
								size="sm"
								role="status"
								aria-hidden="true"
							/>)}
						{gifData && (
							<Gif gif={gifData} width={500}/>
						)}
					</div>
					<Card.Body>
						<Card.Text style={{textTransform: 'capitalize'}}>
							{weatherData.description} | Feels like {weatherData.feels_like}°F
						</Card.Text>
					</Card.Body>
				</Card>
			)}
			{errMsg && (
				<Alert variant={'danger'}>
					{errMsg}
				</Alert>
			)}
			<Form onSubmit={(event) => handleSubmit(event)}>
				<Form.Group controlId={'weatherGiphy'}>
					<Form.Label>
						<h4>Enter Zip Code:</h4>
					</Form.Label>
					<InputGroup>
						<Form.Control
							type="text"
							required
							value={zip}
							onChange={handleLocationInputChange}
						/>
					</InputGroup>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
				>
					{processing && (
						<Spinner
							as="span"
							animation="grow"
							size="sm"
							role="status"
							aria-hidden="true"
						/>)}
					{processing ? 'Loading...' : 'Giphme my weather'}
				</Button>
			</Form>
		</Container>
	)
}

export default App
