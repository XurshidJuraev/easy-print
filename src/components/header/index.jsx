import React from 'react'
import './main.css'
import logo from '../../layouts/icons/logo.svg'
import search from '../../layouts/icons/search.svg'
import bag from '../../layouts/icons/bag.svg'
import user from '../../layouts/icons/User.svg'
import language from '../../layouts/icons/language.svg'
import { NavLink } from 'react-router-dom'

function HeaderMain({ trashCardData }) {
  return (
    <header className="navbar navbar-expand-lg bg-body-tertiary">
      <div style={{ margin: '12px 120px' }} className="container-fluid">
        <NavLink to={'/'} className="navbar-brand" href="#">
          <img src={logo} alt="logo" />
        </NavLink>
        
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: '50px', fontFamily: 'Inter' }}>
            <li className="nav-item ms-3 me-3">
              <a className="nav-link" href="#">
                Футболки
              </a>
            </li>

            <li className="nav-item ms-3 me-3">
              <a className="nav-link" href="#">
                Лонгсливы
              </a>
            </li>

            <li className="nav-ite ms-3 me-3">
              <a className="nav-link" href="#">
                Худи
              </a>
            </li>

            <li className="nav-item ms-3 me-3">
              <a className="nav-link" href="#">
                Аксессуары
              </a>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <div className='header_search'>
              <center>
                <input
                  className="header_search_input"
                  type="search"
                  placeholder="Поиск..."
                  aria-label="Поиск..."
                />
                <img src={search} alt="search" />
              </center>
            </div>
            <div className="d-flex">
              <button style={{backgroundColor: 'transparent', border: 'none'}}>
                <img src={language} alt="user" />
              </button>

              <NavLink to={'/basket'} className='basket_counter_father'>
                <div className='basket_counter'>{trashCardData.length}</div>
                <button style={{backgroundColor: 'transparent', border: 'none', position: 'absolute', zIndex: '1', marginTop: '-4px', marginLeft: '6px'}}><img src={bag} alt="bag" /></button>
              </NavLink>

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