import React from "react";
import Head from "next/head";

const TechTalk = ({ htmlString, data }) => {
  console.log("htmlString: ", htmlString);
  console.log("data: ", data);
  return <div style={{ margin: 10 }}>Tech Talk page here</div>;
};

export const getStaticProps = async () => {
  return {
    props: {
      htmlString: "html string here",
      data: "data here"
    }
  };
};

export default TechTalk;
