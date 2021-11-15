import React, { } from 'react';

const Footer = () => {

    
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    }


    return (
        <footer>
            Copyright &copy {thisYear()}
        </footer>
    )
}

export default Footer;