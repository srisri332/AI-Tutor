import axios from "axios";

export const checkIfUserAlreadyHasPreferences = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${window?.location?.origin}/api/skills`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.request(config);
  console.log("asdf response", response);
  if (response.data.length > 0) {
    console.log("asdf came here");
    return true;
  }
  return false;
};
