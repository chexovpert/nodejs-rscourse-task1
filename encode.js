function encode(content) {
  const encrypteddata = [];
  const inputdata = content.split("");

  inputdata.forEach((elem) => {
    if (
      (elem.charCodeAt(0) &&
        elem.charCodeAt(0) >= 65 &&
        elem.charCodeAt(0) <= 90) ||
      (elem.charCodeAt(0) >= 97 && elem.charCodeAt(0) <= 122)
    ) {
      if (elem.charCodeAt(0) >= 97 && elem.charCodeAt(0) <= 122) {
        elem = String.fromCharCode(
          ((elem.charCodeAt(0) - 97 + shift) % 26) + 97
        );
      } else {
        if (elem.charCodeAt(0) >= 65 && elem.charCodeAt(0) <= 90) {
          elem = String.fromCharCode(
            ((elem.charCodeAt(0) - 65 + shift) % 26) + 65
          );
        }
      }
    }
    encrypteddata.push(elem);
  });
  const encrypteddatatext = encrypteddata.join("");
  return encrypteddatatext;
}
module.exports = text;
