import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {gql, GraphQLClient, } from 'graphql-request';
import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface Post {
  id: string;
  title: string;
  datePublished: string;
  slug: string;
  content: {
    html: string;
  };
  author: {
    id: string;
    name: string;
    avatar: {
      url: string;
    };
  };
  coverPhoto: {
    url: string;
  };
}
interface Params {
    slug: string;
}

const graphqlCmsUrl = process.env.GRAPHQL_CMS_URL || ''; // Valor padrão vazio caso a variável de ambiente não esteja definida
const graphqlcms = new GraphQLClient(graphqlCmsUrl);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: {slug: $slug}){
      id, 
      title,
      slug,
      datePublished,
      author {
        id,
        name,
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto{
        url
      }
    }
    posts(first: 4) {
      id,
      title,
      slug,
      datePublished,
      author {
        id,
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

const SLUGLIST = gql`
    {
        posts {
            slug
        }
    }
`;

export async function getStaticPaths(){
    const { posts }: { posts: Array<{ slug: string }> } = await graphqlcms.request(SLUGLIST);

    return {
        paths: posts.map((post) => ({ params: {slug: post.slug }})),
        fallback: false,
    }
}

export async function getStaticProps({params = {slug: ''}}: {params: Params}){
    const slug = params.slug;
    const data:any = await graphqlcms.request(QUERY, {slug});

    let { post, posts }: { post: Post, posts: Post[]} = await graphqlcms.request(QUERY, { slug });

    return {
        props: {
            post,
            posts,
            revalidade: 10,
        },
        revalidate: 10,
    }
}

export default function BlogPost({post, posts}: { post: Post, posts: Post[] }){
    return(
        <Container>
          <Header />
            <Wrapper>
            <Blog>
               <ImgPost>
                  <img src={post.coverPhoto.url} alt="Imagem" />
               </ImgPost>

               <Title><h2>{post.title}</h2></Title>

               <Dividor/>

                <WrapperContent>
                    <Content dangerouslySetInnerHTML={{ __html: post.content.html}}></Content>
                </WrapperContent>

                <Social>
                  <h3>Gostou do conteúdo ? Siga-me nas redes sociais</h3>
                    <LinksContainer>
                      <Link href="https://www.github.com/">
                        <Icon src="/github.png" alt="github" width={100}  />
                      </Link>
                      <Link href="https://www.linkedin.com/flavio-aquila">
                        <Icon src="/linkedin.png" alt="Linkedin" width={100}  />
                      </Link>
                      {/* 
                      <Link href="https://www.twitter.com/">
                        <Icon src="" alt="Twitter" />
                      </Link>
                      */}
                    </LinksContainer>
                </Social>
                
                <Dividor/>
            </Blog>

            <CardFooter>
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
            </CardFooter>

            <Footer />
          </Wrapper>
           
        </Container>
    );
}

const Container = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: hsla(0, 0%, 100%, .9);

  @media screen and (max-width: 568px) {
    width: 95%;
   }
`;

const Blog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 8rem;
  margin-bottom: 1.2rem;

  img {
    border-radius: 20px;
  }

  p {
    font-size: 1.3rem; 
  }

  h2 {
    font-size: 4rem;
    color: var(--h1);
  }

  div {
    white-space: pre-wrap;

    color: var(--p);
  }

  @media screen and (max-width: 768px) {
    margin: 7rem;

    margin-bottom: 1.2rem;
  }
`;

const ImgPost = styled.div`
  img {
    width: 100%; 
    height: auto;
  }

  @media screen and (max-width: 768px) {
    img {
      width: 365px; 
      height: auto;
    }
  }

  @media screen and (max-width: 368px) {
    img {
      width: 320px; 
      height: auto;
    }
  }
  
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    width: 95%;
    h2 {
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 368px) {
    width: 86%;
    h2 {
      font-size: 1.8rem;
    }
  }
`;

const WrapperContent = styled.div`
  width: 100%;


  @media screen and (max-width: 768px) {
    width: 85vw;
  }

  @media screen and (max-width: 368px) {
    width: 80vw;
  }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 100%; 
      height: auto;
    }

    @media screen and (max-width: 768px) {
      img {
        width: 365px; 
        height: auto;
      }
    }

    @media screen and (max-width: 768px) {
      img {
        width: 300px; 
        height: auto;
      }
    }
    

    margin-bottom: -8rem;

    font-size: 10px;
    white-space: pre-wrap;
`;

const CardFooter = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;

& > * {
  flex-basis: 21.7%;

}

@media screen and (max-width: 768px) {
  & > * {
    flex-basis: 100%;
  }
}
`;

const Social = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 2rem;
  }

  @media screen and (max-width: 368px) {
    h3 {
      font-size: 1.5rem;
    }
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
  width: 60%;
  height: 60%;
`;

const Dividor = styled.div`
  margin: 1.2rem;
  width: 100%;
  border-top: 1px solid #ccc;
`;