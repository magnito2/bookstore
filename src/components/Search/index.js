import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import FormInput from '../forms/FormInput';

import './styles.scss';

const Search = ({}) => {

    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        
    }, [keyword]);

    const configSearch = {
        type: 'text',
        placeholder: 'I\'m Shopping for',
        handleChange: (e) => setKeyword(e.target.value)  
    };

    return (
        <div className='search'>
            <div className='searchIcon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <FormInput 
                {...configSearch}
            />
        </div>
    );
}

export default Search;