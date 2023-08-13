export const timeTable = [
  { value: null, label: "" },
  { value: "00", label: "오전:00" },
  { value: "01", label: "오전:01" },
  { value: "02", label: "오전:02" },
  { value: "03", label: "오전:03" },
  { value: "04", label: "오전:04" },
  { value: "05", label: "오전:05" },
  { value: "06", label: "오전:06" },
  { value: "07", label: "오전:07" },
  { value: "08", label: "오전:08" },
  { value: "09", label: "오전:09" },
  { value: "10", label: "오전:10" },
  { value: "11", label: "오전:11" },
  { value: "12", label: "오후:00" },
  { value: "13", label: "오후:01" },
  { value: "14", label: "오후:02" },
  { value: "15", label: "오후:03" },
  { value: "16", label: "오후:04" },
  { value: "17", label: "오후:05" },
  { value: "18", label: "오후:06" },
  { value: "19", label: "오후:07" },
  { value: "20", label: "오후:08" },
  { value: "21", label: "오후:09" },
  { value: "22", label: "오후:10" },
  { value: "23", label: "오후:11" },
];

export const offset = 1000 * 60 * 60 * 9;
export const today = new Date(new Date().getTime() + offset)
  .toISOString()
  .slice(0, 10);
