import React from 'react'
import footer from "../assets/footer.png"
import foot from "../assets/foot.png"

export default function Footer() {
  return (
    <section>
        <img src={footer} alt="foot" className='w-full md:block hidden' />
        <img src={footer} alt="foot" className='w-full md:hidden block' />
      
    </section>
  )
}
