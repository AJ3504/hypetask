import supabase from "../config/supabaseClient";

// export const addFollower = async () => {
//   try {
//     await supabase
//       .from("followers")
//       .insert([
//         {
//           from: "2d99d192-6ec8-4404-bc60-c0b680f45757",
//           to: "c0ef16d8-bb76-4d2a-b1a2-910b38eb4e21",
//         },
//       ])
//       .select();
//     console.log("완료!");
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getUsers = async () => {
  const { data: users } = await supabase.from("users").select("*");
  console.log(users);
  return users;
};
