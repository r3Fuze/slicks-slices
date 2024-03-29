import { FaPepperHot as Icon } from "react-icons/fa"

export default {
  name: "topping",
  title: "Toppings",
  type: "document",
  icon: Icon,
  initialValue: {
    vegetarian: false,
  },
  fields: [
    {
      name: "name",
      title: "Topping Name",
      type: "string",
      description: "Name of the topping",
    },
    {
      name: "vegetarian",
      title: "Vegetarian",
      type: "boolean",
      description: "Name of the topping",
      options: {
        layout: "checkbox",
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      vegetarian: "vegetarian",
    },
    prepare: ({ name, vegetarian }) => ({
      title: `${name} ${vegetarian ? "🌱" : ""}`,
    }),
  },
}
