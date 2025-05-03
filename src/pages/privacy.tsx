import Container from '@/components/Container'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import SiteHeader from '@/components/SiteHeader'
import { demoPrivacy } from '@/config/dummy'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

const Privacy = () => {
  return (
    <>
    <Head>
      <title>Privacy Policy</title>
    </Head>
    <SiteHeader />
    <PageHeader
      title="Privacy Policy"
      className="!min-h-[40vh]" containerClassname="!min-h-[40vh]"
    />
    <Container className='py-20'>
        <div className='w-full mx-auto 2xl:w-8/12 editor' dangerouslySetInnerHTML={{__html:demoPrivacy}} />
    </Container>
    <Footer/>
    </>
  )
}

export const getStaticProps: GetStaticProps<any> = async () => {
  return {
    props: {
    },
  };
};

export default Privacy