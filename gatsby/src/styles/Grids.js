import styled from "styled-components"

export const HomePageGridStyles = styled.div`
  --columns: 2;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(var(--columns), minmax(auto, 1fr));

  @media (max-width: 800px) {
    --columns: 1;
  }
`

export const ItemsGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`

export const ItemStyles = styled.div`
  text-align: center;
  position: relative;

  @keyframes shine {
    from {
      background-position: 200%;
    }

    to {
      background-position: -40px;
    }
  }

  img {
    height: auto;
    font-size: 0;

    &.loading {
      --shine: white;
      --background: var(--grey);

      background-image: linear-gradient(
        90deg,
        var(--background) 0px,
        var(--shine) 40px,
        var(--background) 80px
      );

      background-size: 500px;
      animation: shine 1s infinite linear;
    }
  }

  p {
    position: absolute;
    transform: rotate(-2deg) translateY(-10px);
    width: 100%;
    left: 0;
    margin: 0;
    font-size: 2rem;
    font-size: clamp(12px, 5vw, 20px);
  }

  .mark {
    display: inline;
  }
`
