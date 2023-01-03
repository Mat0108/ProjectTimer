import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search';
import ImageButton from '@components/General/Buttons/ImageButton';

const SearchBox = ({ list, _results, setResults}) => {
    const searchRef = useRef(null)
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(false)

    const onChange = useCallback((event) => {
        const query = event.target.value;
        setQuery(query);
        if (query.length) {
            setResults(list.filter(component => component.props.searchable.toLowerCase().includes(query.toLowerCase())))
        } else {
            setResults(list)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list])

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false)
            window.removeEventListener('click', onClick)
        }
    }, [])
    
    return (
        <div
            className="relative"
            ref={searchRef}
        >
            <div className="pl-[2%] w-full text-xl rounded-2xl bg-bright-grey flex flex-row dark:bg-charcoal ">
                <div className='ml-[2%]'>                
                    <SearchIcon  />
                </div>
                <input
                    className="search ml-2"
                    onChange={onChange}
                    onFocus={onFocus}
                    placeholder='Search'
                    type='text'
                    value={query}
                />
            </div>
        </div>
    )
}
export default SearchBox