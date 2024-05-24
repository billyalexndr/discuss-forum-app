import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListItem = styled.li`
  padding-bottom: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  flex-shrink: 0;
`;

const UserName = styled.p`
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`;

const Score = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
