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
  if (response.data.length > 0) {
    return true;
  }
  return false;
};
