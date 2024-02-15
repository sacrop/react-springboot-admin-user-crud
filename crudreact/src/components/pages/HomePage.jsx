import React from 'react'
import Header from '../header/user/Header';
import { useDispatch, useSelector } from 'react-redux';
import { incrementcounter } from '../store/slice/CounterSlice';

const HomePage = () => {

  // const val=useSelector((state)=>state.counterReducer.value)
  // const dispatch=useDispatch();
  // const incrementfunc=()=>{
  //     setInterval(()=>dispatch(incrementcounter()),1000)
  // }
  console.log(val)
  return (
    <>
    <Header></Header>
    {/* <button onClick={incrementfunc}>increment</button>
    {val} */}
    </>
  )
}

export default HomePage;