import { Layout } from "components/templates/Layout/Layout";
import { Memes } from "components/orgnisms/Memes/Memes";
import { fetchMemes } from "services";
import { useEffect } from "react";
import { useMemContext } from "context/MemesContext";

export const HomePage = () => {
  const {onSuccess,onFailure} = useMemContext();

  useEffect(() => {
    fetchMemes({onSuccess,onFailure})
  },[])

  return (
    <Layout>
      HOMEPAGE
      <Memes />
    </Layout>
  );
};
