import { useCallback, useRef, useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Search } from '@general/Search.svg';
import { useMemo } from 'react';

const SearchBoxWithSuggestions = ({ list , customOnClick}) => {
    const searchRef = useRef(null);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(false);
    const [results, setResults] = useState([]);
    const onChange = useCallback((event) => {
        const query = event.target.value;
        setQuery(query)
        if (query.length) {
            const newList = list.filter(component => component.props.searchable.toLowerCase().includes(query.toLowerCase()))
            setResults(newList.map(el => el.props.searchable).slice(0, 5))
        } else {
            setResults([])
        }
    }, [list])

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', customOnClick)
    }, [customOnClick])

    
    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false)
            window.removeEventListener('click', customOnClick)
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    // const onClickElement= (elem)=>{
    //     setActive(false)
    //     setQuery(elem)
        
    // }

    return (
        <div
            className="relative"
            ref={searchRef}
        >
            <div className="pl-[2%] w-full text-xl rounded-2xl bg-bright-grey dark:bg-charcoal">
                <SearchIcon className="absolute top-3 left-3" />
                <input id="search" className="search" onChange={onChange} onFocus={onFocus} placeholder='Search' type='text' value={query}/>
            </div>
            {active && results.length > 0 && (
                
                <div className="absolute z-[1000] search-results bg-bright-grey dark:bg-charcoal rounded-b-3xl">
                    <ul>
                        {results.map(name => (
                            <li className="m-[3%] p-[2%] bg-light-blue text-white  rounded-2xl " key={name} onClick={onClick}>{name} </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}
export default SearchBoxWithSuggestions