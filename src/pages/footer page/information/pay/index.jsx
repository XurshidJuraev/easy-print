import React, { useEffect } from 'react'
import HeaderMain from '../../../../components/header'
import AdvantageMain from '../../../../components/advantage'
import FooterMain from '../../../../components/footer'
import FooterInformationHeader from '../../../../components/footer/information header'
import AdsSlider from '../../../../components/ads slider'
import YandexLogo from '../../../../layouts/icons/yandex.svg'
import UzPostLogo from '../../../../layouts/icons/uzpost.svg'
import './main.css';

function FooterPayPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <HeaderMain />

      <AdsSlider />

      <div className="container">
        <div className="d-flex">
          <div>
            <FooterInformationHeader />
          </div>

          <div style={{width: '1000px', marginLeft: '80px', marginBottom: '400px'}}>
            <h1 className='footer_delivery_title'>Способы оплаты на EasyPrint</h1>
            <p className='footer_delivery_text'>Вы можете воспользоваться несколькими способамим оплаты на EasyPrint</p>

            <h4 className='footer_delivery_subtitle mt-4'>Банковские карты</h4>
            <p className='footer_delivery_text'>К оплате принимаются банковские карты платежных систем UZCARD и HUMO. <br /> <br /> Чтобы оплатить заказ банковской картой выберите способ “Оплатить онлайн при помощи банковской карты” на этапе оформления заказа. Чтобы перейти к этапу оплаты заполните все поля отмеченные звездочкой и нажмите на кнопку “Оформить заказ”. <br /> <br />  Оплата происходит на специальной странице банка. На этой странице вы увидите общую сумму платежа и сможете указать сведения вашей карты. Данные будут сообщены только на авторизационный сервер банка по защищенному каналу. EasyPrint.uz не имеет доступа к данным вашей карты.</p>

            <h4 className='footer_delivery_subtitle mt-4'>Оплата наличными при получении</h4>
            <p className='footer_delivery_text'>Для заказов суммой до 700 000 сум возможна оплата наличными при получении. Такой способ оплаты возможен только при доставке через почту Uzpost. Обратите внимание, что не все пункты самовывоза поддерживают оплату при получении. Возможность оплаты при получении отображается при выборе конкретного пункта самовывоза на этапе оформления заказа.</p>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  )
}

export default FooterPayPage