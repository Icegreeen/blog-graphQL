import Link from 'next/link';
import styled from "styled-components";

interface BlogCardTypes {
    title: string;
    author: {
        name: string;
        avatar: {
            url: string;
        };
    };
    coverPhoto: {
        url: string;
    };
    datePublished: string;
    slug: string;
};

export default function BlogPost({title, author, coverPhoto, datePublished, slug }: BlogCardTypes) {
    return (
        <Card>
            <Link href={"/posts/" + slug}>
            <ImgContainer>
                <img src={coverPhoto.url} alt="" />
            </ImgContainer>
            </Link>

            <Text>
            <h2>{title}</h2>
            <Details>
                <Author>
                <img src={author.avatar.url} alt="avatar" />
                <h3>{author.name}</h3>
                </Author>
                <Date>
                <h3>{datePublished}</h3>
                </Date>
            </Details>
            </Text>
      </Card>
    );
}

const Card = styled.div`
  cursor: pointer;
  width: calc(99.33% - 20px);
  margin: 20px;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: calc(90% - 10px);
    margin: 20px;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  height: 20vh;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.2s ease-in-out;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Text = styled.div`
  padding: 1rem;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0;
  }
`;

const Date = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: 400;
    margin: 0;
    color: #6b7280;
  }
`;


