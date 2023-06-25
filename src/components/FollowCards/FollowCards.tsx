import { useEffect, useState } from "react";
import Select from "react-select";

import { getAllUsers, updateFollowers } from "../../api/api";
import css from "./FollowCards.module.css";
import { Link } from "react-router-dom";
const { BASE_URL } = import.meta.env;
interface User {
  user: string;
  tweets: number;
  followers: number;
  avatar: string;
  subscribe: boolean;
  id: string;
}

type UsersResponse = User[];

const filterOptions = [
  { value: "all", label: "Show All" },
  { value: "follow", label: "Follow" },
  { value: "following", label: "Following" },
];

const FollowCards: React.FC = () => {
  const [users, setUsers] = useState<UsersResponse>([]);
  const [visibleUsers, setVisibleUsers] = useState<UsersResponse>([]);
  const [loadMoreCount, setLoadMoreCount] = useState(3);
  const [filterValue, setFilterValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let filteredUsers: UsersResponse = users;

    if (filterValue === "follow") {
      filteredUsers = users.filter((user) => !user.subscribe);
    } else if (filterValue === "following") {
      filteredUsers = users.filter((user) => user.subscribe);
    }

    setVisibleUsers(filteredUsers.slice(0, loadMoreCount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, loadMoreCount]);

  useEffect(() => {
    filterUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  const handleFilterChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    console.log(selectedOption);
    setFilterValue(selectedOption ? selectedOption.value : null);
  };

  const onUserFollow = async (
    id: string,
    subcribeOption: boolean,
    user: number
  ) => {
    const updatedUser = await updateFollowers(id, subcribeOption, user);
    if (updatedUser) {
      const updatedUsers = users.map((u) => {
        if (u.id === updatedUser.id) {
          return updatedUser;
        }
        return u;
      });
      setUsers(updatedUsers);
    }
  };

  const handleLoadMore = () => {
    setLoadMoreCount((prevCount) => prevCount + 3);
  };

  const filterUsers = () => {
    if (filterValue === "all") {
      setVisibleUsers(users.slice(0, loadMoreCount));
    } else if (filterValue === "follow") {
      const filteredUsers = users.filter((user) => !user.subscribe);
      setVisibleUsers(filteredUsers.slice(0, loadMoreCount));
    } else if (filterValue === "following") {
      const filteredUsers = users.filter((user) => user.subscribe);
      console.log(filteredUsers);
      setVisibleUsers(filteredUsers.slice(0, loadMoreCount));
    }
  };

  return (
    <div
      style={{ paddingLeft: "15px", paddingRight: "15px", marginTop: "10px" }}
    >
      <Link to="/">Go back</Link>
      <Select
        options={filterOptions}
        value={filterOptions.find((option) => option.value === filterValue)}
        onChange={handleFilterChange}
      />
      <ul className={css.list}>
        {visibleUsers.map(({ tweets, followers, avatar, subscribe, id }) => {
          return (
            <li className={css.list} key={id}>
              <div className={css.listItem}>
                <img
                  className={css.image}
                  src={BASE_URL + "./../public/picture.png"}
                />
                <div className={css.line}>
                  <div className={css.avatarWrapper}>
                    <img
                      className={css.avatar}
                      src={avatar}
                      alt="user avatar"
                    />
                  </div>
                </div>
                <div className={css.cardInfoWrapper}>
                  <p className={css.cardInfo}>{tweets} tweets</p>
                  <p className={css.cardInfo}>
                    {followers.toLocaleString()} followers
                  </p>
                  <button
                    onClick={() => onUserFollow(id, subscribe, followers)}
                    className={
                      subscribe ? css.followButtonActive : css.followButton
                    }
                    type="button"
                  >
                    {subscribe ? "Following" : "Follow"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {visibleUsers.length < users.length && (
        <button className={css.loadMoreButton} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default FollowCards;
