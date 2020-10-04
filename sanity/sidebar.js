import React from "react"
import S from "@sanity/desk-tool/structure-builder"
import { MdStore as Icon } from "react-icons/md"

export default function Sidebar() {
  return S.list()
    .title("Slick's Slices")
    .items([
      S.listItem()
        .title("Home Page")
        .icon(() => <Icon />)
        .child(S.editor().schemaType("storeSettings").documentId("downtown")),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "storeSettings"
      ),
    ])
}
