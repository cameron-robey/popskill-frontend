import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export const PageWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 200px;
  width: 70%;
  margin: auto;
`;

export const Leaderboard = styled(Table)`

`;



export const DiffChange = styled.span`
  float: right;
  &::before {
    content: '(';
    color: #212529;
  }
  &::after {
    content: ')';
    color: #212529;
  }
`;

export const PopflashLink = styled.a`
  float: right;
  img {
    height: 1rem;
  }

  
`;

export const AddButton = styled(Button)`
  margin-bottom: 20px;
`;