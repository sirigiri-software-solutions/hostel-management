import React from 'react'
import Button from './Button';

const SmallCard = (props) => {

    const handleClick = () => {
        // console.log(props.index)
    }

    const {index, item} = props
    return (
        <div className='small-card'>
            <div key={index} className="menu-item">
                <div style={{backgroundColor: 'rgba(255, 205, 77, 0.2)', padding:'30px 20px', borderRadius:'15px'}} className='image-container'>
                    <img style={{width:'45px', height:'45px'}} src={item.image} alt={item.heading} className='image' />
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'10px', padding:'5px 20px'}}>
                    <label style={{fontSize:'24px', fontWeight:'bold'}}>{item.heading}</label>
                    <label style={{fontSize:'32px', fontWeight:'bold', lineHeight:'125%'}} className='text-number'>{item.number}</label>
                </div>
            </div>
            <div> {item.edit && <Button icon={item.edit.icon} variant={item.edit.variant} text={item.edit.text} onClick={handleClick}/>}</div>
        </div>
    )
}

export default SmallCard;
