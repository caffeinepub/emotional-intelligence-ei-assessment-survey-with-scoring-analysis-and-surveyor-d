import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { QuizScore, UserProfile } from "../backend";
import { useActor } from "./useActor";

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useSubmitQuizScore() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (score: QuizScore) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitQuizScore(score);
    },
  });
}

export function useGetTopScores(user: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<QuizScore[]>({
    queryKey: ["topScores", user?.toString()],
    queryFn: async () => {
      if (!actor || !user) return [];
      return actor.getTopScores(user);
    },
    enabled: !!actor && !actorFetching && !!user,
  });
}

export function useLogTrainingSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (section: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.logTrainingSession(section);
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}
