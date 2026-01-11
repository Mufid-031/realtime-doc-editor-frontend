import { getProfile } from "@/features/auth/api/auth.api"
import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    });
}