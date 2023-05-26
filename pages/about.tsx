import styled from "styled-components";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <Container>
      <Wrapper>
        <Header />

        <Dividor />

        <CardContainer>
          <Card>
            <img src="https://user-images.githubusercontent.com/56550632/219348559-9e613b98-1c1d-4ea3-bc5b-92e8ae36269d.jpg" alt="" />
            <h1>Meu nascimento</h1>
            <p>O projeto é assim</p>
          </Card>

          <Card>
            <img src="https://user-images.githubusercontent.com/56550632/175293884-7638318d-b483-43dc-8c69-b6f3a55bcd79.jpg" alt="" />
            <h1>NewsLetter</h1>
            <p>O projeto é assim</p>
          </Card>

          <Card>
            <img src="/k.jpg" alt="" />
            <h1>Projeto</h1>
            <p>O projeto é assim</p>
          </Card>

          <Card>
            <img src="/k.jpg" alt="" />
            <h1>Projeto</h1>
            <p>O projeto é assim</p>
          </Card>

          <Card>
            <img src="/k.jpg" alt="" />
            <h1>Projeto</h1>
            <p>O projeto é assim</p>
          </Card>

          <Card>
            <img src="/k.jpg" alt="" />
            <h1>Projeto</h1>
            <p>O projeto é assim</p>
          </Card>
        </CardContainer>

        <Footer />
      </Wrapper>
    </Container>
  );
}

const Dividor = styled.div`
  width: 90%;
  border-top: 1px solid #ccc;
`;

const Container = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: hsla(0, 0%, 100%, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  flex-basis: calc(40% - 10rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 7px;
  }

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;
