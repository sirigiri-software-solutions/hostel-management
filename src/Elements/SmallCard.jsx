import React from 'react'

const SmallCard = (props) => {
    const {index, item} = props
    return (
        <div key={index} className="menu-item" style={{marginBottom: "20px"}}>
            <div className='image-container'>
                <img src={item.image} alt={item.heading} className='image' />
            </div>
            <div className='text-container'>
                <h1 className='text-heading'>{item.heading}</h1>
                <p className='text-number'>{item.number}</p>
            </div>
        </div>
    )
}

export default SmallCard;
