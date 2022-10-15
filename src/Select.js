import React, {useEffect, useRef, useState} from 'react';
import {Multiselect} from "multiselect-react-dropdown";

const Select = ({way,option,setOption,multiselect}) => {


    const [aTob, setAtoB] = useState([
        {cat: 'Group 1', key: '18:00(из A в B)'},
        {cat: 'Group 1', key: '18:30(из A в B)'},
        {cat: 'Group 1', key: '18:45(из A в B)'},
        {cat: 'Group 1', key: '19:00(из A в B)'},
        {cat: 'Group 1', key: '19:15(из A в B)'},
        {cat: 'Group 1', key: '21:00(из A в B)'}

    ]);
    const [bToa, setBtoA] = useState([
        {cat: 'Group 2', key: '18:30(из B в A)'},
        {cat: 'Group 2', key: '18:45(из B в A)'},
        {cat: 'Group 2', key: '19:00(из B в A)'},
        {cat: 'Group 2', key: '19:15(из B в A)'},
        {cat: 'Group 2', key: '19:35(из B в A)'},
        {cat: 'Group 2', key: '21:50(из B в A)'},
        {cat: 'Group 2', key: '21:55(из B в A)'}]);
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        if (way === 'из A в B') {
            setOption([...aTob])
        }
        if (way === 'из B в A') {
            setOption([...bToa])
        }
        if (way === 'из A в B и обратно в А') {
            setOption([...aTob])
        }
    }, [way]);

    const onSelect = e => {
        setDisable(true)

        if (way === 'из A в B и обратно в А' && e.length < 2) {
            setDisable(false)
            setOption([])
            let time = e[0].key.slice(0, 5)
            let date = (time.slice(0, 2) * 3600) + (time.slice(3, 5) * 60)
            let newArray = [];
            for (let i = 0; i < bToa.length; i++) {
                let tmp = bToa[i].key.slice(0, 5)
                let date2 = (tmp.slice(0, 2) * 3600) + (tmp.slice(3, 5) * 60)
                if (date2 - date >= 3000) {

                    newArray = newArray.concat(bToa[i])
                }
            }
            setOption(newArray)
        }
    }

    return (
        <Multiselect
            ref={multiselect}
            hidePlaceholder={true}
            disable={disable}
            placeholder="Выберите время"
            disablePreSelectedValues={true}
            displayValue="key"
            onKeyPressFn={function noRefCheck() {
            }}
            onRemove={function noRefCheck() {
            }}
            onSearch={function noRefCheck() {
            }}
            onSelect={onSelect}
            options={option}
        />
    );
};

export default Select;