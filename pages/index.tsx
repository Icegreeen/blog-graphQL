
import styled from "styled-components";
import BlogCard from "@/components/BlogCard";
import { GraphQLClient, gql } from "graphql-request"
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface Post {
  id: string;
  title: string;
  datePublished: string;
  slug: string;
  content: {
    html: string;
  };
  author: {
    name: string;
    avatar: {
      url: string;
    };
  };
  coverPhoto: {
    url: string;
  };
};

const graphqlCmsUrl = process.env.GRAPHQL_CMS_URL || ''; // Valor padrão vazio caso a variável de ambiente não esteja definida
const graphqlcms = new GraphQLClient(graphqlCmsUrl);

const QUERY = gql`
  {
    posts {
      id,
      title,
      datePublished,
      slug,
      content {
        html
      }
      author {
        name,
        avatar {
          url
        }
      }
      coverPhoto {
          url
      }
    }
  }
`;

export async function getStaticProps(){
  const { posts } : {posts: Post[]} = await graphqlcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default function Home({posts} : {posts: Post[]}) {

  return (
    <Container>
      <Wrapper>
        <Header />
          <Title>
            <TitleContent>
                <h1>
                  Software developer, gamer and content creator.
                </h1>

                <p>Welcome to my blog! My name is Flávio Áquila, software developer. My minimalist lifestyle inspires me to create apps with a focus on user interface and usability. In this blog, I share my ideas, thoughts and experiences about technology.</p>
           
                <Social>
                    <LinksContainer>
                      <Link href="https://www.github.com/">
                        <Icon src="/github.png" alt="github" width={40}  />
                      </Link>
                      <Link href="https://www.linkedin.com/flavio-aquila">
                        <Icon src="/linkedin.png" alt="Linkedin" width={40}  />
                      </Link>
                    </LinksContainer>
                </Social>
           
            </TitleContent>

            <Photo>
                <img src="https://avatars.githubusercontent.com/u/56550632?v=4" alt="" width="315" />
            </Photo>
            
          </Title>

          <Dividor/>

          <Cards>
            {posts.map((post) => (
              <BlogCard
                title={post.title}
                author={post.author}
                coverPhoto={post.coverPhoto}
                key={post.id}
                datePublished={post.datePublished}
                slug={post.slug}
              />
            ))}
          </Cards>

          <Footer />
      </Wrapper>
    </Container>
  )
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
  background: hsla(0, 0%, 100%, .9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Cards = styled.div`
  display: grid;
  margin: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    margin-top: 15px;
  }

`;

const Title = styled.div`
  margin: 8rem;
  flex-direction: column;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  @media (max-width: 568px) {
    margin-top: 3rem;
    width: 120%;
    margin-bottom: 2rem;
  }
`;

const TitleContent = styled.div`
  width: 65%;
  margin-top: 4rem;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  
`;

const Photo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  img {
    border-radius: 50%;
  }

  @media (max-width: 768px) {

    img {
      max-width: 90%;
    }
  }

  @media (min-width: 768px) {
    justify-content: flex-end;
    margin-bottom: 0;
  }
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

    @media (max-width: 568px) {
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
    }
`
const LinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 150px;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
  
`;

const Icon = styled.img`
 
`;



