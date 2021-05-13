import React from "react";
import Head from "next/head";
import { listPostContent, countPosts } from "../../lib/posts";
import { config } from "process";
import { listTags } from "../../lib/tags";

import renderToString from "next-mdx-remote/render-to-string";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
const components = {};

const TechTalk = ({ htmlString, data }) => {
  console.log("htmlString: ", htmlString);
  console.log("data: ", data);
  return <div style={{ margin: 10 }}>{htmlString}</div>;
};

export const getStaticProps = async ({ params }) => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "content/tech-talk/tech-talk.mdx"),
    "utf8"
  );
  const { content, data } = matter(source, {
    engines: { yaml: s => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  console.log("source  :", source);
  const mdxSource = await renderToString(content, { components, scope: data });
  return {
    props: {
      data: {
        title: data.title,
        dateString: data.date,
        slug: data.slug,
        description: "",
        tags: data.tags,
        author: data.author,
        source: mdxSource
      },
      htmlString: content
    }
  };
};

export default TechTalk;
