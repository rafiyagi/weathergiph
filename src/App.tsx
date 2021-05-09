import React, {ChangeEventHandler, useState} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {getWeatherByZipCode} from './openweather-api'
import {InputGroup} from "react-bootstrap";
import {AxiosResponse} from "axios";

const App = (): JSX.Element => {
    const [state, setState] = useState({
        zip: '',
        processingSubmit: false
    })

    const handleLocationInputChange: ChangeEventHandler<HTMLInputElement> = ({
        target
    }) => {
        setState({ ...state, zip: target.value })
    }

    const handleSubmit = () => {
        setState({ ...state, processingSubmit: true})
        getWeatherByZipCode(state.zip)
            .then((result: AxiosResponse) => {
                if(result.data.status === 200) {

                }
            })
    }

    return (
        <Container className="p-3">
          <Jumbotron>
            <h1 className="header">
              Welcome to WeatherGiph!
            </h1>
          </Jumbotron>
          <Form>
              <Form.Label>
                  <h4>Zip code:</h4>
              </Form.Label>
            <InputGroup>
                <Form.Control
                    type="text"
                    required
                    onChange={handleLocationInputChange}
                />
            </InputGroup>
          <Button
              variant="primary"
              onClick={handleSubmit}
          >
            Get my weather giph!
          </Button>
          </Form>
        </Container>
    );
};

export default App;
