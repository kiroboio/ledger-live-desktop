import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-family: Inter, Arial, sans-serif;
  font-size: 12px;
  transition: all 0.3s ease-in-out;
`

export const Line = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-shrink: 1;
  justify-content: flex-start;
`

export const Spacer = styled.span`
  display: flex;
  width: 10px;
  flex-shrink: 0;
  @media (max-width: 700px) {
    width: 20px;
  }
`
