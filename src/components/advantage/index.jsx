import React from 'react'
import './main.css'

import blueVerifed from '../../layouts/icons/blue_verifed.svg'
import blueBuds from '../../layouts/icons/operator.svg'
import blueTruck from '../../layouts/icons/truck.svg'

function AdvantageMain() {
  return (
    <div>
      <center style={{marginTop: '120px'}}>
        <div className="container">
          <h3 className='advantage_main_text'>Наше преимущество</h3>

          <div className='d-flex justify-content-between'>
            <div className='advantage_cards'>
              <img src={blueVerifed} alt="blueVerifed" />

              <h3 className='advantage_theme'>Гарантия качества</h3>
              <p className='advantage_text'>Качественные экологичные материалы</p>
            </div>

            <div className='advantage_cards'>
              <img src={blueTruck} alt="blueVerifed" />

              <h3 className='advantage_theme'>Быстрая доставка</h3>
              <p className='advantage_text'>Доставка по всему Узбекистану</p>
            </div>

            <div className='advantage_cards'>
              <img src={blueBuds} alt="blueVerifed" />

              <h3 className='advantage_theme'>Сервис</h3>
              <p className='advantage_text'>Лёгкий процесс оплаты, обмена и <br /> возврата</p>
            </div>
          </div>
        </div>
      </center>
    </div>
  )
}

export default AdvantageMain