import Container from '@/components/Container'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import SiteHeader from '@/components/SiteHeader'
import { demoTerms } from '@/config/dummy'
import Head from 'next/head'
import React from 'react'

const Terms = () => {
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
        <div className='w-full mx-auto 2xl:w-8/12 editor' dangerouslySetInnerHTML={{__html:demoTerms}} />
    </Container>
    <Footer/>
    </>
  )
}

export default Terms