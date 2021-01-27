import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: sans-serif;
  background: #e0e0e0;
`;

export const Leaderboard = styled.table`
  width: 70%;
  margin-top: 200px;
  margin-bottom: 200px;
  border-collapse:separate; 
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;

  td {
    padding: 20px;
  }

  td:first-child {
    padding-left: 30px;
  }

  td:last-child {
    padding-right: 30px;
  }

  thead {
    background-color: #36304A;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
  }

  tbody {
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tr:nth-child(odd) {
      background-color: #fff;
    }
  }
`;