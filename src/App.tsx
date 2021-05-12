import React, {ChangeEventHandler, useState, FormEvent} from 'react';
import {Jumbotron, Container, Alert, Spinner, Card, Form, Button, InputGroup} from 'react-bootstrap';
import OpenWeather from './openWeather'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { IGif } from "@giphy/js-types";
import { Gif } from "@giphy/react-components";

const App = (): JSX.Element => {
	const [zip, setZip] = useState<string>('')
    const [gif, setGif] = useState<IGif | null>(null);
    const [getWeatherByZip, weatherData, errMsg, processing] = OpenWeather()

    const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

    const getGif = async () => {
        const searchTerm = `${weatherData?.city} ${weatherData?.description}`
        const { data } = await giphyFetch.search(searchTerm, { sort: 'relevant', lang: 'en', limit: 20, type: 'gifs' });
        const randomIndex = Math.floor(Math.random() * 20)
        setGif(data?.[randomIndex])
    }

	const handleLocationInputChange: ChangeEventHandler<HTMLInputElement> = ({
		target
	}) => {
		setZip(target.value)
	}

	const handleSubmit = async (e: FormEvent) => {
	    e.preventDefault()
		await getWeatherByZip(zip)
		await getGif()
        if(errMsg.length > 0) {
            setZip('')
        }
	}

	return (
        <Container className="p-3">
            <Jumbotron style={{textAlign: 'center'}}>
                <iframe
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
            {weatherData && gif && (
                <Card style={{marginLeft: 'auto', marginRight: 'auto', width: 500}}>
                    <Card.Header>{weatherData.city}</Card.Header>
                    <div style={{textAlign: "center"}}>
                        <Gif gif={gif} width={500}/>
                    </div>
                    <Card.Body>
                        <Card.Text style={{textTransform: 'capitalize'}}>
                            {weatherData.description} | Feels like {weatherData.feels_like}°F
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            {errMsg.length > 0 && (
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
                    type={"submit"}
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
	);
};

export default App;
