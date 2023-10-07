import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import HeaderMain from '../../components/header'
import './main.css';
import addToBasket from '../../layouts/icons/add_to_basket.svg'
import add_image from '../../layouts/icons/add_image.svg'
import add_text from '../../layouts/icons/add_text.svg'
import image from '../../layouts/icons/image.svg'
import magic from '../../layouts/icons/magic.svg'
import refresh from '../../layouts/icons/refresh.svg'
import circle from '../../layouts/icons/circle.svg'
import size_img from '../../layouts/icons/size.svg'
import { Slider } from '@mui/material';
import Reveal from '../../animation';
import { SketchPicker } from 'react-color'

function YourDesign() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [color, setColor] = useState('#fff');
  const [size, setSize] = useState('32-34');
  const [width, setWidth] = useState('604');
  const [height, setHeight] = useState('562');
  const [isFrontView, setIsFrontView] = useState(true);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [fontSizePx, setFontSizePx] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
      setColor(savedColor);
    }
  }, []);

  const selectedColor = localStorage.getItem('selectedSize');

  const handleClick = () => {
    setTextInputVisible(!textInputVisible);
    if (!textInputVisible && textInputValue) {
      const existingData = JSON.parse(localStorage.getItem('textData')) || [];
      const newTextData = [...existingData, textInputValue];
      localStorage.setItem('textData', JSON.stringify(newTextData));
    }
  };

  useEffect(() => {
    const savedTextData = JSON.parse(localStorage.getItem('textData'));
    if (savedTextData) {
      console.log(savedTextData);
    }
  }, []);

  function valuetext(value) {
    setFontSizePx(value);
    return value;
  }

  useEffect(() => {
    if (selectedColor === '30-32') {
      setWidth('504');
      setHeight('462');
    } else if (selectedColor === '32-34') {
      setWidth('524');
      setHeight('482');
    } else if (selectedColor === '34-36') {
      setWidth('544');
      setHeight('502');
    } else if (selectedColor === '36-38') {
      setWidth('544');
      setHeight('522');
    } else if (selectedColor === '38-40') {
      setWidth('584');
      setHeight('542');
    } else if (selectedColor === '40-42') {
      setWidth('604');
      setHeight('562');
    } else if (selectedColor === '42-44') {
      setWidth('624');
      setHeight('582');
    } else if (selectedColor === '44-46') {
      setWidth('644');
      setHeight('602');
    } else if (selectedColor === '46-48') {
      setWidth('664');
      setHeight('622');
    } else {
      setWidth('604');
      setHeight('562');
    }
  }, [selectedColor]);

  const handleSizeIncrease = () => {
    const inputElement = document.querySelector('.add_text');
    if (inputElement) {
      const currentTransform = inputElement.style.transform;
      const currentScale = parseFloat(currentTransform.match(/scale\((\d+(\.\d+)?)\)/)[1]);
      const newScale = currentScale + 0.1;
      inputElement.style.transform = `scale(${newScale})`;
    }
  };  

  const handleSizeDecrease = () => {
    const inputElement = document.querySelector('.add_text');
    if (inputElement) {
      const currentTransform = inputElement.style.transform;
      const currentScale = parseFloat(currentTransform.match(/scale\((\d+(\.\d+)?)\)/)[1]);
      const newScale = currentScale - 0.1;
      inputElement.style.transform = `scale(${newScale})`;
    }
  };

  const handleRotate = () => {
    const inputElement = document.querySelector('.add_text');
    if (inputElement) {
      const currentTransform = inputElement.style.transform;
      if (currentTransform) {
        const currentRotation = parseFloat(currentTransform.match(/rotate\((\d+(\.\d+)?)deg\)/)[1]);
        const newRotation = currentRotation + 45;
        inputElement.style.transform = `rotate(${newRotation}deg)`;
      }
    }
  };  

  const sliderStyle = {
    background: 'transparent',
    color: 'black',
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <>
      <HeaderMain trashCardData={trashCardData}/>
      <div className='white_background'>
        <img src={addToBasket} alt="" />
      </div>

      <div className="d-flex">
        <div className='layers'>
          <Reveal><p className='layers_text_fat'>Слои</p></Reveal>

          {!textInputVisible ? (
            <Reveal>
              <div style={{marginTop: '-170px'}}>
                <div className='layers_div'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_519_4035)">
                      <path d="M26.25 0H3.75C2.75544 0 1.80161 0.395088 1.09835 1.09835C0.395088 1.80161 0 2.75544 0 3.75L0 30H30V3.75C30 2.75544 29.6049 1.80161 28.9017 1.09835C28.1984 0.395088 27.2446 0 26.25 0ZM27.5 27.5H2.5V3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H26.25C26.5815 2.5 26.8995 2.6317 27.1339 2.86612C27.3683 3.10054 27.5 3.41848 27.5 3.75V27.5ZM7.5 7.5H22.5V12.5H20V10H16.25V20H18.75V22.5H11.25V20H13.75V10H10V12.5H7.5V7.5Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_519_4035">
                        <rect width="30" height="30" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <h3 className='layers_text_value'>{textInputValue ? textInputValue : 'Easy Print'}</h3>

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_519_4042)">
                      <path d="M16.6667 16.6667H0V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L14.1667 0C14.8297 0 15.4656 0.263392 15.9344 0.732233C16.4033 1.20107 16.6667 1.83696 16.6667 2.5V16.6667ZM1.66667 15H15V2.5C15 2.27899 14.9122 2.06702 14.7559 1.91074C14.5996 1.75446 14.3877 1.66667 14.1667 1.66667H2.5C2.27899 1.66667 2.06702 1.75446 1.91074 1.91074C1.75446 2.06702 1.66667 2.27899 1.66667 2.5V15ZM18.3333 3.48667V18.3333H3.33333V20H20V5.83333C19.9979 5.31812 19.8366 4.81614 19.5383 4.39608C19.2399 3.97603 18.8191 3.6584 18.3333 3.48667Z" fill="#F8F8F8"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_519_4042">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_519_4037)">
                      <path d="M18.3327 3.33333H14.166V1.66667C14.166 1.22464 13.9904 0.800716 13.6779 0.488155C13.3653 0.175595 12.9414 0 12.4993 0L7.49935 0C7.05732 0 6.6334 0.175595 6.32084 0.488155C6.00828 0.800716 5.83268 1.22464 5.83268 1.66667V3.33333H1.66602V5H3.33268V17.5C3.33268 18.163 3.59607 18.7989 4.06492 19.2678C4.53376 19.7366 5.16964 20 5.83268 20H14.166C14.8291 20 15.4649 19.7366 15.9338 19.2678C16.4026 18.7989 16.666 18.163 16.666 17.5V5H18.3327V3.33333ZM7.49935 1.66667H12.4993V3.33333H7.49935V1.66667ZM14.9993 17.5C14.9993 17.721 14.9116 17.933 14.7553 18.0893C14.599 18.2455 14.387 18.3333 14.166 18.3333H5.83268C5.61167 18.3333 5.39971 18.2455 5.24343 18.0893C5.08715 17.933 4.99935 17.721 4.99935 17.5V5H14.9993V17.5Z" fill="#F8F8F8"/>
                      <path d="M9.16667 8.33337H7.5V15H9.16667V8.33337Z" fill="#F8F8F8"/>
                      <path d="M12.4987 8.33337H10.832V15H12.4987V8.33337Z" fill="#F8F8F8"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_519_4037">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal><p className='layers_text'>Добавленные объекты будут отображаться здесь</p></Reveal>
          )}
        </div>

        <div className='shirt_drawing'>
          <div className="shirt_drawing_header">
            <select className='shirt_drawing_header_select' style={{marginLeft: '-2px'}}>
              <option value="Футболка">Футболка</option>
              <option value="Лонгслив">Лонгслив</option>
              <option value="Худи">Худи</option>
              <option value="Кружка">Кружка</option>
            </select>

            <select
              className='shirt_drawing_header_select'
              onChange={(e) => {
                const selectedSize = e.target.value;
                setSize(selectedSize);
                localStorage.setItem('selectedSize', selectedSize);
              }}
            >
              <option value="Размер">Размер</option>
              <option value="30-32">30-32</option>
              <option value="32-34">32-34</option>
              <option value="34-36">34-36</option>
              <option value="36-38">36-38</option>
              <option value="38-40">38-40</option>
              <option value="40-42">40-42</option>
              <option value="42-44">42-44</option>
              <option value="44-46">44-46</option>
              <option value="46-48">46-48</option>
            </select>

            <select className='shirt_drawing_header_select'   
              onChange={(e) => {
                const selectedColor = e.target.value;
                setColor(selectedColor);
                localStorage.setItem('selectedColor', selectedColor);
              }}
            >
              <option value="#FFFFFF">Цвет</option>
              <option value="#0D0D0D">Черный</option>
              <option value="#FFFFFF">Белый</option>
              <option value="#666666">Серый</option>
              <option value="#D30808">Красный</option>
              <option value="#FAC817">Желтый</option>
              <option value="#1DB223">Зеленый</option>
              <option value="#9747FF">Фиолетовый</option>
            </select>

            <div className="shirt_drawing_header_select" onClick={() => setIsFrontView(true)}>
              {isFrontView ? 'Спереди' : 'Сзади'} <img style={{ marginLeft: '5px' }} src={refresh} alt="" />
            </div>

            <div className='shirt_drawing_header_select' style={{padding: '0'}}>
              <img src={add_image} alt="" />
            </div>

            <div className='shirt_drawing_header_select' style={{ padding: '0' }} onClick={handleClick}>
              <img src={add_text} alt="" />
            </div>

            <div className='shirt_drawing_header_select'>
              Из библиотеки <img style={{marginLeft: '5px'}} src={image} alt="" />
            </div>

            <div className='shirt_drawing_header_select'>
              ИИ <img style={{marginLeft: '5px'}} src={magic} alt="" />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
              <g clip-path="url(#clip0_499_1673)">
                <path d="M1.46732 12.1867L3.66732 6.85326C3.79127 6.72829 3.93874 6.6291 4.10122 6.5614C4.2637 6.49371 4.43797 6.45886 4.61399 6.45886C4.79 6.45886 4.96428 6.49371 5.12675 6.5614C5.28923 6.6291 5.4367 6.72829 5.56065 6.85326C5.80899 7.10308 5.94838 7.44101 5.94838 7.79326C5.94838 8.14551 5.80899 8.48344 5.56065 8.73326L3.33399 14.8534L4.56106 14.3107C13.3385 10.4285 23.3835 10.6271 32.0007 14.8533C32.3543 14.8533 32.6934 14.9937 32.9435 15.2438C33.1935 15.4938 33.334 15.833 33.334 16.1866C33.334 16.5402 33.1935 16.8794 32.9435 17.1294C32.6934 17.3795 32.3543 17.5199 32.0007 17.5199C23.3762 13.3026 13.3097 13.2003 4.60125 17.2414L4.00065 17.5201L12.2273 20.9999C12.3523 21.1239 12.4515 21.2713 12.5192 21.4338C12.5869 21.5963 12.6217 21.7706 12.6217 21.9466C12.6217 22.1226 12.5869 22.2969 12.5192 22.4594C12.4515 22.6218 12.3523 22.7693 12.2273 22.8933C12.1034 23.0182 11.9559 23.1174 11.7934 23.1851C11.6309 23.2528 11.4567 23.2877 11.2807 23.2877C11.1046 23.2877 10.9304 23.2528 10.7679 23.1851C10.6054 23.1174 10.4579 23.0182 10.334 22.8933L3.62106 19.88C2.10905 19.2013 0.000652313 18.5107 0.000652313 16.8534C0.000652313 15.7934 0.66732 14.1867 1.46732 12.1867Z" fill="#17262B"/>
              </g>
              <defs>
                <clipPath id="clip0_499_1673">
                  <rect width="32" height="32" fill="white" transform="matrix(-1 0 0 1 32 0.186646)"/>
                </clipPath>
              </defs>
            </svg>
            
              {isFrontView ?(
                <div>
                  <svg
                    width={width}
                    height={height}
                    viewBox="0 0 604 562"
                    fill="none"
                    style={{position: 'relative'}}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M238.94 1C259.202 18.5428 312.71 43.1028 364.646 1L378.706 6.1258L463.888 37.1821L602 141.206L536.666 236.184L494.488 219.12V561H109.099V219.12L67.3343 236.595L2 141.206L140.525 36.7709L224.838 6.1258L238.94 1Z"
                      fill={color}
                    />
                    <path
                      d="M238.94 1C259.202 18.5428 312.71 43.1028 364.646 1M238.94 1C239.767 24.162 253.496 71.884 301.793 73.3642C322.193 73.7753 361.338 59.8781 364.646 1M238.94 1L224.838 6.1258M364.646 1L378.706 6.1258M463.888 37.1821L602 141.206L536.666 236.184L494.488 219.12M463.888 37.1821L378.706 6.1258M463.888 37.1821C457.41 76.7905 454.46 168.794 494.488 219.12M494.488 219.12V561H109.099V219.12M109.099 219.12L67.3342 236.595L2 141.206L140.525 36.7709M109.099 219.12C149.457 170.439 146.866 77.3387 140.525 36.7709M140.525 36.7709L224.838 6.1258M378.706 6.1258C378.706 31.8279 363.323 86.4391 301.793 86.9324C277.781 87.1974 230.758 73.3806 224.838 6.1258"
                      stroke="#666666"
                      strokeWidth="1.5"
                    />
                    <g filter="url(#filter0_i_492_1558)">
                      <path
                        d="M362.853 2.42342C312.917 41.4191 261.899 19.6435 240.69 2.46808C240.011 1.91829 238.996 2.42104 239.055 3.29262C239.223 5.76093 239.528 8.44604 239.991 11.279C243.999 35.7889 259.879 71.3662 301.789 73.3642C320.943 72.9781 356.624 61.4274 363.648 11.279C364.008 8.70691 364.293 6.03329 364.496 3.25443C364.56 2.38883 363.537 1.88924 362.853 2.42342Z"
                        fill={color}
                      />
                    </g>
                    <path
                      d="M362.853 2.42342C312.917 41.4191 261.899 19.6435 240.69 2.46808C240.011 1.91829 238.996 2.42104 239.055 3.29262C239.223 5.76093 239.528 8.44604 239.991 11.279C243.999 35.7889 259.879 71.3662 301.789 73.3642C320.943 72.9781 356.624 61.4274 363.648 11.279C364.008 8.70691 364.293 6.03329 364.496 3.25443C364.56 2.38883 363.537 1.88924 362.853 2.42342Z"
                      stroke="#666666"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M239.768 12.1013C252.95 28.9589 318.106 51.5727 363.424 12.1013"
                      stroke="#666666"
                      strokeWidth="0.5"
                      strokeDasharray="3 3"
                    />
                    <path
                      d="M240.594 17.4464C253.642 34.7143 320.616 55.9531 362.992 17.4464"
                      stroke="#666666"
                      strokeWidth="0.5"
                      strokeDasharray="3 3"
                    />
                    <g filter="url(#filter1_i_492_1558)">
                      <path
                        d="M239.768 10.4565C252.95 27.3141 318.106 49.9279 363.424 10.4565M241.81 19.9132C250.857 35.9485 322.964 56.9176 361.667 19.9132"
                        stroke="#666666"
                      />
                    </g>
                    <path d="M23.5625 127L87.7812 226.4" stroke="#CCCCCC" strokeDasharray="4 4" />
                    <path
                      d="M19.8125 131.667L82.625 227.8"
                      stroke="#CCCCCC"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M579.031 126.067L514.812 225.467"
                      stroke="#CCCCCC"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M582.781 130.733L519.969 226.867"
                      stroke="#CCCCCC"
                      strokeDasharray="4 4"
                    />
                    <path d="M110.75 545.133H492.781" stroke="#CCCCCC" strokeDasharray="4 4" />
                    <path d="M110.75 539.533H492.781" stroke="#CCCCCC" strokeDasharray="4 4" />
                    <defs>
                      <filter
                        id="filter0_i_492_1558"
                        x="238.303"
                        y="-1.54187"
                        width="126.947"
                        height="75.6564"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy={-3} />
                        <feGaussianBlur stdDeviation={6} />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow_492_1558"
                        />
                      </filter>
                      <filter
                        id="filter1_i_492_1558"
                        x="239.373"
                        y="7.07947"
                        width="124.379"
                        height="33.9486"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy={-3} />
                        <feGaussianBlur stdDeviation={6} />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow_492_1558"
                        />
                      </filter>
                    </defs>
                  </svg>

                  {!textInputVisible && (
                    <Reveal>
                      <div className='circle_image' onClick={handleRotate}>
                        <img src={circle} alt="" />
                      </div>

                      <textarea
                        style={{ backgroundColor: color, fontSize: `${fontSizePx}px`, height: '50px' }}
                        className='add_text'
                        type="text"
                        placeholder='Easy Print'
                        value={textInputValue}
                        onChange={(e) => setTextInputValue(e.target.value)}
                      />

                      <div className='size_image' onClick={handleSizeIncrease}>
                        <img src={size_img} alt="" />
                      </div>
                    </Reveal>
                  )}
                </div>
              ) : (
                <svg
                  width={width}
                  height={height}
                  style={{ display: 'block' }}
                  viewBox="0 0 604 562"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M239.156 1.186c20.395 17.504 73.583 41.698 125.266-.005a.51.51 0 01.491-.084l13.793 5.029 85.182 31.056L602 141.206l-65.334 94.978-42.178-17.064V561H109.099V219.12l-41.765 17.475L2 141.206 140.525 36.771l84.313-30.645L238.664 1.1a.489.489 0 01.492.086z"
                    fill={color}
                  />
                  <path
                    d="M463.888 37.182L602 141.206l-65.334 94.978-42.178-17.064m-30.6-181.938L378.706 6.126l-13.793-5.029a.51.51 0 00-.491.084c-51.683 41.703-104.871 17.51-125.266.005a.489.489 0 00-.492-.086l-13.826 5.026-84.313 30.645m323.363.411c-6.478 39.608-9.428 131.612 30.6 181.938m0 0V561H109.099V219.12m0 0l-41.765 17.475L2 141.206 140.525 36.771M109.099 219.12c40.358-48.681 37.767-141.781 31.426-182.35"
                    stroke="#666"
                    strokeWidth={1.5}
                  />
                  <path
                    d="M24.5 127l64.219 99.4M20.75 131.667L83.563 227.8M579.969 126.067l-64.219 99.4M583.719 130.733l-62.813 96.134M111.688 545.133h382.031M111.688 539.533h382.031"
                    stroke="#CCC"
                    strokeDasharray="4 4"
                  />
                </svg>
              )}

            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
              <g opacity="0.5" clip-path="url(#clip0_492_1578)">
                <path d="M30.5327 12.1867L28.3327 6.85326C28.2087 6.72829 28.0613 6.6291 27.8988 6.5614C27.7363 6.49371 27.562 6.45886 27.386 6.45886C27.21 6.45886 27.0357 6.49371 26.8732 6.5614C26.7108 6.6291 26.5633 6.72829 26.4393 6.85326C26.191 7.10308 26.0516 7.44101 26.0516 7.79326C26.0516 8.14551 26.191 8.48344 26.4393 8.73326L28.666 14.8534L27.4389 14.3107C18.6615 10.4285 8.61646 10.6271 -0.000651121 14.8533C-0.354273 14.8533 -0.693412 14.9937 -0.94346 15.2438C-1.19351 15.4938 -1.33398 15.833 -1.33398 16.1866C-1.33398 16.5402 -1.19351 16.8794 -0.94346 17.1294C-0.693412 17.3795 -0.354273 17.5199 -0.000651121 17.5199C8.62379 13.3026 18.6903 13.2003 27.3987 17.2414L27.9993 17.5201L19.7727 20.9999C19.6477 21.1239 19.5485 21.2713 19.4808 21.4338C19.4131 21.5963 19.3783 21.7706 19.3783 21.9466C19.3783 22.1226 19.4131 22.2969 19.4808 22.4594C19.5485 22.6218 19.6477 22.7693 19.7727 22.8933C19.8966 23.0182 20.0441 23.1174 20.2066 23.1851C20.3691 23.2528 20.5433 23.2877 20.7193 23.2877C20.8954 23.2877 21.0696 23.2528 21.2321 23.1851C21.3946 23.1174 21.5421 23.0182 21.666 22.8933L28.3789 19.88C29.891 19.2013 31.9993 18.5107 31.9993 16.8534C31.9993 15.7934 31.3327 14.1867 30.5327 12.1867Z" fill="#4D4D4D"/>
              </g>
              <defs>
                <clipPath id="clip0_492_1578">
                  <rect width="32" height="32" fill="white" transform="translate(0 0.186646)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className='layers'>
        <Reveal><p className='layers_text_fat'>Детали</p></Reveal>

          {!textInputVisible ? (
            <Reveal>
              <div style={{marginTop: '-150px'}}>
                <div style={{width: '250px', textAlign: 'left'}}>
                  <p className='layers_text_fat'>Размер</p>

                  <Slider
                    aria-label="Temperature"
                    defaultValue={30}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={110}
                    style={sliderStyle}
                    color="primary"
                  />
                </div>

                <div style={{width: '250px', textAlign: 'left', marginTop: '35px'}}>
                  <p className='layers_text_fat'>Шрифт</p>

                  <select className='selcet_option_layer' style={{height: '40px'}}>
                    <option value="Inter">Inter</option>
                    <option value="Inter">Inter</option>
                    <option value="Inter">Inter</option>
                    <option value="Inter">Inter</option>
                  </select>
                </div>

                <div style={{width: '250px', textAlign: 'left', marginTop: '35px'}}>
                  <p className='layers_text_fat'>Текст</p>

                  <textarea style={{padding: '12px', minHeight: '73px', outline: 'none'}} className='selcet_option_layer' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)} placeholder='Easy print'></textarea>
                </div>

                <div style={{width: '250px', textAlign: 'left', marginTop: '35px'}}>
                  <p className='layers_text_fat'>Цвет</p>

                  <div style={{width: '200px', height: '40px', padding: '16px'}} className='selcet_option_layer'>{color}</div>
                  <SketchPicker color={color} onChange={(color) => {setColor(color.hex); localStorage.setItem('selectedColor', color.hex);}}  className={showPicker ? '' : 'hidden'} />
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal><p className='layers_text'>Детали объектов будут отображаться здесь</p></Reveal>
          )}
        </div>
      </div>
    </>
  )
}

export default YourDesign