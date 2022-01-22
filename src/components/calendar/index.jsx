import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import './index.css'

export default function Calendar(props) {
    // PROPS 

    const { value } = props
    const { decoratorMonth } = props
    const { handleMonth, handleDay } = props
    const { swiper, setSwiper } = props

    // PROPS ENDS

    // MONTH OPTIONS 

    const temp = value.clone();
    const localeData = value.localeData();
    const months = [0, ];
    for (let i = 0; i < 12; i++) {
        temp.month(i);
        months.push(localeData.months(temp));
    }

    // MONTH OPTIONS ENDS

    // DAYS OPTIONS 

    var getDaysArray = function (year, month) {
        var monthIndex = month - 1;
        var names = ['Вскр', 'Пон', 'Втр', 'Ср', 'Чтв', 'Пт', 'Сбт'];
        var date = new Date(year, monthIndex, 1);
        var result = [];
        while (date.getMonth() == monthIndex) {
            result.push({
                day: date.getDate(),
                week: names[date.getDay()],
            });
            date.setDate(date.getDate() + 1);
        }
        return result;
    }

    // DAYS OPTIONS ENDS

    return (
        <div className="calendar">
            <header>
                <button className="month-btn" onClick={() => handleMonth(-1)} style={{ width: '30%' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 11H7.135L10.768 6.64C11.122 6.216 11.064 5.585 10.64 5.232C10.215 4.878 9.585 4.936 9.232 5.36L4.232 11.36C4.193 11.407 4.173 11.462 4.144 11.514C4.12 11.556 4.091 11.592 4.073 11.638C4.028 11.753 4.001 11.874 4.001 11.996C4.001 11.997 4 11.999 4 12C4 12.001 4.001 12.003 4.001 12.004C4.001 12.126 4.028 12.247 4.073 12.362C4.091 12.408 4.12 12.444 4.144 12.486C4.173 12.538 4.193 12.593 4.232 12.64L9.232 18.64C9.43 18.877 9.714 19 10 19C10.226 19 10.453 18.924 10.64 18.768C11.064 18.415 11.122 17.784 10.768 17.36L7.135 13H19C19.552 13 20 12.552 20 12C20 11.448 19.552 11 19 11Z" fill="#757D8A" />
                    </svg>
                    {months[Number(decoratorMonth(value.month()))]}
                </button>
                <div className="current-month" style={{ width: '40%' }}>
                    {value.format('MMMM')}
                </div>
                <button className="month-btn" onClick={() => handleMonth(1)} style={{ width: '30%' }}>
                    {months[Number(decoratorMonth(Number(value.month()) + 2))]}
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" fill="#757D8A" />
                    </svg>
                </button>
            </header>
            <content>
                <Swiper
                    onSwiper={setSwiper}
                    spaceBetween={12}
                    initialSlide={value.date() - 1}
                    onActiveIndexChange={(e) => 
                        handleDay(e)
                    }
                    slidesPerView={3.5}
                    slidesPerColumn={1}
                    centeredSlides={true}
                    slideToClickedSlide={true}
                >
                    {
                        getDaysArray(value.year(), value.month()+1).map((item, i) =>
                            <SwiperSlide key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="swiper-day">{item.day}</div>
                                <div className="swiper-week">{item.week}</div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </content>
        </div>
    )
}