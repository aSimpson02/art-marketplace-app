import { TextInput, TextInputProps } from "react-native"

export const Input = (props: TextInputProps) => (
  <TextInput className="border border-gray-300 rounded px-3 py-2" {...props} />
)
