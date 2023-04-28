import dayjs from 'dayjs';

//! number 타입인 초(sec)를 매개변수로 받아, 현재 시간에 sec을 더하는 함수
export const addSeconds = (sec: number) => {
  //현재시간을 dayjs 객체로 만들고, 여기에 더하기
  return dayjs(new Date()).add(sec, 'second').toISOString();
};

// Date 타입으로 들어오는 date라는 매개변수를 받아, 현재 날짜랑 비교
//! 현재 시간 이전인지 이후인지 판단 boolean
export const isValidTime = (date: Date) => {
  //date가 현재 날짜보다 이후시간이면 true.
  return dayjs(date).isAfter(new Date());
};
