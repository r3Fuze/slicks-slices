import React from "react"
import { ItemsGridStyles, ItemStyles } from "../styles/Grids"

export default function LoadingGrid({ count }) {
  return (
    <ItemsGridStyles>
      {Array.from({ length: count }).map((_, index) => (
        <ItemStyles key={`loader-${index}`}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            className="loading"
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            alt="Loading"
            width="500"
            height="400"
          />
        </ItemStyles>
      ))}
    </ItemsGridStyles>
  )
}
