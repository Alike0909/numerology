import React, { useEffect, useState } from 'react'
import { Select, Collapse, Avatar, Image } from 'antd';
import { Link } from 'react-router-dom'
import './index.css'

export default function Home(props) {

    const { Option } = Select;
    const { Panel } = Collapse;

    // PROPS 

    const { currentUser, user, avatar } = props
    const { OPV, TP } = props

    // PROPS ENDS

    // VARIABLES USESTATE 

    const [searchValue, setSearchValue] = useState(``)

    // VARIABLES USESTATE ENDS

    // SEARCH FUNCTION 

    localStorage.removeItem('date')

    const options = <Option key={1}>ОПВ</Option>

    const onSearch = (value) => {
        setSearchValue(value)
    }

    const onChange = (value) => {
        console.log(value)
    }

    // SEARCH FUNCTION ENDS

    return (
        <div className="home" style={{ padding: '48px 24px 0 24px' }}>
            <header className="home-header">
                <div className="home-header-title">
                    <h1>Приветствую {user?.name}!</h1>
                    <h2>Узнай о своих числах!</h2>
                </div>
                <div className="home-header-avatar">
                    <Avatar size={60} src={<Image src={`https://firebasestorage.googleapis.com/v0/b/numerology-d24f2.appspot.com/o/images%2F${currentUser?.uid}?alt=media&token=${avatar}`} alt="" preview={false} />} />
                </div>
            </header>
            <div className="home-search">
                <div style={{margin: '4px 8px'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 11C5 7.691 7.691 5 11 5C14.309 5 17 7.691 17 11C17 14.309 14.309 17 11 17C7.691 17 5 14.309 5 11ZM20.707 19.293L17.312 15.897C18.365 14.543 19 12.846 19 11C19 6.589 15.411 3 11 3C6.589 3 3 6.589 3 11C3 15.411 6.589 19 11 19C12.846 19 14.543 18.365 15.897 17.312L19.293 20.707C19.488 20.902 19.744 21 20 21C20.256 21 20.512 20.902 20.707 20.707C21.098 20.316 21.098 19.684 20.707 19.293Z" fill="#757D8A" />
                    </svg>
                </div>
                <Select
                    showSearch
                    value={searchValue}
                    placeholder="Select a person"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={onSearch}
                    style={{ width: '100%' }}
                >
                    {options}
                </Select>
            </div>
            <Collapse className="home-feature" defaultActiveKey={['1']} ghost accordion expandIconPosition={'right'}>
                <Panel
                    header={
                        <div className="home-feature-title">
                            <h1>Ваша Карма</h1>
                        </div>
                    }
                    key="1"
                >   {
                        <div className="home-feature-container">
                            {
                                user.opvObject?.map((item, i) =>
                                    <Link 
                                        to={`/dashboard/home/karmas/${item.id}`}
                                        className="home-feature-container-item"
                                        style={{
                                            gridRow: 'span ' + item.coeff * 10
                                        }}
                                        key={i}
                                    >
                                        <span>{item.id}</span>
                                        <h3>{OPV[item.id - 1].tag}</h3>
                                        <button>Подробнее</button>
                                    </Link>
                                )
                            }
                        </div>
                    }
                </Panel>
                <Panel
                    header={
                        <div className="home-feature-title">
                            <h1>Ваши Таланты</h1>
                        </div>
                    }
                    key="2"
                >   {
                        <div className="home-feature-container">
                            {
                                user.tpObject?.map((item, i) =>
                                    <Link
                                        to={`/dashboard/home/talents/${item.id}`}
                                        className="home-feature-container-item"
                                        style={{
                                            gridRow: 'span ' + item.coeff * 10
                                        }}
                                        key={i}
                                    >
                                        <span>{item.id}</span>
                                        <h3>{OPV[item.id - 1].tag}</h3>
                                        <button>Подробнее</button>
                                    </Link>
                                )
                            }
                        </div>
                    }
                </Panel>
                <Panel
                    header={
                        <div className="home-feature-title">
                            <h1>Число вашего имени</h1>
                        </div>
                    }
                    key="3"
                >   {
                        <div className="home-feature-container">
                            {
                                <div className="home-feature-container-item"
                                    style={{
                                        gridRow: 'span ' + 3 * 10
                                    }}>
                                    <span>{user.name_number}</span>
                                    <h3>{OPV[user.name_number - 1].tag}</h3>
                                    <button>Подробнее</button>
                                </div>
                            }
                        </div>
                    }
                </Panel>
            </Collapse>
        </div>
    );
}