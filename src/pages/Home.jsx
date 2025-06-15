// src/pages/Home.jsx

import React from "react";
import "../index.css";
import '../components/css/Home.css';
import  "../components/css/header__banner.css";
import { Link } from 'react-router-dom';
import PopularCars from "../components/PopularCars";
import LeadForm from "../components/LeadForm";
import Reputation from "../components/Reputation";



function Home() {
    return (
        <main className="section">
            <header className="header">
                <div className="header__banner">
                    <div className="header__content">
                        <div className="header__text-side">
                            <h1 className="header__title">
                                Прокат и аренда автомобилей<br />бизнес и эконом класса
                            </h1>
                            <p className="header__text">
                                У нас нет сложных формальностей и скрытых платежей. Мы делаем<br />
                                процесс автопроката простым и прозрачным, чтобы вы могли быстро<br />
                                получить желаемый автомобиль и насладиться комфортом.
                            </p>
                        </div>
                        <div className="header__button-side">
                            <Link to="/fleet" className="button">Выбрать автомобиль</Link>
                        </div>
                    </div>
                </div>
            </header>
            <div className="main_container">
                <h2 className="title-1">
                    <em style={{ color: '#E52421' }}>OnlyCars</em> – Ваш ключ<br/>к независимости на дороге!
                </h2>

                <ul className="services">
                    <li className="service">
                        Поддержка 24/ч
                        <img
                            src="/img/icons/headset_help_icon.svg"
                            alt="icon"
                            className="service_icon"
                        />
                    </li>
                    <li className="service">
                        Нет ограничений по выезду
                        <img
                            src="/img/icons/location_map_icon.svg"
                            alt="icon"
                            className="service_icon"
                        />
                    </li>
                    <li className="service">
                        Доставка в указанное место
                        <img
                            src="/img/icons/keycaricn.svg"
                            alt="icon"
                            className="service_icon"
                        />
                    </li>
                    <li className="service">
                        Аренда с водителем
                        <img
                            src="/img/icons/wheel_steering_icon.svg"
                            alt="icon"
                            className="service_icon"
                        />
                    </li>
                </ul>

                <h2 className="title-2">
                    <em>Выберите класс авто</em><br/>который Вас интересует
                </h2>
                <ul className="cars_classes">
                    <li className="car_class" data-name="Эконом">
                        Эконом
                        <img
                            src="/img/cars_class/econom.svg"
                            alt="Econom"
                            className="car_class_img"
                        />
                    </li>
                    <li className="car_class" data-name="Стандарт">
                        Стандарт
                        <img
                            src="/img/cars_class/standart.svg"
                            alt="Standart"
                            className="car_class_img"
                        />
                    </li>
                    <li className="car_class" data-name="Бизнес">
                        Бизнес
                        <img
                            src="/img/cars_class/buisness.svg"
                            alt="Business"
                            className="car_class_img"
                        />
                    </li>
                    <li className="car_class" data-name="Кроссовер">
                        Кроссовер
                        <img
                            src="/img/cars_class/crossover.svg"
                            alt="Crossover"
                            className="car_class_img"
                        />
                    </li>
                </ul>

                <PopularCars />
                <LeadForm />
                <Reputation />

            </div>
        </main>
    );
}

export default Home;
