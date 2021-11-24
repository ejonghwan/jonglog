import React, { Fragment } from 'react';
import Button from './button/Button.js'


const Guide = () => {
    return (
        <Fragment>
            <section>
                <h2>button</h2>
                <div>
                    
                    <Button type="submit" value={"버튼 이름1"} classN={"btn_line"} /> <br />
                    <Button type="submit" value={"버튼 이름2"} classN={"btn_point_t1 gapt_05"} /> <br />
                    <Button type="submit" value={"버튼 이름3"} classN={"btn_point_t2 gapt_05"} /> <br />
                    <Button type="submit" value={"구매하기"} classN={"btn_point_t2 gapt_30"} /> <br />
                </div>
            </section>
        </Fragment>
    )
}


export default Guide;