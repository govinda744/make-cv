import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import useResumeStorage from "../hooks/useResumeStorage";
import { Button, Collapse, Flex, TextInput } from "@mantine/core";

function Navbar() {
  const { availableResumes, addANewResume } = useResumeStorage();
  const [addResumeOpened, { toggle: toggleAddResume }] = useDisclosure(false);

  function onResumeAdd(resumeTitle: string) {
    addANewResume(resumeTitle);

    toggleAddResume();
  }

  return (
    <Flex direction={"column"} gap={"md"}>
      <div>Resumes</div>

      <Button fullWidth onClick={toggleAddResume}>
        + Add a resume
      </Button>

      <Collapse in={addResumeOpened} autoFocus>
        <AddResume onResumeAdd={onResumeAdd} />
      </Collapse>

      {availableResumes.map((title, index) => {
        return <Resume key={`resume-${title}-${index}`} title={title} />;
      })}
    </Flex>
  );
}

function AddResume({ onResumeAdd }: { onResumeAdd: (value: string) => void }) {
  const { availableResumes } = useResumeStorage();

  const form = useForm({
    initialValues: {
      resumeTitle: "",
    },
    validate: {
      resumeTitle: (value) => {
        if (availableResumes.includes(value)) {
          return `Duplicate name '${value}`;
        }

        if (value === undefined || value === null || value.length === 0) {
          return `'${value}' is not allowed`;
        }
      },
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((formValue) => {
        onResumeAdd(formValue.resumeTitle);

        form.reset();
      })}
    >
      <TextInput
        withAsterisk
        placeholder="Resume title"
        maxLength={40}
        {...form.getInputProps("resumeTitle")}
      />
    </form>
  );
}

function Resume({ title }: { title: string }) {
  const { removeAResume } = useResumeStorage();

  return (
    <Flex direction="row" gap={"sm"}>
      <Button flex={9} fullWidth variant="default">
        {title}
      </Button>
      <Button flex={1} variant="danger" onClick={() => removeAResume(title)}>
        <IconTrash />
      </Button>
    </Flex>
  );
}

export default Navbar;
