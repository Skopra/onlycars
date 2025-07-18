import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";
import "../components/css/CarPage.css";

function CarPage() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        async function fetchCar() {
            const { data, error } = await supabase
                .from("cars")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Ошибка загрузки машины:", error);
            } else {
                // Обработка изображений - если это строка, преобразуем в массив
                if (data.images) {
                    if (typeof data.images === 'string') {
                        // Если это строка, пытаемся её распарсить
                        try {
                            data.images = JSON.parse(data.images);
                        } catch (e) {
                            // Если не JSON, разбиваем по запятым
                            data.images = data.images.split(',').map(img => img.trim()).filter(img => img);
                        }
                    }
                    // Убираем пустые элементы из массива
                    data.images = data.images.filter(img => img && img.trim());
                }

                console.log("Загруженные данные:", data);
                console.log("Изображения:", data.images);
                setCar(data);
            }
        }

        fetchCar();
    }, [id]);

    const nextSlide = () => {
        if (hasImages && imageCount > 1) {
            setCurrentSlide(prev => (prev + 1) % imageCount);
        }
    };

    const prevSlide = () => {
        if (hasImages && imageCount > 1) {
            setCurrentSlide(prev => (prev - 1 + imageCount) % imageCount);
        }
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    if (!car) {
        return <div className="loading">Загрузка...</div>;
    }

    const hasImages = car.images && Array.isArray(car.images) && car.images.length > 0;
    const imageCount = hasImages ? car.images.length : 0;

    // Отладочная информация
    console.log("Car data:", car);
    console.log("Has images:", hasImages);
    console.log("Image count:", imageCount);
    console.log("Images array:", car.images);

    return (
        <div className="car-page">
            <div className="car-container">
                <div className="car-slider-section">
                    <div className="slider-wrapper">
                        {hasImages ? (
                            <>
                                <div className="slider-container">
                                    <div
                                        className="slider-track"
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    >
                                        {car.images.map((url, index) => (
                                            <div key={index} className="slide">
                                                <img
                                                    src={url}
                                                    alt={`${car.name} ${index + 1}`}
                                                    className="car-image"
                                                    onError={(e) => {
                                                        console.error(`Ошибка загрузки изображения ${index + 1}:`, url);
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="slider-info">
                                    <span className="slide-counter">
                                        {currentSlide + 1} / {imageCount}
                                    </span>
                                </div>

                                {imageCount > 1 && (
                                    <>
                                        <button className="slider-arrow slider-prev" onClick={prevSlide}>
                                            &#8249;
                                        </button>
                                        <button className="slider-arrow slider-next" onClick={nextSlide}>
                                            &#8250;
                                        </button>

                                        <div className="slider-dots">
                                            {car.images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                                                    onClick={() => goToSlide(index)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="no-image">
                                <div className="no-image-text">Изображения отсутствуют</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="car-info-section">
                    <h1 className="car-title">{car.name}</h1>

                    <div className="price-section">
                        <div className="price-card">
                            <div className="price-icon">🕒</div>
                            <div className="price-content">
                                <div className="price-value">от {car.price_per_day?.toLocaleString()} руб</div>
                                <div className="price-label">Стоимость за сутки</div>
                            </div>
                        </div>
                        <div className="price-card">
                            <div className="price-icon">💰</div>
                            <div className="price-content">
                                <div className="price-value">{car.deposit?.toLocaleString()} руб</div>
                                <div className="price-label">Возвратная сумма залога</div>
                            </div>
                        </div>
                    </div>

                    <div className="specs-section">
                        <h2 className="specs-title">Технические характеристики:</h2>
                        <div className="specs-grid">
                            {car.year && (
                                <div className="spec-item">
                                    <span className="spec-label">Год выпуска –</span>
                                    <span className="spec-value">{car.year} год</span>
                                </div>
                            )}
                            {car.transmission && (
                                <div className="spec-item">
                                    <span className="spec-label">Тип КПП –</span>
                                    <span className="spec-value">{car.transmission}</span>
                                </div>
                            )}
                            {car.power && (
                                <div className="spec-item">
                                    <span className="spec-label">Мощность –</span>
                                    <span className="spec-value">{car.power}</span>
                                </div>
                            )}
                            {car.body_type && (
                                <div className="spec-item">
                                    <span className="spec-label">Тип кузова –</span>
                                    <span className="spec-value">{car.body_type}</span>
                                </div>
                            )}
                            {car.engine_volume && (
                                <div className="spec-item">
                                    <span className="spec-label">Объём двигателя –</span>
                                    <span className="spec-value">{car.engine_volume}</span>
                                </div>
                            )}
                            {car.drive && (
                                <div className="spec-item">
                                    <span className="spec-label">Привод –</span>
                                    <span className="spec-value">{car.drive}</span>
                                </div>
                            )}
                            {car.clearance && (
                                <div className="spec-item">
                                    <span className="spec-label">Клиренс –</span>
                                    <span className="spec-value">{car.clearance}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {car.equipment && (
                        <div className="equipment-section">
                            <h3 className="section-title">Комплектация –</h3>
                            <span className="section-content">{car.equipment}</span>
                        </div>
                    )}

                    {car.fuel_info && (
                        <div className="fuel-section">
                            <h3 className="section-title">Тип топлива –</h3>
                            <span className="section-content">{car.fuel_info}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CarPage;