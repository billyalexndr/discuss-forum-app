import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListItem = styled.li`
  padding-bottom: 0.5rem; /* pb-2 */
  margin-top: 0.5rem; /* mt-2 */
  margin-bottom: 0.5rem; /* mb-2 */
  border-bottom: 2px solid; /* border-b-2 */
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* space between the start and end items */
  gap: 1rem; /* space-x-4 */
`;

const Avatar = styled.img`
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
  border-radius: 9999px; /* rounded-full */
  flex-shrink: 0;
`;

const UserName = styled.p`
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #1f2937; /* text-gray-900 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;

  @media (prefers-color-scheme: dark) {
    color: #ffffff; /* dark:text-white */
  }
`;

const Score = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1rem; /* text-base */
  font-weight: 600; /* font-semibold */
  color: #1f2937; /* text-gray-900 */
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* space-x-4 */
`;

function LeaderboardItem({ user, score }) {
  return (
    <ListItem>
      <Container>
        <UserContainer>
          <Avatar src={user.avatar} alt="avatar user" />
          <UserName>{user.name}</UserName>
        </UserContainer>
        <Score>{score}</Score>
      </Container>
    </ListItem>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
