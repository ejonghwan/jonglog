import React, { } from 'react';

const Footer = () => {

    
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    }


    return (
        <footer>
            <article className="section_wrap">
                Copyright &copy {thisYear()}<br />
                @font - Arita Typeface
            </article>
        </footer>
    )
}

export default Footer;