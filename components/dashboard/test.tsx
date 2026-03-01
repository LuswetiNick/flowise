"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    </div>
  );
};

export default Testing;
