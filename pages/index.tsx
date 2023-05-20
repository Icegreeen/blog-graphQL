
import styled from "styled-components";
import BlogCard from "@/components/BlogCard";
import { GraphQLClient, gql } from "graphql-request"

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
    <>
      <Title>
        <h1>
          RoostSpace
        </h1>

        <p>Conheça a nossa forma de trabalho</p>
      </Title>

      <Container>
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
      </Container>
    </>
  )
}


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: .1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
`;

const Title = styled.div`
  color: #8B8EE8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 2rem;
  font-size: 2rem;
`;
