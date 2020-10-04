import React from "react"
import FormField from "part:@sanity/components/formfields/default"
import DefaultInput from "part:@sanity/components/textinputs/default"
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event"

const createPatchFrom = (value) =>
  PatchEvent.from(value === "" ? unset() : set(Number(value)))

const formatMoney = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format

export default function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <FormField label={type.title} description={type.description}>
      <DefaultInput
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
      <h4> = {formatMoney(value / 100)}</h4>
    </FormField>
  )
}

PriceInput.focus = function () {
  this._inputElement.focus()
}
