import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '..';
import AccountItem from '@/components/shared/AccountItem';
import { RoundedSpinner, Search } from '@/assets/svg';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebouce';
import GlobalApi from '@/apis/globalApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MenuSearch() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const debouncedValue = useDebounce(searchValue, 1000);
  const {currentUser} = useSelector(state => state.auth);
  
 

  useEffect(() => {
    if(!debouncedValue || !debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const globalSearch = async () => {
      try {
        setLoading(true);
        const response = await GlobalApi.globalSearch({
          q: debouncedValue});
  
        setSearchResult(response);
        setLoading(false);
      }catch(error) {
        console.log("🚀 ~ globalSearch ~ error:", error)
        setLoading(false);
      }
    };
    globalSearch();
  }, [debouncedValue]);

  const handleChangeSearchValue = (e) => {
    if(e.key === 'Enter') {
     const newUrl  = new URLSearchParams(searchParams);
     if(searchValue && searchValue.trim()) {
      newUrl.set('q', searchValue.trim());
     }else {
      newUrl.delete('q');
     }
     navigate(`/search/top?${newUrl.toString()}`);
    }
  }

  return (
    <Tippy
      // visible={searchResult.length > 0}
      trigger="click"
      interactive
      placement="bottom-end"
      delay={[0, 800]}
      offset={[-90, 10]}
      hideOnClick={true}
      // onClickOutside={() => setSearchResult([])}
      render={(attrs) => (
        <div className="w-[320px]" tabIndex="-1" {...attrs}>
          <PopperWrapper className={` ${searchResult.metadata?.length ===0 ||  loading ? 'flex-center min-h-[100px]': ''}`}>
          {loading && <span className='animate-spin ' ><RoundedSpinner/></span>}
            {!loading && searchResult.metadata?.length >0 && searchResult.metadata?.map((item, index) => {

              if(item?.data?.id !== currentUser?.id) return  <AccountItem key={index} data={item?.data}  />
            })}

            {
              !loading && searchResult.metadata?.length ===0 &&    <span className=' text-lg text-black'> No found results</span>
            }
          </PopperWrapper>
        </div>
      )}
    >
      <div className="relative bg-[#f0f2f5]  w-[240px] rounded-full">
        <span className="absolute top-2/4 -translate-y-2/4 left-3">
          <Search color="#666" />
        </span>
        <Input
          placeholder="Search Facebook"
          className="bg-transparent py-2  pl-10 border-none focus-visible:ring-0 focus-visible:ring-white "
          value={searchValue}
          onKeyDown={handleChangeSearchValue}
          onChange = {(e) => setSearchValue(e.target.value)}
        />
      </div>
    </Tippy>
  );
}

export default MenuSearch;
