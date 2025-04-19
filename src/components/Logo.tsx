import Image from 'next/image'
import Link from 'next/link'
import React, { memo } from 'react'

const Logo = () => {
  return (
    <Link href={"/"}>
        <Image src={'/assets/images/logo.png'} alt='site-logo' height={130} width={130} />
    </Link>
  )
}

export default memo(Logo)