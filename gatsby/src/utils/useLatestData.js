import { useEffect, useState } from "react"

const gql = String.raw
const dataFragment = gql`
  _id
  name
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`

export default function useLatestData() {
  const [slicemasters, setSlicemasters] = useState()
  const [hotSlices, setHotSlices] = useState()

  useEffect(() => {
    fetch(process.env.GATSBY_SANITY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemasters {
                ${dataFragment}
              }
              hotSlices {
                ${dataFragment}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSlicemasters(res.data.StoreSettings.slicemasters)
        setHotSlices(res.data.StoreSettings.hotSlices)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return {
    slicemasters,
    hotSlices,
  }
}
