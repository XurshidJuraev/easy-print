import React from 'react'
import './main.css'
import HeaderMain from '../../components/header'
import HeroMain from '../../components/hero'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'

import your_design from '../../layouts/images/your_design.svg'
import design1 from '../../layouts/images/gifts_for_him.svg'
import design2 from '../../layouts/images/trump.svg'
import like from '../../layouts/icons/like.svg'
import bag from '../../layouts/icons/active_bag_icon.svg'

function HomePage() {
  return (
    <>
      <HeaderMain />
      <HeroMain />
      
      <section className='container' style={{marginTop: '24px', margin: '24px 100px'}}>
        <center>
          <h2 className='products_father_text'>Хиты Продаж</h2>
        </center>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
          <div className="cards">
            <img src={your_design} alt="your_design" />

            <div className="d-flex justify-content-between mt-3">
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design2} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design1} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design2} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design1} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design2} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design1} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design2} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design1} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdvantageMain />
      <FooterMain />
    </>
  )
}

export default HomePage