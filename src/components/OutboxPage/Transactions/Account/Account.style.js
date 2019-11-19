import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-shrink: 1;
`

const Account = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: 36ch;
  min-width: 10ch;
  justify-content: center;
  align-items: center;

  span {
    flex-flow: row nowrap;
    overflow: hidden;
    display: none;
    &:first-of-type {
      display: flex;
      justify-content: flex-start;
      flex-shrink: 1;
    }
    &:last-of-type {
      justify-content: flex-end;
      flex-shrink: 1;
    }
  }
  @media (max-width: 910px) {
    width: 100%;
    span {
      display: flex;
    }
  }
`
export default Account
