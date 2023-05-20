import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {gql, GraphQLClient, } from 'graphql-request';
import BlogCard from '@/components/BlogCard';

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
        <>
            <Blog>
                <img src={post.coverPhoto.url} alt="Imagem" />

                <Title>
                    <img src={post.author.avatar.url} alt="Avatar" />
                    <AuthText>
                        <h6>By {post.author.name}</h6>
                        <h6>{post.datePublished}</h6>
                    </AuthText>
                </Title>

                <h2>{post.title}</h2>

                <div>
                    <Content dangerouslySetInnerHTML={{ __html: post.content.html}}></Content>
                </div>

                <Social>
                  <h3>Gostou do nosso conteúdo ? Siga-nos nas redes sociais</h3>
                    <LinksContainer>
                      <Link href="https://www.instagram.com/">
                        <Icon src="/instagramMN.png" alt="Instagram" />
                      </Link>
                      {/* 
                        <Link href="">
                        <Icon src="/presentes.png" alt="Facebook" />
                      </Link>
                      <Link href="https://www.twitter.com/">
                        <Icon src="" alt="Twitter" />
                      </Link>
                      */}
                    </LinksContainer>
                </Social>
            </Blog>

            <Dividor>
              <h3>
                Leia também
              </h3>
              <hr />
            </Dividor>

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
           
        </>
    );
}

const Blog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 4rem;

  img {
    border-radius: 40px;
  }

  p {
    font-size: 2rem; 
  }

  h2 {
    font-size: 4rem;
  }

  div {
    white-space: pre-wrap;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 100px;
  }
`;

const AuthText = styled.div`
  margin: 20px;
  font-size: 2rem;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    white-space: pre-wrap;
`;

const CardFooter = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;

& > * {
  flex-basis: 21.7%;
  margin-bottom: 1rem;
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
margin-top: 4rem;

h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
`
const LinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 400px;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: #f0f0f0;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.img`
  width: 50%;
  height: 50%;
`;

const Dividor = styled.div`
  margin: 2.2rem;
  margin-bottom: -0.1rem;
  h3 {
    font-size: 2rem;
  }
`;