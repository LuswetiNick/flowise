"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/server/trpc/client";
import { Button } from "../ui/button";

const Testing = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.workflow.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.workflow.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.workflow.getWorkflows.queryOptions()
        );
      },
    })
  );

  const testAi = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: () => {
        toast.info("AI function triggered! We'll let you know when it's done.");
      },
    })
  );

  return (
    <div>
      <h2>Testing TRPC</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button
        disabled={create.isPending}
        onClick={() => create.mutate()}
        size="sm"
      >
        Create Workflow
      </Button>
      <Button
        disabled={testAi.isPending}
        onClick={() => testAi.mutate()}
        size="sm"
        variant="outline"
      >
        Test AI
      </Button>
    </div>
  );
};

export default Testing;
