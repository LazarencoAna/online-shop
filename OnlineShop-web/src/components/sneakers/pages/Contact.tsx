import React from 'react';
import Header from '../components/Header';
import { Typography } from '@mui/material';

function Contact() {
    return (
        <div className="page__wrapper">
            <Header />
            <section className="store">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    Contact Us
                </Typography>
                <Typography
                    variant="h6"
                    align="left"
                    color="textSecondary"
                    paragraph
                >
                    <br></br>
                    <br></br>
                    <br></br>
                    We’re all ears.<br></br>
                    Please choose a topic below related to your inquiry:
                    <br></br> Help & Support <br></br>
                    Email enquiries:<br></br>
                    contact@online-shop.com
                    <br></br>
                    <br></br> Our address: <br></br>Online Shop SAS 128 Rue
                    <br></br>
                    La Boétie 75008 Paris France
                </Typography>
            </section>
        </div>
    );
}

export default Contact;
