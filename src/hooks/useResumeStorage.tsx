import { useLocalStorage } from "@mantine/hooks";
import { safeJsonParse } from "../utils";

function useResumeStorage() {
  const [availableResumes, setAvailableResumes] = useLocalStorage<string[]>({
    key: "resume-list",
    defaultValue: [],
    serialize: JSON.stringify,
    deserialize: (value) => safeJsonParse(value, "array"),
  });

  function addANewResume(name: string) {
    if (name === null || name === undefined || name.length === 0) {
      return;
    }

    setAvailableResumes((currentValue) => {
      const indexOfItem = currentValue.indexOf(name);

      if (indexOfItem !== -1) {
        return currentValue;
      }

      return [...currentValue, name];
    });
  }

  function removeAResume(name: string) {
    setAvailableResumes((currentValue) => {
      const indexOfItem = currentValue.indexOf(name);

      if (indexOfItem === -1) {
        return currentValue;
      }

      return [
        ...currentValue.slice(0, indexOfItem),
        ...currentValue.slice(indexOfItem + 1),
      ];
    });
  }

  return { availableResumes, addANewResume, removeAResume } as const;
}

export default useResumeStorage;
