import React from "react"
import { ItemsGridStyles, ItemStyles } from "../styles/Grids"

export default function ItemGrid({ items }) {
  return (
    <ItemsGridStyles>
      {items.map((item) => (
        <ItemStyles key={item._id}>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            width="500"
            height="400"
            alt={item.name}
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: "cover",
            }}
          />
        </ItemStyles>
      ))}
    </ItemsGridStyles>
  )
}
