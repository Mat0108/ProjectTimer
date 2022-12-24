import { useEffect, useContext, useState } from 'react'
import { LanguageContext } from '@containers/Language';
import ImportSVG from '@utils/ImportSVG';
import { useTheme } from 'next-themes';


const SearchBox = ({ list, setResults, page }) => {
    const { dictionary } = useContext(LanguageContext);
    const { theme } = useTheme()
    const [query, setQuery] = useState('')
    const [border, setBorder] = useState('border-[#909091]')
    useEffect(()=>{
        setQuery('')
        setResults(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
      },[page])

    const onChange = (event) => {
        const query = event.target.value;
        setQuery(query)
        if (query.length) {
            console.log(query)
            setResults(list.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())))
        } else {
            setResults(null)
        }
    }
    const color = theme == 'dark' ? 'white' : '#323335'
    // console.log('search',list)

    return (
        <div className="relative w-full">
            <div className={`flex p-2 h-[50px] w-full text-xl align-middle rounded-[5px] border-solid border-[1px] bg-white dark:bg-charcoal ${border}`}>
                <div className='mr-2'>
                    <ImportSVG src={'Search'} color={color} size={[16,16]}/>
                </div>
                <input
                    className="focus:outline-none w-full bg-white dark:bg-charcoal"
                    onChange={onChange}
                    onFocus={()=>setBorder('border-green')}
                    onBlur={()=>setBorder('border-[#909091]')}
                    placeholder={`${dictionary.search}...`}
                    type='text'
                    value={query}
                />
            </div>
        </div>
    )
}
export default SearchBox