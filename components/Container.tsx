import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

export default function Container() {
  return (
    <ContainerWrapper>
      <Header />
      
      <Footer/>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;

`;