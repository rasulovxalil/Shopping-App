import React from 'react'

export default function card({item,handleClick}) {
    const { title,author ,price ,img} = item ;
  return (
    <div className='cards'>
        <div className='image_box'>
            <img src={img} />
        </div>
        <div className='details'>
            <p>{title}</p>
            <p>{author}</p>
            <p>{price} Lari</p>
            <button onClick={()=> handleClick(item)}>Add to Card</button>
        </div>
    </div>
  )
}
