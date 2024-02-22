import React, { useEffect } from 'react'
import HeaderMain from '../../../../components/header'
import FooterMain from '../../../../components/footer'
import FooterInformationHeader from '../../../../components/footer/information header'
import AdsSlider from '../../../../components/ads slider'
import './main.css';

function FooterExchangePage() {
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
            <h1 className='footer_delivery_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обмен и возврат' : 'Almashtirish va qaytarish'}</h1>
            <p className='footer_delivery_text' style={{marginBottom: '6px', marginTop: '10px', fontFamily: 'Inter600'}}><b>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Если вы получили товар ненадлежащего качества:' : `Agar siz sifatsiz mahsulot olgan bo'lsangiz:`}</b></p>
            <p className='footer_delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Мы приносим свои извинения и готовы обменять вам товар или вернуть деньги.' : `Biz uzr so'raymiz va mahsulotingizni almashtirishga yoki pulingizni qaytarishga tayyormiz.`}</p>

            <ul>
              <li className='exchange_item' style={{color: '#3C7CFB'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Заполните форму' : `Shaklni to'ldiring`}</li>
              <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'В течение 5 дней мы обязательно свяжемся с вами, заменим товар или вернем деньги.' : `Biz 5 kun ichida siz bilan bog'lanamiz va mahsulotni almashtiramiz yoki pulingizni qaytarib beramiz.`}</li>
              <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обращения принимаются в течение 14 дней с момента получения заказа.' : `Arizalar buyurtma olingan kundan boshlab 14 kun ichida qabul qilinadi.`}</li>
            </ul>

            <p className='footer_delivery_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Все расходы по обмену и возврату бракованного товара мы берем на себя.' : `Biz nuqsonli tovarlarni almashtirish va qaytarish uchun barcha xarajatlarni o'z zimmamizga olamiz.`}</p>

            <p className='footer_delivery_text' style={{marginBottom: '20px', marginTop: '24px', fontFamily: 'Inter600'}}><b>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Если вы ошиблись выбором:' : `Agar siz noto'g'ri tanlov qilsangiz:`}</b></p>

            <ul>
              <li className='exchange_item' style={{color: '#3C7CFB'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Заполните форму' : `Shaklni to'ldiring`}</li>
              <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'В течение 5 дней мы обязательно свяжемся с вами и согласуем процедуру обмена.' : `Biz 5 kun ichida siz bilan bog'lanamiz va almashish tartibini kelishib olamiz.`}</li>
              <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обращения принимаются в течение 7 дней с момента получения заказа.' : `Arizalar buyurtma olingan kundan boshlab 7 kun ichida qabul qilinadi.`}</li>
            </ul>

            <p className='footer_delivery_text' style={{marginBottom: '20px', marginTop: '24px', fontFamily: 'Inter600'}}><b>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Если вы передумали:' : `Agar fikringizni o'zgartirsangiz:`}</b></p>

            <ul>
              <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Напишите нам в телеграм:' : `Bizga telegram orqali yozing:`} @<span style={{color: '#3C7CFB'}}>easyprint.uz</span> {localStorage.getItem('selectedLanguage') === 'ru' ? 'и в теме письма укажите номер Вашего заказа' : `va mavzu satrida buyurtma raqamingizni ko'rsating`}</li>
              <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Мы свяжемся с вами и вернем деньги.' : `Biz siz bilan bog'lanamiz va pulingizni qaytarib beramiz.`}</li>
              <li className='exchange_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Обращения принимаются в течение 7 дней с момента получения заказа.' : `Arizalar buyurtma olingan kundan boshlab 7 kun ichida qabul qilinadi.`}</li>
            </ul>

            {/* <h4 className='footer_delivery_subtitle mt-4'>Банковские карты</h4>
            <p className='footer_delivery_text'>К оплате принимаются банковские карты платежных систем UZCARD и HUMO. <br /> <br /> Чтобы оплатить заказ банковской картой выберите способ “Оплатить онлайн при помощи банковской карты” на этапе оформления заказа. Чтобы перейти к этапу оплаты заполните все поля отмеченные звездочкой и нажмите на кнопку “Оформить заказ”. <br /> <br />  Оплата происходит на специальной странице банка. На этой странице вы увидите общую сумму платежа и сможете указать сведения вашей карты. Данные будут сообщены только на авторизационный сервер банка по защищенному каналу. EasyPrint.uz не имеет доступа к данным вашей карты.</p>

            <h4 className='footer_delivery_subtitle mt-4'>Оплата наличными при получении</h4>
            <p className='footer_delivery_text'>Для заказов суммой до 700 000 сум возможна оплата наличными при получении. Такой способ оплаты возможен только при доставке через почту Uzpost. Обратите внимание, что не все пункты самовывоза поддерживают оплату при получении. Возможность оплаты при получении отображается при выборе конкретного пункта самовывоза на этапе оформления заказа.</p> */}
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  )
}

export default FooterExchangePage