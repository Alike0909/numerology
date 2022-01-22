import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import QRCode from 'qrcode.react'
import moment from 'moment';
import './index.css'

// COMPONENTS 
import Barcode from './barcode'

export default function Tickets(props) {

    // PROPS 

    const { tickets } = props

    // PROPS ENDS

    return (
        <div className="tickets">
            <div className="tickets-header">
                <h1>Записи на консультацию</h1>
            </div>
            <Swiper
                slidesPerView={1.15}
                centeredSlides={true}
                slideToClickedSlide={true}
            >
                {
                    tickets.map((item, i) =>
                        <SwiperSlide key={i}>
                            <div className="swiper-header">
                                <div className="swiper-header-tag">
                                    {item?.type == 1 ? 'Базовый' : 'Совместимость'}
                                </div>
                                <button className="swiper-header-button" onClick={() => navigator.share({ url: `https://wonderful-numerology.netlify.app/tickets/${item?.id}` })}>
                                    Поделиться
                                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: '6px'}}>
                                        <path d="M19 18V12C19 11.448 19.447 11 20 11C20.553 11 21 11.448 21 12V18C21 19.654 19.654 21 18 21H6C4.346 21 3 19.654 3 18V6C3 4.346 4.346 3 6 3H12C12.553 3 13 3.448 13 4C13 4.552 12.553 5 12 5H6C5.448 5 5 5.449 5 6V18C5 18.551 5.448 19 6 19H18C18.552 19 19 18.551 19 18ZM17.5781 5.008L15.9951 5C15.4421 4.997 14.9971 4.547 15.0001 3.995C15.0031 3.444 15.4501 3 16.0001 3H16.0051L20.0021 3.02C20.5521 3.023 20.9971 3.469 20.9971 4.019L21.0001 7.999C21.0001 8.552 20.5531 9 20.0011 9H20.0001C19.4481 9 19.0001 8.553 19.0001 8.001L18.9991 6.415L12.7071 12.707C12.5121 12.902 12.2561 13 12.0001 13C11.7441 13 11.4881 12.902 11.2931 12.707C10.9021 12.316 10.9021 11.684 11.2931 11.293L17.5781 5.008Z" fill="#757D8A" />
                                    </svg>
                                </button>
                            </div>
                            <div className="swiper-desc">
                                <h2>{item?.name} {item?.surname}</h2>
                                <p>Информация по вашей записи</p>
                            </div>
                            <div className="swiper-main">
                                <div className="swiper-main-item">
                                    <div>
                                        <h3>Место</h3>
                                        <p>{item?.address}</p>
                                    </div>
                                </div>
                                <div className="swiper-main-item">
                                    <div>
                                        <h3>Дата</h3>
                                        <p>{moment(item?.date).format("DD-MM-YYYY")}</p>
                                    </div>
                                    <div>
                                        <h3>Время</h3>
                                        <p>{item?.time}</p>
                                    </div>
                                </div>
                                <div className="swiper-main-item">
                                    <div>
                                        <h3>Этаж</h3>
                                        <p>2</p>
                                    </div>
                                    <div>
                                        <h3>Кабинет</h3>
                                        <p>6</p>
                                    </div>
                                </div>
                                <div className="swiper-main-item">
                                    <div>
                                        <h3>Статус</h3>
                                        <p style={{ color: item?.status == true ? 'var(--color-bright)' : 'var(--color-red)'}}>{item?.status == true ? 'Оплачен' : 'Ожидает оплаты'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <QRCode className="swiper-qrcode" value={JSON.stringify({ url: `https://wonderful-numerology.netlify.app/tickets/${item?.id}` })} size={180}/>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
}