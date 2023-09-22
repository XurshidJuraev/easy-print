import React, { useEffect, useState } from 'react';
import HeaderMain from '../../components/header';
import './main.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import pencil from '../../layouts/icons/pencil.svg'
import trash from '../../layouts/icons/trash.svg'

import no_data from '../../layouts/images/no_trash.svg'
import AdvantageMain from '../../components/advantage';
import FooterMain from '../../components/footer';
import CardFour from '../../layouts/always';

function Basket() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [giftPackagingAdded, setGiftPackagingAdded] = useState(false);

  function handleDeleteClick(id) {
    const updatedTrashCardData = trashCardData.filter((item) => item.id !== id);
    setTrashCardData(updatedTrashCardData);
  
    localStorage.setItem('trashCard', JSON.stringify(updatedTrashCardData));
  
    // Yangilash uchun selectedProduct ni o'zgartiramiz
    setSelectedProduct({ id }); // yoki boshqa unikal qiymat
  }

  function handleCountChange(id, change) {
    const updatedTrashCardData = trashCardData.map((item) => {
      if (item.id === id) {
        const newCount = item.count + change;
        return { ...item, count: newCount < 1 ? 1 : newCount };
      }
      return item;
    });
    setTrashCardData(updatedTrashCardData);

    localStorage.setItem('trashCard', JSON.stringify(updatedTrashCardData));
  }

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard')) || [];
    setTrashCardData(savedCards);
  }, []);

  function handleSelectAll(checked) {
    console.log('handleSelectAll called with:', checked);
    const updatedTrashCardData = trashCardData.map((item) => ({
      ...item,
      selected: checked,
    }));
    setTrashCardData(updatedTrashCardData);
  }

  function handleSelectItem(id, checked) {
    const updatedTrashCardData = trashCardData.map((item) => {
      if (item.id === id) {
        return { ...item, selected: checked };
      }
      return item;
    });
    setTrashCardData(updatedTrashCardData);
  
    localStorage.setItem('trashCard', JSON.stringify(updatedTrashCardData));
  }

  function handleAddGiftPackaging() {
    setGiftPackagingAdded(true);
  }

  function handleCancelGiftPackaging() {
    setGiftPackagingAdded(false);
  }

  const selectedItems = trashCardData.filter((item) => item.selected);
  const totalSelectedPrice = selectedItems.reduce(
    (total, item) => total + item.count * parseFloat(item.price.replace(/,/g, '')),
    0
  );
  const totalSelectedPriceWithDiscount = totalSelectedPrice - totalSelectedPrice * 0.1;
  const totalSelectedDiscount = totalSelectedPrice * 0.1;

  const navigate = useNavigate();

  function handleOrderNow() {
    const selectedItems = trashCardData.filter((item) => item.selected);
    const totalSelectedPrice = selectedItems.reduce(
      (total, item) => total + item.count * parseFloat(item.price.replace(/,/g, '')),
      0
    );
    const totalSelectedPriceWithDiscount = totalSelectedPrice - totalSelectedPrice * 0.1;
    const totalSelectedDiscount = totalSelectedPrice * 0.1;
  
    if (selectedItems.length === 0) {
      toast.warning('Сначала выберите товары для заказа', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }
  
    const savedOrders = JSON.parse(localStorage.getItem('Orders')) || [];
  
    const orderData = {
      items: selectedItems,
      totalWithDiscount: totalSelectedPriceWithDiscount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 000 сум',
      totalWithoutDiscount: totalSelectedPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 000 сум',
      discount: totalSelectedDiscount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 000 сум',
      giftPackagingAdded,
    };
  
    const updatedOrders = [...savedOrders, orderData];
  
    localStorage.setItem('Orders', JSON.stringify(updatedOrders));
  
    localStorage.removeItem('trashCard');
  
    setTimeout(() => {
      navigate('/orders');
    }, 1000);
  }

  const addToBasket = (productData) => {
    console.log('Adding to basket:', productData);
  };

  useEffect(() => {
    addToBasket(selectedProduct);
  }, [selectedProduct]);

  return (
    <div>
      <HeaderMain trashCardData={trashCardData} />

      <ToastContainer />

      <div className="container" style={{ marginTop: '32px'  }}>
        <h3 style={{marginLeft: '24px'}} className='basket_big_title'>Корзина</h3>
        
        <div>
          {trashCardData.length === 0 ? (
            <div>
              <center>
                <img className='mt-3' src={no_data} alt="no_data" />
                <p className='basket_no_data'>В вашей корзине пока нет товаров</p>
                <h3 className='recomendation_title'>Рекомендуем</h3>
              </center>

              <CardFour addToBasket={addToBasket} />
            </div>
          ) : (
            <div>
              <div className='choose_all'>
                <h3 className='choose_all_title'>
                  Выбрать все
                </h3>
                <label className='choose_all_checkbox_wrapper'>
                  <input
                    className='basket_card_checkbox'
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </label>
              </div>

              <div className='d-flex'>
                <div>
                  {trashCardData.map((item) => (
                    <div className='d-flex basket_card' key={item.id}>
                      <div>
                        <img className='basket_card_img' src={item.imageSrc} alt={item.name} />
                      </div>

                      <div style={{ marginTop: '20px' }}>
                        <p className='basket_card_name'>{item.name}</p>

                        <select style={{ width: '140px', borderRadius: '10px', border: '2px solid var(--csk-000000200, #CCC)' }} class="form-select" aria-label="Default select example">
                          <option selected>XS (44-46)</option>
                          <option value="1">XS (32-34)</option>
                          <option value="2">XS (34-36)</option>
                          <option value="3">XS (36-40)</option>
                        </select>

                        <div className="d-flex" style={{ marginTop: '80px' }}>
                          <img src={pencil} alt="pencil" />
                          <p className='basket_card_edit'>Изменить</p>
                        </div>

                        <div onClick={() => handleDeleteClick(item.id)} className="d-flex" style={{ marginTop: '-20px' }}>
                          <img src={trash} alt="pencil" />
                          <p className='basket_card_delete'>Удалить</p>
                        </div>
                      </div>

                      <div className='basket_prices' style={{ marginTop: '20px' }}>
                        <p className='basket_card_price'>{item.price} сум</p>
                        <div className='d-flex'>
                          <div className='basket_card_plus_minus' onClick={() => handleCountChange(item.id, -1)}>-</div>
                          <input type='number' className='basket_card_count' value={item.count} />
                          <div className='basket_card_plus_minus' onClick={() => handleCountChange(item.id, 1)}>+</div>
                        </div>

                        <label className='basket_card_checkbox_wrapper'>
                          <input
                            className='basket_card_checkbox'
                            type="checkbox"
                            checked={item.selected}
                            onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='basket_counter_fat'>
                  <div className="d-flex justify-content-between">
                    <p className='basket_counter_total'>Итого:</p>
                    <h3 className='basket_counter_total_price'>{totalSelectedPriceWithDiscount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 000 сум</h3>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p className='basket_counter_total'>Товары:</p>
                    <h3 className='basket_counter_total_price_black'>{totalSelectedPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 000 сум</h3>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p className='basket_counter_total'>Скидки:</p>
                    <h3 className='basket_counter_total_price_black'>{totalSelectedDiscount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 000 сум</h3>
                  </div>

                  {giftPackagingAdded ? (
                    <div className="d-flex justify-content-between" style={{marginBottom: '-20px'}}>
                      <p className='basket_counter_total'>Подарочную упаковку:</p>
                      <h3 className='basket_counter_total_price_black'>10 000 сум</h3>
                    </div>
                  ) : (
                    <>
                    </>
                  )}

                  {giftPackagingAdded ? (
                    <button className='basket_counter_button' onClick={handleCancelGiftPackaging}>
                      Отмена подарочную упаковку
                    </button>
                  ) : (
                    <button className='basket_counter_button' onClick={handleAddGiftPackaging}>
                      + Добавить подарочную упаковку
                    </button>
                  )}
                  <button onClick={handleOrderNow} className='basket_order_now'>Заказать сейчас</button>
                </div>
              </div>

              <h3 className='recomendation_title'>Вас может заинтересовать:</h3>

              <CardFour addToBasket={addToBasket} />
            </div>
          )}
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </div>
  );
}

export default Basket;