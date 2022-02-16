import { BottomNavigation, Box, Button, Container, Typography, Link as MuiLink } from '@mui/material';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <Box bgcolor="primary.main" width="100%">
                <Container maxWidth="lg">
                    <Box
                        py={1}
                        display="flex" 
                        justifyContent="center"
                    >
                        <Typography>
                            Made by <MuiLink to="https://www.petterssonalbin.com" component={Link} color="text.primary">Albin Pettersson</MuiLink>
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Footer;
