import React, { memo } from 'react'
import Container from '../Container';
import { Heading } from '@radix-ui/themes';

type Props = {
    children?:React.ReactNode,
    title?:string
}

const AuthLayout = ({title,children}:Props) => {
  return (
    <>
    <Container className="z-50 flex flex-col min-h-screen justify-center">
    <div className="bg-white rounded-xl p-6 sm:p-10 w-full sm:w-10/12 md:w-8/12 lg:w-5/12 mx-auto shadow-lg">
    <Heading size={"7"}>{title}</Heading>
    {children}
    </div>
    </Container>
    <div className="gradientBg fixed top-0 left-0 w-full h-1/2 -z-10"/>
    </>
  )
}

export default memo(AuthLayout);