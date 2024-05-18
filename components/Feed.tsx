"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

import Loading from "@app/profile/loading";

type PromptCardListProps = {
  data: any;
  handleTagClick: any;
};
const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <>
      {data.length == 0 ? (
        <Loading />
      ) : (
        <div className="mt-16 prompt_layout">
          {data.map((post: any) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
              handleEdit={undefined}
              handleDelete={undefined}
            />
          ))}
        </div>
      )}
    </>
  );
};

type FeedProps = {};

function Feed({}: FeedProps) {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/prompt`);
      const data = await res.json();
      console.log(data);

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item: any) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: any) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);

    // debounce method
    const id = setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
    setSearchTimeout(id);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  // console.log(posts);

  return (
    <section className="feed">
      <form className="relative w-full flex_center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input "
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}

export default Feed;
