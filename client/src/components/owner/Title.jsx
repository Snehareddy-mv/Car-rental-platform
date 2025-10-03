import React from 'react'

const Title = ({title,subTitle}) => {
  return (
    <>
    <h1 className='text-3xl font-medium'>{title}</h1>
    <p className='mt-2 text-sm md:text-base text-gray-500/90 max-w-156'>{subTitle}</p>
    </>
  )
}

export default Title