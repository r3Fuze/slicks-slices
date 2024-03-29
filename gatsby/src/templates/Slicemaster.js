import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import SEO from "../components/SEO"

export default function SlicemasterPage({ data }) {
  const { person } = data
  return (
    <>
      <SEO title={person.name} image={person.image?.asset?.fluid?.src} />
      <div className="center">
        <Image fluid={person.image.asset.fluid} />
        <h2>
          <span className="mark">{person.name}</span>
        </h2>
        <p>{person.description}</p>
      </div>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`
