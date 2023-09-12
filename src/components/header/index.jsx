import React from 'react'
import './main.css'
import logo from '../../layouts/icons/logo.svg'
import search from '../../layouts/icons/search.svg'
import bag from '../../layouts/icons/bag.svg'
import user from '../../layouts/icons/User.svg'

function HeaderMain() {
  return (
    <header className="navbar navbar-expand-lg bg-body-tertiary">
      <div style={{ margin: '12px 120px' }} className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: '100px', fontFamily: 'Heebo' }}>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Категория
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Женское
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Мужское
                  </a>
                </li>
                <li>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Детям
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Аксессуары
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Новинки
                  </a>
                </li>
                <li>
                </li>
              </ul>
            </li>


            <li className="nav-item">
              <a className="nav-link" href="#">
                Мои заказы
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Принты
              </a>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <div className='header_search'>
              <center>
                <input
                  className="header_search_input"
                  type="search"
                  placeholder="Поиск"
                  aria-label="Поиск"
                />
                <img src={search} alt="search" />
              </center>
            </div>
            <div className="d-flex">
              <div className='basket_counter_father'>
                <div className='basket_counter'>2</div>
                <button style={{backgroundColor: 'transparent', border: 'none', position: 'absolute', zIndex: '1', marginTop: '-4px', marginLeft: '6px'}}><img src={bag} alt="bag" /></button>
              </div>

              <button style={{backgroundColor: 'transparent', border: 'none'}}>
                <img src={user} alt="user" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  )
}

export default HeaderMain