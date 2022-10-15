import React, {useRef, useState} from 'react';
import './app.css'
import Form from 'react-bootstrap/Form';
import {Button, Container} from "react-bootstrap";
import Select from "./Select";
import {Multiselect} from "multiselect-react-dropdown";

const App = () => {
    const [option, setOption] = useState([])
    const [way, setWay] = useState('из A в B')
    const [answer, setAnswer] = useState()
    const multiselect = useRef(null);
    let travel = '';
    let timeTravel = '';
    const calculation = () => {

        let sum = document.getElementById('num').value

        for (let i = 0; i < multiselect.current.getSelectedItems().length; i++) {
            let date = new Date()
            let activeTime = multiselect.current.getSelectedItems()[i].key.slice(0, 5)
            date.setHours(activeTime.slice(0, 2))
            date.setMinutes(Number(activeTime.slice(3, 5)) + 50)
            travel += `\nВремя отправления ${multiselect.current.getSelectedItems()[i].key} .\n` +
                `Время прибытия ${date.getHours() + ":" + date.getMinutes()}.\n`
        }

        if (way === 'из A в B' || way === 'из B в A') {
            timeTravel = '50 мин';
            sum = sum * 700
        }
        if (way === 'из A в B и обратно в А') {
            timeTravel = '1ч 40 мин';
            sum = sum * 1200;
        }

        setAnswer(`Вы выбрали количество билетов - ${document.getElementById('num').value} ,на сумму ${sum}рублей.\n` +
            `Маршрут - ${way},займет ${timeTravel}.\n\t`+
                `${travel}`)
    }
    return (<>

        <Container className="container">
            <Form.Text>Выберите маршрут</Form.Text>
            <Form.Select onChange={e => {
                setWay(e.target.value)
            }}>
                <option value="из A в B">из A в B</option>
                <option value="из B в A">из B в A</option>
                <option value="из A в B и обратно в А">из A в B и обратно в А</option>
            </Form.Select>
            <Form.Text htmlFor="time">Выберите время</Form.Text>

            <Select way={way} option={option} setOption={setOption} multiselect={multiselect}/>

            <Form.Text htmlFor="num">Количество билетов</Form.Text>
            <Form.Control
                id="num"
                placeholder="Введите количество билетов"
                aria-describedby="basic-addon1"
                defaultValue="1"
            />
            <Button variant="outline-success" className="mt-3" onClick={calculation}>Посчитать</Button>
        </Container>
        <Container><Form.Text className="answer">{answer}</Form.Text></Container>
    </>);
};

export default App;