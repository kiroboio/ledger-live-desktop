import styled from 'styled-components'

export const Name = styled.span`
  padding-left: 5px;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Network = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-shrink: 1;
  justify-content: flex-start;
  image {
  }
  div {
    white-space: nowrap;
    flex-shrink: 1;
    overflow: hidden;
  }
`

export default Network
