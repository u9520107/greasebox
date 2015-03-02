export default function escapeRegExp(str) {
  return str.replace(/([.*+?^${}|\[\]\/\\])/g, "\\$1");
}
