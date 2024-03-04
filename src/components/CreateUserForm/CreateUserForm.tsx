import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Title,
  Paper,
  NativeSelect,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { months, getDays, getYears } from "./calendar";
import { createUserService } from "../../service/signup";
import { createUserParsedData } from "../../utils/helper";
import { createUserDefault, apiResponseDefault } from "./defaultValues";
import { themePrimary } from "../../assets/theme";

export default function CreateUserForm() {
  /**Initiate validation schema */
  const UserSchema = z.object({
    full_name: z
      .string()
      .min(1, { message: "Name should not be empty and no symbols" }),
    contact_number: z.string().refine(
      (value) => {
        const regex =
          /^(\(\+[0-9]{2}\))?([0-9]{3}-?)?([0-9]{3})\-?([0-9]{4})(\/[0-9]{4})?$/;
        return regex.test(value);
      },
      {
        message: "Invalid Canadian phone number format",
      }
    ),
    date_of_birth_day: z.string(),
    date_of_birth_month: z.string(),
    date_of_birth_year: z.string(),
    email: z.string().email({
      message: "Sorry, this email address is not valid. Please try again.",
    }),
    password: z
      .string()
      .min(8, { message: "Must have 8 characters in length" })
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
        path: [],
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
        path: [],
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
        path: [],
      }),
    confirm_password: z.string().refine(
      (value) => {
        return value === form.values.password;
      },
      {
        message: "Password confirmation did not match",
      }
    ),
  });

  /**
   * Initiate hooks
   */
  const [apiStatus, setAPIStatus] = useState("idle");
  const [apiResponse, setAPIResponse] = useState(apiResponseDefault);
  const form: any = useForm({
    initialValues: createUserDefault,

    validate: zodResolver(UserSchema),
  });

  /**
   * apiStatus state lifecycle
   */
  useEffect(() => {
    if (apiStatus === "fulfilled") {
      notifications.show({
        color: "green",
        title: apiResponse.title,
        message: apiResponse.description,
      });

      setAPIStatus("idle");
    } else if (apiStatus === "rejected") {
      notifications.show({
        color: "red",
        title: apiResponse.title,
        message: apiResponse.description,
      });

      setAPIStatus("idle");
    }
  }, [apiStatus]);

  /**
   * Onclick handlers
   */
  const handleSubmit = (values: any) => {
    setAPIStatus("pending");

    createUserService(createUserParsedData(values))
      .then((res: any) => {
        setAPIResponse({
          title: res.title,
          description: res.description,
        });
        setAPIStatus("fulfilled");
      })
      .catch((err) => {
        setAPIResponse({
          title: err.title,
          description: err.description,
        });
        setAPIStatus("rejected");
      });
  };

  return (
    <>
      <Title order={4}>Create User Account</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper p="lg" shadow="lg">
          <TextInput
            mb="md"
            withAsterisk
            label="Full Name"
            placeholder="Full Name"
            {...form.getInputProps("full_name")}
          />

          <TextInput
            mb="md"
            withAsterisk
            label="Contact Number"
            placeholder="Contact Number"
            {...form.getInputProps("contact_number")}
          />

          <Text size="sm" fw={500}>
            Birthdate
          </Text>
          <Group mb="md" justify="space-between">
            <NativeSelect
              data={getDays(1)}
              {...form.getInputProps("date_of_birth_day")}
            />
            <NativeSelect
              data={months}
              {...form.getInputProps("date_of_birth_month")}
            />
            <NativeSelect
              data={getYears()}
              {...form.getInputProps("date_of_birth_year")}
            />
          </Group>

          <TextInput
            mb="md"
            withAsterisk
            label="Email Address"
            placeholder="Email Address"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            mb="md"
            withAsterisk
            label="Password"
            placeholder="Create Password"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            mb="md"
            withAsterisk
            label="Confirm Password"
            placeholder="Confirm Password"
            {...form.getInputProps("confirm_password")}
          />
        </Paper>
        <Group justify="flex-end" mt="md">
          <Button variant="outline" color={themePrimary}>
            Cancel
          </Button>
          <Button
            loading={apiStatus === "pending"}
            type="submit"
            color={themePrimary}
          >
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
}
