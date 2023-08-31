export const formData = {
  width: { "100%": "", "40px": "","fit-content":"" },
  height: { "100%": "", auto: "" },
  margin: { auto: "", unset: "" },
  position: {
    absolute: [
      { left: { 0: "" } },
      { right: { 0: "" } },
      { top: { 0: "" } },
      { bottom: { 0: "" } },
    ],
    relative: "",
  },
  display: {
    block: [],
    flex: [
      { "flex-direction": { row: "", column: "" } },
      {
        "justify-content": {
          normal: "",
          center: "",
          "flex-start": "",
          "flex-end": "",
          "space-around": "",
          "space-between": "",
          "space-evenly": "",
        },
      },
      {
        "align-items": {
          normal: "",
          center: "",
          "flex-start": "",
          "flex-end": "",
        },
      },
      { "flex-wrap": { nowrap: "", wrap: "" } },
      {
        "align-content": {
          normal: "",
          center: "",
          "flex-start": "",
          "flex-end": "",
          "space-around": "",
          "space-between": "",
        },
      },
    ],
  },
};