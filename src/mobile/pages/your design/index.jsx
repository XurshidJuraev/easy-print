import React, { useEffect, useRef, useState } from 'react'
import './main.css';
import homeImage from '../../layouts/icons/home.svg';
import leftImage from '../../layouts/icons/left.svg';
import cachedImage from '../../layouts/icons/cached.svg';
import rightImage from '../../layouts/icons/right.svg';
import basketImage from '../../layouts/icons/basket.svg';
import addImage from '../../layouts/icons/add_image.svg';
import addTextImage from '../../layouts/icons/add_text.svg';
import design from '../../layouts/images/design.svg';
import layer from '../../layouts/images/layer.svg';
import library from '../../layouts/images/library.svg';
import product from '../../layouts/images/product.svg';
import tShirt from '../../layouts/images/front.svg';
import tShirt_back from '../../layouts/icons/back.svg';
import { Slider } from "@mui/material";
import Reveal from "../../../animation";
import size_text from '../../layouts/icons/size_text.svg';
import text_text from '../../layouts/icons/text_text.svg';
import style_text from '../../layouts/icons/style_text.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fabric } from "fabric";
import { useScreenshot } from 'use-react-screenshot'
// import frontImage from '../../layouts/images/front.png'
// import backImage from '../../layouts/images/back.png'
import frontImage from "../../../layouts/images/frontShirt.png";
import backImage from "../../../layouts/images/backShirt.png";
import modal_image_size1 from "../../../layouts/images/design_modal/first_size.svg";
import modal_image1 from "../../../layouts/images/design_modal/first.svg";
import modal_image2 from "../../../layouts/images/design_modal/second.svg";
import modal_image3 from "../../../layouts/images/design_modal/third.svg";
import hoodie_back_black from '../../layouts/images/hoodie_back.svg'
import hoodie_front_black from '../../layouts/images/hoodie_front.svg'
import sweatshot_back_black from '../../layouts/images/sweeatchot_back.svg'
import sweatshot_front_black from '../../layouts/images/sweeatchot_front.svg'
import hoodie_back_white from '../../layouts/images/hoodie_back_white.svg'
import hoodie_front_white from '../../layouts/images/hoodie_front_white.svg'
import sweatshot_back_white from '../../layouts/images/sweatshot_back_white.svg'
import sweatshot_front_white from '../../layouts/images/sweatshot_front_white.svg'
import backImageBlack from '../../layouts/images/back_black.png'
import frontImageBlack from '../../layouts/images/black_front.png'
import { v4 as uuid } from "uuid";
import { LayersMobile } from './components/layers.jsx';
import { CategoriesMobile } from './components/categories.jsx';
import { Layers } from '../../../pages/your design/components/layers.jsx'
import { Categories } from '../../../pages/your design/components/categories.jsx'
import { SketchPicker } from "react-color";
import UpArrowSVG from "../../../layouts/icons/up-arrow";
import DownArrowSVG from "../../../layouts/icons/down-arrow";

function YourDesignMobileTest() {
  const [categoryName, setCategoryName] = useState([]);
  const [printImage, setPrintImage] = useState([]);
  const [categorySize, setCategorySize] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [size, setSize] = useState("xxs");
  const [shirtColor, setShirtColor] = useState("#FFFFFF");
  const [isFrontView, setIsFrontView] = useState(true);
  const [isColorChange, setIsColorChange] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isCategoryChange, setIsCategoryChange] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [photoInputVisible, setPhotoInputVisible] = useState(false);
  const [shirtTypeId0, setShirtTypeId0] = useState(false);
  const [shirtTypeId1, setShirtTypeId1] = useState(false);
  const [shirtTypeId2, setShirtTypeId2] = useState(false);
  const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [isSuccesEntered, setIsSuccesEntered] = useState(false);
  const [isRegisterEntered, setIsRegisterEntered] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    password: "",
    passwordConfirmation: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isLoginEntered, setIsLoginEntered] = useState(false);
  const [fileAndText, setFileAndText] = useState(true);
  const [isFirstEntered, setIsFirstEntered] = useState(true);
  const [textInputValue] = useState("");
  const [imeyg, setImeyg] = useState("");
  const [categoryChange, setCategoryChange] = useState(31);
  const [showPicker] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [radius, setRadius] = useState(0);
  const token = localStorage.getItem("token");
  const [scale, setScale] = useState(new Map([["imageScale", new Map()]]));
  const [TextParams, setTextParams] = useState(
    new Map([
      ["color", new Map()],
      ["fontSize", new Map()],
      ["fontFamily", new Map()],
      ["text", new Map()],
    ]),
  );
  const [headText, setHeadText] = useState([]);
  const [textUniqueKey, setTextUniqueKey] = useState("");
  const ref = useRef(null);
  const refBack = useRef(null);
  const canvasRef = useRef(null);
  const [isCodeEntered2, setIsCodeEntered2] = useState(false);
  const [isForgetPasswordEntered, setIsForgetPasswordEntered] = useState(false);
  const [isForgetPasswordEntered2, setIsForgetPasswordEntered2] = useState(false);
  const [shirtTypeId, setShirtTypeId] = useState(0);
  const [shirtTypePrice, setShirtTypePrice] = useState();
  const [shirtTypeName, setShirtTypeName] = useState(localStorage.getItem('selectedLanguage') === 'ru' ? 'Тип: стандарт' : 'Turi: standart');
  const [countHeader, setCountHeader] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [visible, setVisible] = useState(false) 
  let [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
    width: "220px",
    height: "220px",
  });
  let [imageBack, takeScreenshotBack] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
    width: "600px",
    height: "560px",
  });
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [desigState, setDesigState] = useState(true);
  const [layersState, setLayersState] = useState(false);
  const [libraryState, setLibraryState] = useState(false);
  const [productState, setProductState] = useState(false);
  const [firstBar, setFirstBar] = useState(true);
  const [textBar, setTextBar] = useState(false);
  const [imageBar, setImageBar] = useState(false);
  const [styleText, setStyleText] = useState(false);
  const [textText, setTextText] = useState(true);
  const [sizeText, setSizeText] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [categoryChangeCheck, setCategoryChangeCheck] = useState(31);
  const [category, setCategory] = useState('Футболка');
  const [textValue, setTextValue] = useState('EasyPrint');
  const [tshirtImage, setTshirtImage] = useState(false);
  const [modalLeft, setModalLeft] = useState('0px');
  const [modalTop, setModalTop] = useState('-7px');
  const [image2, setImage2] = useState(null);
  let getImageBack = () => takeScreenshotBack(refBack.current)
  const [modalLoader, setModalLoader] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      setCanvas(canvas);

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  const TextParamsChanger = ({ type, value, uniqueKey, del }) => {
    setTextParams((prev) => {
      const newMap = new Map(prev);
      if (del) {
        newMap.get(type).delete(uniqueKey);
      } else newMap.get(type).set(uniqueKey ?? textUniqueKey, value);
      return newMap;
    });
  };

  const ImageParamsChanger = ({ type, value, uniqueKey }) => {
    setScale((prev) => {
      const newMap = new Map(prev);
      newMap.get(type).set(uniqueKey ?? textUniqueKey, value);
      return newMap;
    });
  };

  const deleteElement = (uniqueKey) => {
    const objectToSelect = canvas
      .getObjects()
      .find((obj) => obj.uniqueKey === uniqueKey);

    if (objectToSelect) {
      canvas.remove(objectToSelect);
      setHeadText(canvas.getObjects());

      if (objectToSelect.type === "text") {
        TextParamsTypes.forEach(({ label }) =>
          TextParamsChanger({ type: label, uniqueKey, del: true }),
        );
      }
    }
    canvas.renderAll();
  };

  const dublicateElement = (uniqueKey) => {
    const objectToSelect = canvas
      .getObjects()
      .find((obj) => obj.uniqueKey === uniqueKey);

    const uniqueId = uuid();

    if (!textUniqueKey) {
      setTextUniqueKey(uniqueKey);
    }

    if (objectToSelect.type === "image") {
      const imgElement = new Image();
      imgElement.src = objectToSelect.getSrc();

      imgElement.onload = function () {
        const newElement = new fabric.Image(imgElement);

        const scaleFactor = 234 / newElement.width;
        newElement.scale(scaleFactor);
        newElement.uniqueKey = uniqueId;

        ImageParamsChanger({
          type: "imageScale",
          value: 0,
          uniqueKey: uniqueId,
        });

        ControlVisible.forEach((item) => {
          newElement.setControlVisible(item.corner, item.value);
        });

        newElement.set(ControlOptions);
        canvas.add(newElement);
        canvas.renderAll();
        setHeadText((prev) => [...prev, newElement]);
      };
      setPhotoInputVisible(true);
    }

    if (objectToSelect.type === "text") {
      const newElement = new fabric.Text(objectToSelect.text, {
        fill: objectToSelect.fill,
        fontFamily: objectToSelect.fontFamily,
        fontSize: objectToSelect.fontSize,
        uniqueKey: uniqueId,
      });

      setHeadText((prev) => [
        ...(canvas.getObjects().length ? prev : []),
        newElement,
      ]);

      TextParamsTypes.forEach(({ label, name }) =>
        TextParamsChanger({
          type: label,
          value: objectToSelect[name],
          uniqueKey: uniqueId,
        }),
      );

      ControlVisible.forEach((item) => {
        newElement.setControlVisible(item.corner, item.value);
      });
      newElement.set(ControlOptions);

      canvas.add(newElement);
      canvas.renderAll();
    }

    // ControlVisible.forEach((item) => {
    //   newElement.setControlVisible(item.corner, item.value);
    // });
    // newElement.set(ControlOptions);

    // canvas.add(newElement);
    // canvas.renderAll();
  };

  useEffect(() => {
    if (headText.length) {
      const objectToSelect = canvas
        .getObjects()
        .find((obj) => obj.uniqueKey === textUniqueKey);

      if (objectToSelect.type === "text") {
        const prevTexts = canvas.getObjects();

        prevTexts.forEach((textObj) => {
          canvas.remove(textObj);
        });

        const newText = new fabric.Text(
          TextParams.get("text").get(textUniqueKey),
          {
            ...prevTexts.find((item) => item.uniqueKey === textUniqueKey),
            text: TextParams.get("text").get(textUniqueKey) || "EasyText",
            fill: TextParams.get("color").get(textUniqueKey) || "#000",
            fontFamily:
              TextParams.get("fontFamily").get(textUniqueKey) || "Bebas Neue",
            fontSize: TextParams.get("fontSize").get(textUniqueKey) || "30",
            uniqueKey: textUniqueKey,
          },
        );

        const updatedTexts = [...prevTexts];
        updatedTexts[
          updatedTexts
            .map((item) => item.uniqueKey)
            .findIndex((item) => item === textUniqueKey)
        ] = newText;

        setHeadText(updatedTexts);

        updatedTexts.forEach((textObj) => {
          canvas.add(textObj);
        });

        canvas.renderAll();
      }
    }

    if (!textInputVisible && textInputValue) {
      const existingData = JSON.parse(localStorage.getItem("textData")) || [];
      const newTextData = [...existingData, textInputValue];
      localStorage.setItem("textData", JSON.stringify(newTextData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, TextParams]);

  useEffect(() => {
    if (canvas) {
      const prevTexts = canvas.getObjects();

      prevTexts.forEach((item) => {
        item.set(
          "visible",
          item.isFront === "front" && isFrontView
            ? true
            : item.isFront === "back" && !isFrontView
            ? true
            : false,
        );
      });

      canvas.renderAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFrontView]);

  const addText = () => {
    const uniqueKey = uuid();

    if (!textUniqueKey) {
      setTextUniqueKey(uniqueKey);
    }

    const newText = new fabric.Text("EasyPrint", {
      fill: "#000",
      fontFamily: "Bebas Neue",
      fontSize: "30",
      uniqueKey: uniqueKey,
      isFront: isFrontView ? "front" : "back",
    });

    ControlVisible.forEach((item) =>
      newText.setControlVisible(item.corner, item.value),
    );

    newText.set(ControlOptions);
    canvas.add(newText);
    setHeadText((prev) => [...prev, newText]);

    TextParamsChanger({ type: "fontSize", value: "30", uniqueKey });
    TextParamsChanger({ type: "fontFamily", value: "Bebas Neue", uniqueKey });
    TextParamsChanger({ type: "text", value: "EasyPrint", uniqueKey });
    TextParamsChanger({ type: "color", value: "#000000", uniqueKey });

    canvas.renderAll();
    setTextInputVisible(true);
  };

  useEffect(() => {
    if (canvas) {
      const handleObjectSelected = (e) => {
        const selectedObject = e.target;

        if (selectedObject && selectedObject.type === "text") {
          setTextUniqueKey(selectedObject.uniqueKey);
          setPhotoInputVisible(false);
          setTextInputVisible(true);
        } else if (selectedObject && selectedObject.type === "image") {
          setTextUniqueKey(selectedObject.uniqueKey);
          setImeyg(selectedObject.getSrc());
          setTextInputVisible(false);
          setPhotoInputVisible(true);
        }
      };

      canvas.on("selection:created", handleObjectSelected);
      canvas.on("selection:updated", handleObjectSelected);

      return () => {
        canvas.off("selection:created", handleObjectSelected);
        canvas.off("selection:updated", handleObjectSelected);
      };
    }
  }, [canvas]);

  const SetActiveLayer = (desiredUniqueKey) => {
    const objectToSelect = canvas
      .getObjects()
      .find((obj) => obj.uniqueKey === desiredUniqueKey);

    if (objectToSelect) {
      setTextUniqueKey(objectToSelect.uniqueKey);
      canvas.setActiveObject(objectToSelect);
      canvas.renderAll();
    }
  };

  localStorage.setItem("selectedColor", "#000000");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Создайте свой собственный дизайн";
  }, []);

  const addCustomPicture = (e) => {
    const reader = new FileReader();
    const uniqueKey = uuid();

    reader.onload = function (event) {
      const imgObj = new Image();
      imgObj.src = event.target.result;

      setImeyg(event.target.result);

      fabric.Image.fromURL(event.target.result, (img) => {
        const scaleFactor = 234 / img.width;
        img.scale(scaleFactor);
        img.uniqueKey = uniqueKey;
        img.isFront = isFrontView ? "front" : "back";

        ControlVisible.forEach((item) => {
          img.setControlVisible(item.corner, item.value);
        });

        img.set(ControlOptions);
        canvas.add(img);
        setTextUniqueKey(uniqueKey);
        setHeadText((prev) => [...prev, img]);
        ImageParamsChanger({ type: "imageScale", value: 0, uniqueKey });
        canvas.renderAll();
      });
      setPhotoInputVisible(true);
    };

    setPrintImage(e.target.files[0]);

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageClick = (image, filter) => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }

    const objects = canvas.getObjects("image");
    const img = objects.find((obj) => obj.uniqueKey === textUniqueKey);

    if (img) {
      const filterList = new fabric.Image.filters.Composed({
        subFilters: [
          ...filter.map(
            (item) =>
              new fabric.Image.filters[item.label]({
                [item.valueLabel]: item.value,
              }),
          ),
        ],
      });

      img.filters = [filterList];
      img.applyFilters();
      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (!isFrontView && refBack.current) {
      takeScreenshotBack(refBack.current).catch((error) => {
        console.error("Screenshot capture failed:", error);
      });
    }
  }, [isFrontView, takeScreenshotBack]);

  let getImage = () => {
    setModalLeft('20px');
    setModalTop('21px');
    // setIsFrontView(true);

    setTimeout(async () => {
      if (ref.current && isFrontView) {
        takeScreenshot(ref.current)
          .then(() => {setModalLeft('20px'); setModalTop('21px');})
          .catch((error) => {
            console.error("Screenshot capture failed:", error);
            setModalLeft('20px');
            setModalTop('21px');
          });
      }
    }, 1000);

    if (image && imageBack) {
      const elements = document.getElementsByClassName("addToBasket_image");

      if (elements.length > 0) {
        const element = elements[0];
        element.setAttribute("data-bs-target", "#exampleModalToggle5");
        element.setAttribute("data-bs-toggle", "modal");
      } else {
        console.error("Element with class 'addToBasketImage' not found.");
      }
    }
  }; 

  const handleScaleChange = (newValue) => {
    const val = newValue.target.value;
    ImageParamsChanger({ type: "imageScale", value: val });
    // setScale(val);

    const objects = canvas.getObjects("image");
    const img = objects.find((obj) => obj.uniqueKey === textUniqueKey);

    if (img) {
      const newScaleFactor = (234 + val * 10) / img.width;
      img.scale(newScaleFactor);

      canvas.renderAll();
    }
  };

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
  
    const { user_email, user_password } = evt.target.elements;

    const cleanedPhone = user_email.value.replace(/\D/g, '');

    // setPhoneNumber(cleanedPhone);
  
    fetch(`${process.env.REACT_APP_TWO}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: cleanedPhone,
        password: user_password.value.trim(),
      }),
    })
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user_name', result.data.name);
        localStorage.setItem('user_phone_number', result.data.user.email);
        setIsSuccesEntered(true); 
        setIsLoginEntered(false)
        setPasswordsMatch(true);
        setTimeout(() => {
          window.location.reload()
        }, 100);
      })
      .catch(error => {console.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsSuccesEntered(false); setIsLoginEntered(true); setPasswordsMatch(false);});
  };  

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
  
    const { phone } = evt.target.elements;

    const cleanedPhone = phone.value.replace(/\D/g, '');

    setPhoneNumber(cleanedPhone);

    var myHeaders = new Headers();
    // myHeaders.append('language', localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru');
    myHeaders.append('language', 'uz');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");

    var formdata = new FormData();
    formdata.append("phone", cleanedPhone);
    formdata.append("is_forgot", 0);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/phone-register`, requestOptions)
      .then(response => response.text())
      .then(result => {setIsCodeEntered(true); setIsPhoneNumberEntered(false); setIsForgetPasswordEntered(false)})
      .catch(error => {console.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsCodeEntered(false); setIsPhoneNumberEntered(true);});
  }

  const handleSubmitRegister2 = (evt) => {
    evt.preventDefault();
  
    const { phone } = evt.target.elements;

    const cleanedPhone = phone.value.replace(/\D/g, '');

    setPhoneNumber(cleanedPhone);

    var myHeaders = new Headers();
    // myHeaders.append('language', localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru');
    myHeaders.append('language', 'uz');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");

    var formdata = new FormData();
    formdata.append("phone", cleanedPhone);
    formdata.append("is_forgot", 0);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/phone-register`, requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result); setIsCodeEntered2(true); setIsPhoneNumberEntered(false); setIsForgetPasswordEntered(false)})
      .catch(error => {console.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsForgetPasswordEntered2(false); setIsCodeEntered2(true);});
  }

  const handleOpenCodeVerificationModal = (evt) => {
    evt.preventDefault();
  
    const { code_verify } = evt.target.elements;

      fetch(`${process.env.REACT_APP_TWO}/phone-verify`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          verify_code: localStorage.getItem('phone_code_verify'),
        }),
      })
        .then(response => response.json())
        .then(result => {localStorage.setItem('token', result.data.token); setIsCodeEntered(false); setIsSuccesEntered(false); setIsRegisterEntered(true);})
        .catch(error => {console.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsCodeEntered(true); setIsSuccesEntered(false); setIsRegisterEntered(false);});
  };

  const handleOpenCodeVerificationModal2 = (evt) => {
    evt.preventDefault();
  
    const { code_verify } = evt.target.elements;

      fetch(`${process.env.REACT_APP_TWO}/phone-verify`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          verify_code: localStorage.getItem('phone_code_verify'),
        }),
      })
        .then(response => response.json())
        .then(result => {localStorage.setItem('token', result.data.token); setIsCodeEntered2(false); setIsForgetPasswordEntered2(false); isForgetPasswordEntered2(true);})
        .catch(error => {console.log(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!', error); setIsForgetPasswordEntered2(true); setIsSuccesEntered(false); setIsCodeEntered2(false);});
  };

  const handleOpenRegisterModal = (evt) => {
    evt.preventDefault();
    setIsSuccesEntered(false);

    if (registrationData.password !== registrationData.passwordConfirmation) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    var myHeaders = new Headers();
    // myHeaders.append('language', localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru');
    myHeaders.append('language', 'uz');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");
  
    var formdata = new FormData();
    formdata.append("name", registrationData.name);
    formdata.append("surname", localStorage.getItem('user_last_name'));
    formdata.append("password", registrationData.password);
    formdata.append("password_confirmation", registrationData.passwordConfirmation);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
  
    fetch(`${process.env.REACT_APP_TWO}/register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('user_name', result.data.user.first_name);
        localStorage.setItem('user_phone_number', result.data.user.email);
        setIsRegisterEntered(false);
        setIsSuccesEntered(true);
        // console.log(result);
        setTimeout(() => {window.location.reload()}, 100);
      })
      .catch(error => {
        console.error('Регистрация не была оформлена.');
        console.log(error);
      });
  };

  const handleOpenRegisterModal2 = (evt) => {
    evt.preventDefault();
    setIsSuccesEntered(false);

    if (registrationData.password !== registrationData.passwordConfirmation) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    var myHeaders = new Headers();
    // myHeaders.append('language', localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru');
    myHeaders.append('language', 'uz');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");
  
    var formdata = new FormData()
    formdata.append("password", registrationData.password);
    formdata.append("password_confirmation", registrationData.passwordConfirmation);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
  
    fetch(`${process.env.REACT_APP_TWO}/register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('user_name', result.data.user.first_name);
        setIsForgetPasswordEntered2(false);
        setIsSuccesEntered(true);
        // console.log(result);
        setTimeout(() => {window.location.reload()}, 100);
      })
      .catch(error => {
        console.error('Регистрация не была оформлена.');
        console.log(error);
      });
  };

  const handleLibraryPictureChange = async () => {
    if (selectedImageIndex !== -1) {
      setLibraryState(false)
      setDesigState(true)
      const selectedImage = imageList[selectedImageIndex];
      const imgObj = new Image();

      imgObj.src = selectedImage;

      imgObj.onload = function () {
        const img = new fabric.Image(imgObj);

        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
        setShowLibrary(false);
        setPhotoInputVisible(!photoInputVisible);
      };
      setPrintImage(selectedImage);
      setImeyg(selectedImage);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TWO}/anime-category-size-color`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          language: localStorage.getItem("selectedLanguage")
            ? localStorage.getItem("selectedLanguage")
            : "ru",
        },
      })
      .then((response) => {
        setCategorySize(response.data.data.category[0].sizes);
        setCategoryName(response.data.data);
        setSelectedSize(response.data.data.category[0].sizes[0].id)
      })
      .catch((error) => {
        console.error(
          localStorage.getItem("selectedLanguage") === "ru"
            ? "Произошла ошибка. Пожалуйста, попробуйте еще раз!"
            : "Xatolik yuz berdi. Iltimos qaytadan urining!",
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  document.addEventListener("keydown", function (event) {
    if (
      event.code === "Delete" ||
      event.key === "Delete" ||
      event.keyCode === 46
    ) {
      canvas.remove(canvas.getActiveObject());
    }
  });

  const handleImageClickHeader = (active) => {
    if (selectedHeader === active) {
      setSelectedHeader(null);
    } else {
      setSelectedHeader(active);
    }
  };

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("trashCard"));
    if (savedCards) {
      // setTrashCardData(savedCards);
    }
  }, []);

  const sliderStyle = {
    background: "transparent",
    color: "black",
  };

  const handleClickTrueFalse = () => {
    setIsFrontView((prev) => !prev);
  };

  const handleClickColorChange = () => {
    setIsColorChange((prev) => !prev);
  };

  useEffect(() => {
    const storedIsFrontView = localStorage.getItem("isFrontView");
    if (storedIsFrontView) {
      setIsFrontView(JSON.parse(storedIsFrontView));
    }
  }, []);

  const handleClickCategoryChange = () => {
    setIsCategoryChange((prev) => !prev);
  };

  const handleRadiusChange = (value) => {
    const newRadius = Math.max(0, Math.min(50, value));
    setRadius(newRadius);

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "image") {
      activeObject.set({ borderRadius: newRadius });
      canvas.renderAll();
    }
  };

  if (image === null) {
    if (categoryChange === 31) {
      if (shirtColor === "#000000") {
        image = frontImageBlack;
      } else {
        image = frontImage;
      }
    } else if (categoryChange === 33) {
      if (shirtColor === "#000000") {
        image = hoodie_front_black;
      } else {
        image = hoodie_front_white;
      }
    } else if (categoryChange === 32) {
      if (shirtColor === "#000000") {
        image = sweatshot_front_black;
      } else {
        image = sweatshot_front_white;
      }
    }
  }

  if (imageBack === null) {
    if (categoryChange === 31) {
      if (shirtColor === "#000000") {
        imageBack = backImageBlack;
      } else {
        imageBack = backImage;
      }
    } else if (categoryChange === 33) {
      if (shirtColor === "#000000") {
        imageBack = hoodie_back_black;
      } else {
        imageBack = hoodie_back_white;
      }
    } else if (categoryChange === 32) {
      if (shirtColor === "#000000") {
        imageBack = sweatshot_back_black;
      } else {
        imageBack = sweatshot_back_white;
      }
    }
  }

  const product_id = JSON.parse(localStorage.getItem("currentProduct"));

  const fetchFiles = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching files:", error);
      throw error;
    }
  };

  const fetchFilesBack = async () => {
    try {
      const response = await fetch(imageBack);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching files:", error);
      throw error;
    }
  };

  useEffect(() => {
    const storedCount = localStorage.getItem('counterValue');
    if (storedCount) {
      setCountHeader(Number(storedCount));
    }
  }, []);

  const handleButtonClick = () => {
    const newCount = Math.max(1, countHeader + 1);
    setCountHeader(newCount);

    localStorage.setItem('counterValue', newCount.toString());
  };

  const addToBasketTo = async (e) => {
    e.preventDefault();

    const frontImageBlob = await fetchFiles();
    const backImageBlob = await fetchFilesBack();

    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

    var formdata = new FormData();
    formdata.append("product_id", product_id.id);
    formdata.append("category_id", categoryChange);
    formdata.append("quantity", 1);
    formdata.append("color_id", shirtColor === '#000000' ? 3 : 4);
    formdata.append("size_id", selectedSize);
    formdata.append("imagesPrint[]", printImage);
    formdata.append("image_front", frontImageBlob);
    formdata.append("image_back", backImageBlob);
    formdata.append("price", shirtTypePrice ? shirtTypePrice : product_id.price);
    formdata.append("type", shirtTypeId);
    formdata.append("for_mobile", 1);

    // console.log(printImage);
    // console.log(imeyg);
    // console.log(image);
    // console.log(frontImageBlob);
    // console.log(backImageBlob);
    // console.log(selectedSize);
    // console.log(shirtColor === '#000000' ? 3 : 4);
    // console.log(categoryChange);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/order/set-warehouse`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          alert('Товар добавлен в корзину.');
        } else {
          if (result.message === "Unauthenticated.") {
            alert('Вы не авторизованы. Если вы хотите добавить товар в корзину, пожалуйста, сначала авторизуйтесь.');
            window.open('https://easyprint.uz/#/mobile/auth', '_blank');

            // Joriy oynani yopish
            // window.close();
          } else {
            alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
          }
        }
      })
      .catch(error => console.log('error', error));
  };

  const handleShowLibrary = () => {
    setShowLibrary(!showLibrary);

    axios
      .get(`${process.env.REACT_APP_TWO}/get-image`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          language: localStorage.getItem("selectedLanguage")
            ? localStorage.getItem("selectedLanguage")
            : "ru",
        },
      })
      .then((response) => {
        setImageList(response.data.data);
      })
      .catch((error) => {
        console.error(
          localStorage.getItem("selectedLanguage") === "ru"
            ? "Произошла ошибка. Пожалуйста, попробуйте еще раз!"
            : "Xatolik yuz berdi. Iltimos qaytadan urining!",
        );
      });
  };

  const handleImageClick2 = (index) => {
    if (index === selectedImageIndex) {
      setSelectedImageIndex(-1);
    } else {
      setSelectedImageIndex(index);
    }
  };

  // ----------------

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const canvas = new fabric.Canvas(canvasRef.current);
  //     setCanvas(canvas);

  //     return () => {
  //       canvas.dispose();
  //     };
  //   }
  // }, []);

  // useEffect(() => {
  //   if (headText.length) {
  //     const objectToSelect = canvas
  //       .getObjects()
  //       .find((obj) => obj.uniqueKey === textUniqueKey);

  //     if (objectToSelect.type === "text") {
  //       const prevTexts = canvas.getObjects();

  //       prevTexts.forEach((textObj) => {
  //         canvas.remove(textObj);
  //       });

  //       const newText = new fabric.Text(
  //         TextParams.get("text").get(textUniqueKey),
  //         {
  //           ...prevTexts.find((item) => item.uniqueKey === textUniqueKey),
  //           text: TextParams.get("text").get(textUniqueKey) || "EasyText",
  //           fill: TextParams.get("color").get(textUniqueKey) || "#000",
  //           fontFamily:
  //             TextParams.get("fontFamily").get(textUniqueKey) || "Bebas Neue",
  //           fontSize: TextParams.get("fontSize").get(textUniqueKey) || "30",
  //           uniqueKey: textUniqueKey,
  //         },
  //       );

  //       const updatedTexts = [...prevTexts];
  //       updatedTexts[
  //         updatedTexts
  //           .map((item) => item.uniqueKey)
  //           .findIndex((item) => item === textUniqueKey)
  //       ] = newText;

  //       setHeadText(updatedTexts);

  //       updatedTexts.forEach((textObj) => {
  //         canvas.add(textObj);
  //       });

  //       canvas.renderAll();
  //     }
  //   }

  //   if (!textInputVisible && textInputValue) {
  //     const existingData = JSON.parse(localStorage.getItem("textData")) || [];
  //     const newTextData = [...existingData, textInputValue];
  //     localStorage.setItem("textData", JSON.stringify(newTextData));
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [canvas, TextParams]);

  // useEffect(() => {
  //   if (canvas) {
  //     const prevTexts = canvas.getObjects();

  //     prevTexts.forEach((item) => {
  //       item.set(
  //         "visible",
  //         item.isFront === "front" && isFrontView
  //           ? true
  //           : item.isFront === "back" && !isFrontView
  //           ? true
  //           : false,
  //       );
  //     });

  //     canvas.renderAll();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isFrontView]);

  // useEffect(() => {
  //   if (canvas) {
  //     const handleObjectSelected = (e) => {
  //       const selectedObject = e.target;
  
  //       if (selectedObject && selectedObject.type === "text") {
  //         setTextUniqueKey(selectedObject.uniqueKey);
  //         setPhotoInputVisible(false);
  //         setTextInputVisible(true);
  //       } else if (selectedObject && selectedObject.type === "image") {
  //         setTextUniqueKey(selectedObject.uniqueKey);
  //         setImeyg(selectedObject.getSrc());
  //         setTextInputVisible(false);
  //         setPhotoInputVisible(true);
  //       }
  //     };
  
  //     canvas.on("selection:created", handleObjectSelected);
  //     canvas.on("selection:updated", handleObjectSelected);
  
  //     return () => {
  //       canvas.off("selection:created", handleObjectSelected);
  //       canvas.off("selection:updated", handleObjectSelected);
  //     };
  //   }
  // }, [canvas]);  

  // useEffect(() => {
  //   if (canvas) {
  //     const handleObjectSelected = (e) => {
  //       const selectedObject = e.target;

  //       if (selectedObject && selectedObject.type === "text") {
  //         setTextUniqueKey(selectedObject.uniqueKey);
  //         setPhotoInputVisible(false);
  //         setTextInputVisible(true);
  //       } else if (selectedObject && selectedObject.type === "image") {
  //         setTextUniqueKey(selectedObject.uniqueKey);
  //         setImeyg(selectedObject.getSrc());
  //         setTextInputVisible(false);
  //         setPhotoInputVisible(true);
  //       }
  //     };

  //     canvas.on("selection:created", handleObjectSelected);
  //     canvas.on("selection:updated", handleObjectSelected);

  //     return () => {
  //       canvas.off("selection:created", handleObjectSelected);
  //       canvas.off("selection:updated", handleObjectSelected);
  //     };
  //   }
  // }, [canvas]);

  useEffect(() => {
    setDesigState(true);
    setLayersState(false);
    setLibraryState(false);
    setProductState(false);

    setFirstBar(true);
    setTextBar(false);
    setImageBar(false);

    setStyleText(false);
    setTextText(true);
    setSizeText(false);
  }, [])

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_TWO}/anime-category-size-color`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //         language: localStorage.getItem("selectedLanguage")
  //           ? localStorage.getItem("selectedLanguage")
  //           : "ru",
  //       },
  //     })
  //     .then((response) => {
  //       setCategorySize(response.data.data.category[0].sizes);
  //       setCategoryName(response.data.data);
  //     })
  //     .catch((error) => {
  //       alert(
  //         localStorage.getItem("selectedLanguage") === "ru"
  //           ? "Произошла ошибка. Пожалуйста, попробуйте еще раз!"
  //           : "Xatolik yuz berdi. Iltimos qaytadan urining!",
  //       );
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleShowAnime = () => {
    axios.get(`${process.env.REACT_APP_TWO}/anime-category-size-color`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setCategorySize(response.data.data.category[0].sizes)
      setCategoryName(response.data.data);
    }).catch((error) => {
      console.log(error);
    });   
  };

  useEffect(() => {
    if (textBar) {
      const canvas = new fabric.Canvas('canvasTextMobile');
      canvas.clear();
      const text = new fabric.Textbox(textValue, {
        left: 50,
        top: 50,
        fill: '#000000',
        fontSize: 20,
        fontFamily: 'Arial'
      });
      canvas.add(text);
    }
  }, [textBar, textValue]);

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleClickTshirtChange = () => {
    setTshirtImage((prev) => !prev);
  };

  // useEffect(() => {
  //   const storedCount = localStorage.getItem('counterValue');
  //   if (storedCount) {
  //     setCountHeader(Number(storedCount));
  //   }
  // }, []);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    setCanvas(new fabric.Canvas('tshirt-canvas'));
  }, []);

  // useEffect(() => {
  //   if (!isFrontView && refBack.current) {
  //     takeScreenshotBack(refBack.current).catch((error) => {
  //       console.error("Screenshot capture failed:", error);
  //     });
  //   }
  // }, [isFrontView, takeScreenshotBack]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedIsFrontView = localStorage.getItem("isFrontView");
  //   if (storedIsFrontView) {
  //     setIsFrontView(JSON.parse(storedIsFrontView));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (canvas) {
  //     const prevTexts = canvas.getObjects();

  //     prevTexts.forEach((item) => {
  //       item.set(
  //         "visible",
  //         item.isFront === "front" && isFrontView
  //           ? true
  //           : item.isFront === "back" && !isFrontView
  //           ? true
  //           : false,
  //       );
  //     });

  //     canvas.renderAll();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isFrontView]);

  if (modalLoader === true) {
    setTimeout(() => {
      setModalLoader(false)
    }, 2000);
  }

  if (modalLeft === '20px' || modalTop === '20px') {
    setTimeout(() => {
      setModalLeft('0px'); setModalTop('-7px')
    }, 3000);
  }

  return (
    <div style={{overflow: 'hidden'}}>
      <style>
        {`
          @media only screen and (max-width: 380px){
            .clothes_image {
              mix-blend-mode: multiply;
              width: 280px;
              margin-left: 5px;
            }

            .mobile_btn_library_design {
              width: 60%;
              margin-left: 20%;
              position: relative;
              top: -30px;
            }

            .drawing-area {
              position: absolute;
              top: 102px;
              left: 94px;
              z-index: 10;
              transform: scale(0.65);
            }

            .canvas-container {
              width: 160px !important;
              height: 210px !important;
              margin-top: -18px;
              margin-left: -3px;
            }

            .mobile_add_text_imput {
              top: -84px;
            }

            .mobile_add_text_select {
              top: -84px;
            }

            .upper-canvas {
              width: 160px !important;
              height: 210px !important;
            }

            .lower-canvas {
              left: 6px !important;
              top: 75px !important;
              width: 160px !important;
              height: 210px !important;
              border-color: transparent !important;
            }
          }

          @media only screen and (min-width: 380px){
            .clothes_image {
              mix-blend-mode: multiply;
              width: 320px;
            }

            .mobile_btn_library_design {
              width: 80%;
              margin-left: 10%;
            }

            .drawing-area {
              position: absolute;
              top: 102px;
              left: 94px;
              z-index: 10;
              transform: scale(0.65);
            }

            .upper-canvas, .canvas-container {
              width: 200px !important;
              height: 250px !important;
            }

            .lower-canvas {
              left: ${modalLeft} !important;
              top: ${modalTop} !important;
              // left: 21px !important;
              // top: 20px !important;
              width: 200px !important;
              height: 260px !important;
              border-color: transparent !important;
            }
          }
        `}
      </style>

      <div className='yourDesign_header_mobile'>
        <NavLink to={'/mobile'} target='_blank' className='center' style={{margin: 0, padding: 0}}>
          <img src={homeImage} alt="homeImage" />
        </NavLink>
        <img src={leftImage} alt="leftImage" style={{opacity: 0}} />
        <img onClick={() => {handleClickTshirtChange(); handleClickTrueFalse();}} src={cachedImage} alt="cachedImage" />
        <img src={rightImage} alt="rightImage" style={{opacity: 0}} />
        <img onClick={() => {setModalLeft('20px'); setModalTop('21px'); getImage(); setModalLoader(true);}} data-bs-toggle="modal" data-bs-target="#exampleModal" src={basketImage} alt="basketImage" />
      </div>

      <div style={{position: 'absolute', width: '100%', zIndex: 100, height: '100%', top: '0', left: '0', backgroundColor: 'white',}} onClick={() => {setTextBar(false); setFirstBar(true); setImageBar(false); setDesigState(true); setLayersState(false); setLibraryState(false); setProductState(false);}}></div>

      <div style={{position: 'relative', zIndex: 200, marginTop: fileAndText ? '50px' : '80px', }}>
        <div id="tshirt-div" style={{position: 'relative', left: '123px', transform: 'scale(1.5)', top: '69px'}}>
          {/* {desigState === true && ( */}
            <div style={{textAlign: 'left', height: '400px', display: desigState ? 'block' : 'none'}}>
              <center ref={ref}>
                <CategoriesMobile
                  category={categoryChange}
                  isFrontView={isFrontView}
                  shirtColor={shirtColor}
                  photoInputVisible={photoInputVisible}
                  textInputVisible={textInputVisible}
                  ref={isFrontView ? ref : refBack}
                  ref2={canvasRef}
                />

                <div className="canvas-container" style={{position: 'relative', top: '-260px', transform: 'scale(0.6)',}}>
                  <canvas id="tshirt-canvas" width={200} height={250} ></canvas>
                </div>
              </center>
            </div>
          {/* )} */}
        </div>

        {/* {layersState === true && ( */}
          <center style={{textAlign: 'left', padding: '16px', marginTop: '-50px', display: layersState ? 'block' : 'none'}}>
            <LayersMobile
              isActive={textUniqueKey}
              contents={headText}
              deleteElement={deleteElement}
              SetActiveLayer={SetActiveLayer}
              dublicateElement={dublicateElement}
            />
          </center>
        {/* )} */}

        {/* {libraryState === true && ( */}
          <center style={{textAlign: 'left', padding: '16px', marginTop: '-85px', display: libraryState ? 'block' : 'none'}}>
            <div className="d-flex justify-content-between" style={{flexWrap: 'wrap', padding: '24px', height: '450px', overflow: 'scroll'}}>
              {imageList.map((item, index) => (
                <img style={{width: '18.203883495145632vh', cursor: 'pointer', height: '18.203883495145632vh', marginBottom: '2.912621359223301vh'}} key={index} src={item} alt="build_library_img" className={(index === selectedImageIndex && selectedImageIndex !== -1) ? 'selected-image_modal' : ''} onClick={() => handleImageClick2(index)} />
              ))}
            </div>

            <div>
              <button
                onClick={handleLibraryPictureChange}
                className={
                  selectedImageIndex !== -1
                    ? "btn_library mobile_btn_library_design"
                    : "btn_library_disabled mobile_btn_library_design"
                }
              >
                Выбрать
              </button>
            </div>
          </center>
        {/* )} */}

        {/* {productState === true && ( */}
          <center style={{textAlign: 'left', padding: '16px', marginTop: '-85px', display: productState ? 'block' : 'none'}}>
            <div className="center" style={{flexWrap: 'wrap', justifyContent: 'center', marginTop: '24px', padding: '2.912621359223301vh'}}>
              {/* {categoryName && categoryName.category && categoryName.category.map((cat, index) => (
                <div key={index} onClick={() => {if (cat.type !== 'no active') { setCategory(cat.name); setCategoryChange(cat.id); setCategoryChangeCheck(cat.id); setCategorySize(cat.sizes); setCategoryIndex(index); } }} className={`${cat.type === 'no active' ? 'category_change_disbaled_mobile' : `category_change_mobile ${categoryIndex === index ? 'selected_category_mobile' : ''}`}`}>              
                  {cat.name}
                </div>
              ))} */}

              <div style={{width: '240px', height: '52px', border: 'none', backgroundColor: '#F8F8F8', fontSize: '18px', color: 'black',}} data-bs-target="#exampleModalToggle500" data-bs-toggle="modal" className={`shirt_drawing_header_select`}>
                {localStorage.getItem('selectedLanguage') === 'ru' ? `${shirtTypeName}` : `${shirtTypeName}`}
                {/* {categoryChange === 31 ? localStorage.getItem('selectedLanguage') === 'ru' ? 'Тип: стандарт' : 'Turi: standart' : categoryChange === 32 ? localStorage.getItem('selectedLanguage') === 'ru' ? 'Свитшот' : 'Svitter' : categoryChange === 33 ? localStorage.getItem('selectedLanguage') === 'ru' ? 'Худи' : 'Xudi' : localStorage.getItem('selectedLanguage') === 'ru' ? 'Футболка' : 'Futbolka'}  */}
                <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" style={{width: '16px', height: '16px'}} viewBox="0 0 16 16" fill="none">
                  <path d="M8 12C7.72592 12.0004 7.45444 11.9511 7.20118 11.8547C6.94792 11.7583 6.71786 11.6169 6.52423 11.4385L1.79945 7.09254C1.36915 6.69675 1.36918 6.01767 1.79951 5.62192C2.18181 5.27034 2.76973 5.27034 3.15203 5.62192L8 10.0803L12.848 5.62189C13.2303 5.27033 13.8182 5.27033 14.2004 5.62189C14.6308 6.01764 14.6308 6.69674 14.2004 7.0925L9.47577 11.4375C9.28223 11.6161 9.05221 11.7577 8.79894 11.8543C8.54567 11.9508 8.27415 12.0003 8 12Z" fill="#32454B"/>
                </svg>
              </div>
            </div>

            <p className='product_state_text'>Размер</p>

            <div className="center" style={{flexWrap: 'wrap', justifyContent: 'flex-start', padding: '24px'}}>
              {categorySize.map((siz, index) => (
                <div key={siz.id} onClick={() => {setSize(siz.name); setSelectedSize(siz.id); setColorIndex(index)}} className={`${siz.type === 'no active' ? 'size_change_selector_disbaled_mobile' : `size_change_selector_mobile ${colorIndex === index ? 'size_change_selector_selected_mobile' : ''}`}`} style={{margin: '1px',}}>
                  {siz.name}
                </div>
              ))}
            </div>

            <p className='product_state_text'>Цвет</p>

            <div className="d-flex justify-content-between" style={{flexWrap: 'wrap'}}>
              <div className='d-flex' style={{padding: '24px'}}>
                <div onClick={() => setShirtColor('#FFFFFF')} className='color_change_selector_mobile'>
                  <div className='center' style={{borderRadius: '50%', width: '50px', height: '50px', backgroundColor: 'white', border: '0.5px solid var(--neutral-200, #CCC)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4.14027 9.82979C3.84222 9.82992 3.55637 9.71145 3.3458 9.50052L0.943839 7.09945C0.685387 6.84092 0.685387 6.42183 0.943839 6.1633C1.20237 5.90485 1.62146 5.90485 1.87999 6.1633L4.14027 8.42358L10.12 2.44384C10.3785 2.18539 10.7976 2.18539 11.0562 2.44384C11.3146 2.70237 11.3146 3.12146 11.0562 3.37999L4.93474 9.50052C4.72417 9.71145 4.43832 9.82992 4.14027 9.82979Z" fill={shirtColor === '#000000' ? '#FFFFFF' : '#000000'} />
                    </svg>
                  </div>
                </div>

                <div onClick={() => setShirtColor('#000000')} className='color_change_selector_mobile'>
                  <div className='center' style={{borderRadius: '50%', width: '50px', height: '50px', backgroundColor: 'black', marginLeft: '19px', border: '0.5px solid var(--neutral-200, #CCC)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4.14027 9.82979C3.84222 9.82992 3.55637 9.71145 3.3458 9.50052L0.943839 7.09945C0.685387 6.84092 0.685387 6.42183 0.943839 6.1633C1.20237 5.90485 1.62146 5.90485 1.87999 6.1633L4.14027 8.42358L10.12 2.44384C10.3785 2.18539 10.7976 2.18539 11.0562 2.44384C11.3146 2.70237 11.3146 3.12146 11.0562 3.37999L4.93474 9.50052C4.72417 9.71145 4.43832 9.82992 4.14027 9.82979Z" fill={shirtColor === '#000000' ? '#FFFFFF' : '#000000'} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </center>
        {/* )} */}

        {/* {firstBar === true && ( */}
          <div style={{display: firstBar ? 'block' : 'none'}} className="yourDesign_bar">
            {/* {desigState === true && ( */}
              <div style={{width: '100%', display: fileAndText ? 'flex' : 'none', justifyContent: 'space-between', position: 'relative', bottom: '-30px', zIndex: '100'}}>
                <label>
                  <input type="file" accept="image/*" onChange={addCustomPicture} style={{ display: 'none', }} />

                  <img src={addImage} alt="addImage" />
                </label>

                {/* <img onClick={() => {setTextBar(true); setFirstBar(false); setImageBar(false)}} src={addTextImage} alt="addText" /> */}
                <img onClick={() => {setTextBar(true); setTextText(true); setFileAndText(false); addText()}} src={addTextImage} alt="addText" />
              </div>
            {/* )} */}

            <div className="yourDesign_bar_bottom">
              <div onClick={() => {setDesigState(true); setLayersState(false); setLibraryState(false); setProductState(false);}}>
                <img src={design} alt="design" />
              </div>

              <div onClick={() => {setDesigState(false); setLayersState(true); setLibraryState(false); setProductState(false);}}>
                <img src={layer} alt="layer" />
              </div>

              <div onClick={() => {setDesigState(false); setLayersState(false); setLibraryState(true); setProductState(false); handleShowLibrary()}}>
                <img src={library} alt="library" />
              </div>

              <div onClick={() => {setDesigState(false); setLayersState(false); setLibraryState(false); setProductState(true); handleShowAnime()}}>
                <img src={product} alt="product" />
              </div>
            </div>
          </div>
        {/* )} */}

        {/* {textBar === true && ( */}
          <div style={{display: textBar ? 'block' : 'none'}}>

            {textText === true && (
              <div style={{position: 'relative', top: '-20px'}}>
                <input value={TextParams.get("text").get(textUniqueKey)} onChange={(e) => TextParamsChanger({ type: "text", value: e.target.value, })} className='mobile_add_text_imput' style={{padding: "12px", minHeight: "73px", height: 46, outline: "none", fontFamily: TextParams.get("fontFamily").get(textUniqueKey),}} type="text" />

                <div className="d-flex" style={{margin: '0 16px'}}>
                  <select
                    className="mobile_add_text_select"
                    style={{
                      height: "40px",
                      fontFamily: TextParams.get("fontFamily").get(textUniqueKey),
                      position: 'relative',
                      zIndex: 10000, 
                      width: '100%',
                      paddingLeft: 7                  
                    }}
                    value={TextParams.get("fontFamily").get(textUniqueKey)}
                    onChange={(e) =>
                      TextParamsChanger({
                        type: "fontFamily",
                        value: e.target.value,
                      })
                    }
                  >
                    <option
                      value="Bebas Neue"
                      style={{ fontFamily: "Bebas Neue" }}
                    >
                      Bebas Neue
                    </option>
                    <option
                      value="Kelly Slab"
                      style={{ fontFamily: "Kelly Slab" }}
                    >
                      Kelly Slab
                    </option>
                    <option
                      value="Russo One"
                      style={{ fontFamily: "Russo One" }}
                    >
                      Russo One
                    </option>
                    <option value="Neucha" style={{ fontFamily: "Neucha" }}>
                      Neucha
                    </option>
                  </select>
                </div>
              </div>
            )}

            {sizeText === true && (
              <input value={TextParams.get("text").get(textUniqueKey)} onChange={(e) => TextParamsChanger({ type: "text", value: e.target.value, })} className='mobile_add_text_imput' type="text" name="" id="" />
            )}

            <div className="yourDesign_bar">
              <div className="yourDesign_bar_bottom">
                <div onClick={() => {setTextText(false); setDesigState(true); setFileAndText(true); setFirstBar(true); setStyleText(false); setTextBar(false); setSizeText(false)}}>
                  <img src={style_text} alt="style_text" />
                </div>

                <div onClick={() => {setTextText(true); setStyleText(false); setSizeText(false)}}>
                  <img src={text_text} alt="text_text" />
                </div>

                <div onClick={() => {setTextText(false); setStyleText(false); setSizeText(true)}}>
                  <img src={size_text} alt="size_text" />
                </div>
              </div>
            </div>
          </div>
        {/* )} */}
      </div>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '0'}}>
          <div className="modal-content" style={{borderRadius: '0'}}>
            {modalLoader === true ? (
              <div style={{padding: '48px'}} className="modal-body">
                <div className="center" style={{paddingTop: '284px', paddingBottom: '284px', zIndex: '2', position: 'relative'}}>
                  <span class="loader_maen"></span>
                </div>
              </div>
            ) : (
              <div style={{padding: '48px'}} className="modal-body">
                <div>
                  <div data-bs-dismiss="modal" style={{position: 'absolute', left: '16px', top: '24px'}}>
                    <svg style={{position: 'relative', zIndex: 2000}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex-column center">
                    <div>
                      <img style={{width: '220px', height: '400px', position: 'relative', zIndex: 1000, top: '-32px'}} src={image} alt="tShirt_front" />
                    </div>

                    <div>
                      <img style={{width: '220px', height: '220px', marginTop: '-220px', position: 'relative', zIndex: 2000}} src={imageBack} alt="tShirt_back" ref={refBack} />
                    </div>
                  </div>
                  <center>

                    <button onClick={e => {addToBasketTo(e); handleButtonClick()}} className='add_basket_btn center' style={{width: '100%', height: '56px', marginTop: '18px', marginLeft: '0px', padding: '15px 18px', marginBottom: '0px', marginRight: '12px'}} data-bs-dismiss="modal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.5 7H17C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7H4.5C3.83696 7 3.20107 7.26339 2.73223 7.73223C2.26339 8.20107 2 8.83696 2 9.5L2 17.8333C2.00132 18.938 2.44073 19.997 3.22185 20.7782C4.00296 21.5593 5.062 21.9987 6.16667 22H17.8333C18.938 21.9987 19.997 21.5593 20.7782 20.7782C21.5593 19.997 21.9987 18.938 22 17.8333V9.5C22 8.83696 21.7366 8.20107 21.2678 7.73223C20.7989 7.26339 20.163 7 19.5 7ZM12 3.66667C12.8841 3.66667 13.7319 4.01786 14.357 4.64298C14.9821 5.2681 15.3333 6.11594 15.3333 7H8.66667C8.66667 6.11594 9.01786 5.2681 9.64298 4.64298C10.2681 4.01786 11.1159 3.66667 12 3.66667ZM20.3333 17.8333C20.3333 18.4964 20.0699 19.1323 19.6011 19.6011C19.1323 20.0699 18.4964 20.3333 17.8333 20.3333H6.16667C5.50363 20.3333 4.86774 20.0699 4.3989 19.6011C3.93006 19.1323 3.66667 18.4964 3.66667 17.8333V9.5C3.66667 9.27899 3.75446 9.06702 3.91074 8.91074C4.06702 8.75446 4.27899 8.66667 4.5 8.66667H7V10.3333C7 10.5543 7.0878 10.7663 7.24408 10.9226C7.40036 11.0789 7.61232 11.1667 7.83333 11.1667C8.05435 11.1667 8.26631 11.0789 8.42259 10.9226C8.57887 10.7663 8.66667 10.5543 8.66667 10.3333V8.66667H15.3333V10.3333C15.3333 10.5543 15.4211 10.7663 15.5774 10.9226C15.7337 11.0789 15.9457 11.1667 16.1667 11.1667C16.3877 11.1667 16.5996 11.0789 16.7559 10.9226C16.9122 10.7663 17 10.5543 17 10.3333V8.66667H19.5C19.721 8.66667 19.933 8.75446 20.0893 8.91074C20.2455 9.06702 20.3333 9.27899 20.3333 9.5V17.8333Z" fill="white"/>
                      </svg>
                      <span>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Добавить в корзину' : 'Savatga qo\'shish'}</span>
                    </button>
                  </center>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModalToggle500" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div className="modal-dialog" style={{borderRadius: '12px', border: 'none', minHeight: '400px'}}>
          <div className="modal-content" style={{borderRadius: '12px', border: 'none', minHeight: '400px'}}>
            <div className="modal-body" style={{padding: '32px', minHeight: '400px'}}>
              <div className="d-flex justify-content-between" style={{flexDirection: 'column'}}>
                <div data-bs-dismiss="modal" aria-label="Close" onClick={() => {setShirtTypePrice(150000); setShirtTypeName(localStorage.getItem('selectedLanguage') === 'ru' ? 'Стандарт' : 'Standart'); setShirtTypeId(0)}} className='center flex-column'>
                  <img className='modal_image' src={modal_image1} alt="modal_image1" />

                  <h2 className='modal_image_title'>Стандарт</h2>
                  <p className='modal_image_title_price'>150 000 сум</p>

                  <button onClick={() => {setShirtTypeId0(true);}} className='modal_image_title_button' style={{display: shirtTypeId0 || shirtTypeId1 || shirtTypeId2 === true ? 'none' : 'flex', width: '160px'}}>Таблица размеров</button>
                </div>

                <div data-bs-dismiss="modal" aria-label="Close" onClick={() => {setShirtTypePrice(185000); setShirtTypeName(localStorage.getItem('selectedLanguage') === 'ru' ? 'С воротником' : 'Yoqa bilan'); setShirtTypeId(1)}}  className='center flex-column'>
                  <img className='modal_image' src={modal_image2} alt="modal_image1" />

                  <h2 className='modal_image_title'>С воротником</h2>
                  <p className='modal_image_title_price'>185 000 сум</p>

                  <button onClick={() => {setShirtTypeId1(true);}} className='modal_image_title_button' style={{display: shirtTypeId0 || shirtTypeId1 || shirtTypeId2 === true ? 'none' : 'flex', width: '160px'}}>Таблица размеров</button>
                </div>

                <div data-bs-dismiss="modal" aria-label="Close" onClick={() => {setShirtTypePrice(195000); setShirtTypeName(localStorage.getItem('selectedLanguage') === 'ru' ? 'Оверсайз' : `Katta o'lchamli`); setShirtTypeId(2)}}  className='center flex-column'>
                  <img className='modal_image' src={modal_image3} alt="modal_image1" />

                  <h2 className='modal_image_title'>Оверсайз</h2>
                  <p className='modal_image_title_price'>195 000 сум</p>

                  <button onClick={() => {setShirtTypeId2(true);}} className='modal_image_title_button' style={{display: shirtTypeId0 || shirtTypeId1 || shirtTypeId2 === true ? 'none' : 'flex', width: '160px'}}>Таблица размеров</button>
                </div>
              </div>

              {shirtTypeId0 === true ? (
                <div className='center flex-column' style={{marginTop: '16px'}}>
                  <img src={modal_image_size1} alt="modal_image_size1" />

                  <button onClick={() => {setShirtTypeId0(false);}} style={{width: '89px'}} className='modal_image_title_button'>Свернуть</button>
                </div>
              ) : null}

              {shirtTypeId1 === true ? (
                <div className='center flex-column' style={{marginTop: '16px'}}>
                  <img src={modal_image_size1} alt="modal_image_size1" />

                  <button onClick={() => {setShirtTypeId1(false);}} style={{width: '89px'}} className='modal_image_title_button'>Свернуть</button>
                </div>
              ) : null}

              {shirtTypeId2 === true ? (
                <div className='center flex-column' style={{marginTop: '16px'}}>
                  <img src={modal_image_size1} alt="modal_image_size1" />

                  <button onClick={() => {setShirtTypeId2(false);}} style={{width: '89px'}} className='modal_image_title_button'>Свернуть</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourDesignMobileTest

const TextParamsTypes = [
  { label: "fontSize", name: "fontSize" },
  { label: "fontFamily", name: "fontFamily" },
  { label: "text", name: "text" },
  { label: "color", name: "fill" },
];

const ControlVisible = [
  { corner: "tl", value: false },
  { corner: "tr", value: false },
  { corner: "bl", value: false },
  { corner: "br", value: false },
  { corner: "ml", value: false },
  { corner: "mt", value: false },
  { corner: "mr", value: false },
  { corner: "mb", value: false },
  { corner: "br", value: true },
];

const ControlOptions = {
  transparentCorners: false,
  cornerStrokeColor: "blue",
  borderColor: "blue",
  borderSize: 10,
  cornerSize: 6,
  cornerStyle: "circle",
};

const filterOptions = [
  {
    name: "Original",
    styleFilter: "",
    option: [1, []],
  },
  {
    name: "1977",
    styleFilter: "contrast(1.1) brightness(1.1) saturate(1.1)",
    option: [
      2,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.15,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: 0.1,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: 0.3,
        },
      ],
    ],
  },
  {
    name: "Aden",
    styleFilter:
      "contrast(0.9) brightness(1.2) hue-rotate(-20deg) saturate(0.85)",
    option: [
      3,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.2,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: 0.05,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: -0.3,
        },
        {
          label: "HueRotation",
          valueLabel: "rotation",
          value: -0.1,
        },
      ],
    ],
  },
  {
    name: "Amaro",
    styleFilter:
      "contrast(0.9) brightness(1.1) hue-rotate(-10deg) saturate(1.5)",
    option: [
      4,
      [
        { label: "Contrast", value: 0.9 },
        { label: "HueRotation", value: -10 },
        { label: "Saturation", value: 1.5 },
      ],
    ],
  },
  {
    name: "Brannan",
    styleFilter: "contrast(1.4) sepia(0.5)",
    option: [
      5,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.2,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: -0.1,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: -0.3,
        },
        {
          label: "HueRotation",
          valueLabel: "rotation",
          value: -0.08,
        },
      ],
    ],
  },
  {
    name: "Clarendon",
    styleFilter: "contrast(1.2) saturate(1.35)",
    option: [
      6,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.15,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: 0.2,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: -0.05,
        },
      ],
    ],
  },
  {
    name: "Early Bird",
    styleFilter: "contrast(0.9) sepia(0.2)",
    option: [
      7,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.15,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: 0.03,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: -0.3,
        },
      ],
    ],
  },
  {
    name: "Inkwell",
    styleFilter: "sepia(0.3) contrast(1.1) brightness(1.1) grayscale(1)",
    option: [
      8,
      [
        {
          label: "Grayscale",
          valueLabel: "grayscale",
          value: 1,
        },
      ],
    ],
  },
];