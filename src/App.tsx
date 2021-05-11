import React, {ChangeEventHandler, useState, FormEvent} from 'react';
import {Jumbotron, Container, Alert, Spinner, Card, Form, Button, InputGroup} from 'react-bootstrap';
import OpenWeather, {OpenWeatherResponse} from './openWeather'

const App = (): JSX.Element => {
	const [zip, setZip] = useState<string>('')
	const [getWeatherByZip, response, errMsg, processing] = OpenWeather()

	const handleLocationInputChange: ChangeEventHandler<HTMLInputElement> = ({
		target
	}) => {
		setZip(target.value)
	}

	const handleSubmit = async (e: FormEvent) => {
	    e.preventDefault()
		await getWeatherByZip(zip)
        if(errMsg.length > 0) {
            setZip('')
        }
	}

	const formatResponse = (response: OpenWeatherResponse) => {
	    if(response) {
            return `${response.city}: ${response.description}`
	    } else {
	        return ''
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
            {response && (
                <Card style={{marginLeft: 'auto', marginRight: 'auto', width: 500}}>
                    <Card.Header>{response.city}</Card.Header>
                    {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                    <Card.Body>
                        <Card.Text style={{textTransform: 'capitalize'}}>
                            {response.description} | Feels like {response.feels_like}°F
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
