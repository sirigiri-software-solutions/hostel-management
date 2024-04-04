import React, { useEffect, useState } from 'react'
const SmallCard = (props) => {

    const {index, item} = props
    let [card,setCard]=useState(false)

    useEffect(()=>{
        const handleResize = () => {
             if(window.innerWidth < 576){
              setCard(true);
             }else{
              setCard(false);
             }
        }
        handleResize();
        window.addEventListener('resize',handleResize);
      })
    return (
        <>
        {card ? (<div key={index} className="menu-item" style={{width:"500px"}}>
            <div style={{backgroundColor: 'rgba(255, 205, 77, 0.2)', padding:'30px 20px', borderRadius:'15px'}}>
                <img style={{width:'45px', height:'45px'}} src={item.image} alt={item.heading} className='image' />
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'10px', padding:'5px 20px'}}>
                <label style={{fontSize:'24px', fontWeight:'bold'}}>{item.heading}</label>
                <label style={{fontSize:'32px', fontWeight:'bold', lineHeight:'125%'}} className='text-number'>{item.number}</label>
            </div>
            </div>
            
            ):
            
            (<div key={index} className="menu-item">
            <div style={{backgroundColor: 'rgba(255, 205, 77, 0.2)', padding:'30px 20px', borderRadius:'15px'}} className='image-container'>
                <img style={{width:'45px', height:'45px'}} src={item.image} alt={item.heading} className='image' />
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'10px', padding:'5px 20px'}}>
                <label style={{fontSize:'24px', fontWeight:'bold'}}>{item.heading}</label>
                <label style={{fontSize:'32px', fontWeight:'bold', lineHeight:'125%'}} className='text-number'>{item.number}</label>
            </div>
            </div>
            )}
        </>
    )
}

export default SmallCard;
