import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <footer id="footer">
        <Box bgcolor="primary.main" position="absolute" bottom={0} width="100%">
            <Container maxWidth="lg">
                <Box
                    py={1}
                    display="flex" 
                    justifyContent="center"
                >
                    <Typography>
                        Made with <FontAwesomeIcon icon="heart" /> {"&"} <FontAwesomeIcon icon="coffee" />
                    </Typography>
                </Box>
            </Container>
        </Box>
    </footer>
  );
};

export default Footer;
