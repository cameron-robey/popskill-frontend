import styled from 'styled-components';
import { lighten, desaturate } from 'polished';

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
    font-weight: 700;

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

  h2 {
    font-weight: 700;
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

interface ButtonProps {
  variant?: "secondary",
  disabled?: boolean
}

export const Button = styled.a<ButtonProps>`
  cursor: ${({disabled}) => disabled ? "default" : "pointer"};
  display: inline-block;
  border-radius: 5px;

  background-color: ${({theme, variant, disabled}) => desaturate(
    disabled ? 0.4 : 0,
    lighten(
      disabled ? 0.2 : 0,
      variant === "secondary" ? theme.colors.secondary : theme.colors.primary
    )
  )};

  ${({disabled}) => disabled ? "pointer-events: none;" : null}

  color: #fff;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;   
  text-decoration: none;

  padding: 0.5rem 0.75rem;
  margin: 20px 0;
  margin-left: 20px;

  transition: color .15s ease-in-out, background-color .15s ease-in-out;

  &:first-child {
    margin-left: 0px;
  }

  &:hover {
    text-decoration: none;
    color: #fff;
    background-color: ${({theme, variant, disabled}) => disabled ? '' : variant === "secondary" ? lighten(0.1,theme.colors.secondary) : lighten(0.1,theme.colors.primary)};
  }
`;

export const Leaderboard = styled.table`
  width: 100%;
  border-collapse: collapse;

  font-size: 1.1rem;

  td {
    padding: 0.7rem;
    border: #ddd 1px solid;
  }

  thead {
    border-bottom: #e2e2e2 2px solid;
  }

  tbody {
    tr {
      &:hover {
        background-color: #fafafa;
      }
  }
  }

  
`;

export const StatsTable = styled(Leaderboard)`

`;

interface DiffChangeProps {
  change: number
}

export const DiffChange = styled.span<DiffChangeProps>`
  color: ${({theme, change}) => change === -1 ? theme.colors.accentRed : change === 1 ? theme.colors.accentGreen : theme.colors.secondary};
  
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