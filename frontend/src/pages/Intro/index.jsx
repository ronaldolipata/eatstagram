// @todo: Add intro page
import { Container, Heading } from '@chakra-ui/react';
import introImg from '@/assets/intro/3dfood.jpg';
import logo from '@/assets/Eatstagram-Light-Theme.png';
import LoginBtn from '@/components/LoginBtn';
import Footer from '@/components/Footer';
import style from './style.module.css';

const Intro = () => {
  const message = 'Welcome to';

  return (
    <Container
      className={style.parentContainer}
      centerContent
      alignItems="center"
      maxHeight="100vh"
    >
      <div className={style.mainContainer}>
        <div className={style.topHalf}>
          <div className={style.topOfTop}></div>
          <img src={introImg} className={style.bgImage} />
          <div className={style.bottomOfTop}></div>
        </div>
        <div className={style.bottomHalf}>
          <Heading className={style.heading}>
            {message}
            <img src={logo} className={style.logo} />
          </Heading>
          <p className={style.blurb}>Great food deserves to be showed off.</p>
          <LoginBtn />
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Intro;
