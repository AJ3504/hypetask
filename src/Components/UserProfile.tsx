import React from "react";
import { Avatar } from "antd";

interface UserProfileProps {
  username: string;
}
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash;
}

const UserProfile: React.FC<UserProfileProps> = ({ username }) => {
  const seed = hashCode(username);

  return (
    <div>
      <h1>{username}의 프로필</h1>
      {/* <Avatar
        size={100}
        // name={username}
        // variant="beam"
        colors={["#C8F7A8", "#FFE3D0", "#FFF3B1", "#B5EEFF", "#FFD2EE"]}
      /> */}
    </div>
  );
};

export default UserProfile;
