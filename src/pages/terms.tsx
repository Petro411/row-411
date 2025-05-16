import Container from '@/components/Container'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import SiteHeader from '@/components/SiteHeader'
import baseApi, { endpoints } from '@/services/api'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
type Props = {
  content:any
}
const Terms = ({content}:Props) => {
  return (
    <>
    <Head>
      <title>Terms of use</title>
    </Head>
    <SiteHeader />
    <PageHeader
      title="Terms of use"
      className="!min-h-[40vh]" containerClassname="!min-h-[40vh]"

    />
    <Container className='py-20'>
        <div className='w-full mx-auto 2xl:w-8/12 editor' dangerouslySetInnerHTML={{__html:content}} />
    </Container>
    <Footer/>
    </>
  )
}

export const getStaticProps: GetStaticProps<any> = async () => {
  try {

    const res = await baseApi.get(`${endpoints.getPage}?slug=terms`);
    return {
      props: {
        content:res.data?.content,
      },
      revalidate: 60,
    };
  } catch (error) {
   return{
    props: {
      content:`<h1>Something went wrong</h1>`
    },
    revalidate: 60,
   } 
  }
};
export default Terms