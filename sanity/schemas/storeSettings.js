import { MdStore as Icon } from "react-icons/md"

export default {
  name: "storeSettings",
  title: "Settings",
  type: "document",
  icon: Icon,
  fields: [
    {
      name: "name",
      title: "Store Name",
      type: "string",
    },
    {
      name: "slicemasters",
      title: "Slicemasters Currently Slicing",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    },
    {
      name: "hotSlices",
      title: "Hot Slices available in the case",
      type: "array",
      of: [{ type: "reference", to: [{ type: "pizza" }] }],
    },
  ],
}
