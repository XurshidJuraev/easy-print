import React from 'react';

function MyOrders() {
  const ordersString = localStorage.getItem('Orders');
  let orders = [];

  try {
    orders = ordersString ? JSON.parse(ordersString) : [];
    console.log({orders});
  } catch (error) {
    console.error('Orders ma\'lumotlari noto\'g\'ri formatda');
    console.error(error);
  }

  return (
    <div>
      <h2>Мои заказы</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <h3>Заказ #{index + 1}</h3>
            <ul>
              {order.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <div>
                    <img src={item.imageSrc} alt={item.name} />
                  </div>
                  <div>
                    <p>Наименование: {item.name}</p>
                    <p>Цена: {item.price} сум</p>
                    <p>Количество: {item.count}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p>Сумма заказа без скидки: {order.totalWithoutDiscount}</p>
            <p>Сумма заказа с учетом скидки: {order.totalWithDiscount}</p>
            <p>Скидка: {order.discount}</p>
            {order.giftPackagingAdded ? (
              <p>Подарочная упаковка добавлена</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyOrders;