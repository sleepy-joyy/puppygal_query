import { useEffect, useState } from 'react';
import { BREEDS } from '../constants/dogs';
import { addSeconds, isValidTime } from '../helpers/Time';

const useDogs = (cacheTime: number) => {
  const cache = new Map();

  const { dachshund, maltese, terrier } = BREEDS;
  const [dogs, setDogs] = useState({ dachshunds: [], malteses: [], terriers: [] });
  const [refetchTrigger, setFetchTrigger] = useState(0);

  //캐시타임이 업데이트 될 때마다 실행될 훅
  useEffect(() => {
    if (cacheTime) {
      cache.set('cacheTime', addSeconds(cacheTime));
    }
  }, [cacheTime]);

  const fetchingDogs = async (breed: string) => {
    if (cache.has(breed)) {
      return cache.get(breed);
    }

    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`);
    const data = await response.json();
    cache.set(breed, data);

    return cache.get(breed);
  };

  //! 캐싱 업데이트함수
  const fetchDogsRevalidation = (breed: string) => {
    if (cacheTime) {
      const currentCacheTime = new Date(cache.get('cacheTime'));
      //유효시간 내일 땐 기존의 데이터를 반환하고
      if (isValidTime(currentCacheTime)) {
        return fetchingDogs(breed);
      } else {
        //유효시간이 넘었다면,캐시(맵)에 있던 캐시타임을 초기화하고,
        //새로 api를 호출하여 해당 데이터를 캐시(맵)안에 저장
        resetCache();
        cache.set('cacheTime', addSeconds(cacheTime));
        return fetchingDogs(breed);
      }
    } else {
      throw new Error('No Cache Time Parameter.');
    }
  };

  const resetCache = () => {
    return cache.clear();
  };

  useEffect(() => {
    const fetchData = async () => {
      //객체의 구조분해할당
      const [{ message: dachshunds }, { message: malteses }, { message: terriers }] =
        await Promise.all([
          fetchDogsRevalidation(dachshund),
          fetchDogsRevalidation(maltese),
          fetchDogsRevalidation(terrier),
        ]);

      // const dachshunds = contents[0].message;
      // const malteses = contents[1].message;
      // const terriers = contents[2].message;

      setDogs({ dachshunds, malteses, terriers });
    };
    fetchData();
  }, [refetchTrigger]);

  return { dogs, refetchTrigger, setFetchTrigger, resetCache };
};
export default useDogs;
