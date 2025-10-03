import React from 'react'

const Title = ({title,subTitle,align,className}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${align === "left" && "md:items-start md:text-left"  }`}>
        <h1 className={`font-semibold text-3xl md:text-[35px] ${className}`}>{title}</h1>
        <p className='text-sm text-gray-500/90 mt-2 md:text-base'>{subTitle}</p>
    </div>
  )
}

export default Title