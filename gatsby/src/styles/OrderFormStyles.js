import styled from "styled-components"

const OrderFormStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  fieldset {
    display: grid;
    gap: 1rem;
    align-content: start;
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;

    &.menu,
    &.order {
      grid-column: span 1;
    }
  }

  .maple {
    display: none;
  }

  /* @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  } */
`

export default OrderFormStyles
