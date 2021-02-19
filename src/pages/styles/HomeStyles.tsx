import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import BootstrapButton from 'react-bootstrap/Button';

export const PageWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 200px;
  width: 70%;
  max-width: 80rem;
  margin: auto;

  p {
    margin: 0;
  }

  h1 {
    a {
      color: #000;
      text-decoration: none;
    }
    svg {
      height: 1.7rem;
      margin-right: 10px;
      /* vertical-align: middle; */
    }
  }
`;

export const VerticalAlignWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Row = styled.div`
  display: block;
`;

export const InlineWrapper = styled.div`
  display: inline-block;
`;

export const InlineBreak = styled.div`
  display: inline-block;
  width: 20px;
`;

export const Leaderboard = styled(Table)`

`;

export const StatsTable = styled(Table)`

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

export const Button = styled(BootstrapButton)`
  margin: 20px 0;
  margin-left: 20px;

  &:first-child {
    margin-left: 0px;
  }
`;