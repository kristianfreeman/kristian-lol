import { Form, ActionPanel, Action, showToast, Toast, getPreferenceValues } from "@raycast/api";
import fetch from "node-fetch";
import { useState, useEffect } from "react";

interface Preferences {
  apiUrl: string;
  apiKey: string;
}

interface FormValues {
  content: string;
}

export default function Command() {
  console.log("render");
  const [initialContent, setInitialContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const { apiUrl, apiKey } = getPreferenceValues<Preferences>();
        console.log(apiUrl, apiKey);

        const response = await fetch(apiUrl, {
          headers: {
            "X-Api-Key": apiKey
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch microsite content: ${response.statusText}`);
        }

        const content = await response.text();
        console.log(content);
        setInitialContent(content);
      } catch (error) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Failed to fetch microsite content",
          message: error instanceof Error ? error.message : "Unknown error"
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, []);

  async function handleSubmit(values: FormValues) {
    try {
      const { apiUrl, apiKey } = getPreferenceValues<Preferences>();

      const updateResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "X-Api-Key": apiKey
        },
        body: values.content
      });

      if (!updateResponse.ok) {
        throw new Error(`Failed to update microsite: ${updateResponse.statusText}`);
      }

      await showToast({
        style: Toast.Style.Success,
        title: "Successfully updated microsite"
      });

    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to update microsite",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Update Microsite" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="content"
        placeholder="Loading..."
        value={initialContent}
      />
    </Form>
  );
}
