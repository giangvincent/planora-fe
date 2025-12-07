import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Role, RolePhase, RoleStep } from '@/types/gamification.types';
import { roleApi } from '@/services/api/role.api';

export const useRolesStore = defineStore('roles', () => {
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // Mock Data (Fallback)
    const mockRoles: Role[] = [
        {
            id: '1',
            title: 'Backend Developer',
            description: 'Master server-side logic, databases, and APIs.',
            icon: '⚙️',
            level: 'Intermediate',
            totalPhases: 4,
            completedPhases: 1,
            progress: 25,
            isActive: true,
            createdAt: new Date(),
            phases: []
        },
        {
            id: '2',
            title: 'Pixel Artist',
            description: 'Create stunning 8-bit art and animations.',
            icon: '🎨',
            level: 'Beginner',
            totalPhases: 3,
            completedPhases: 0,
            progress: 0,
            isActive: false,
            createdAt: new Date(),
            phases: []
        }
    ];

    const roles = ref<Role[]>([...mockRoles]);

    const activeRole = computed(() => roles.value.find(r => r.isActive));
    const currentRoleDetails = ref<Role | null>(null);

    async function fetchRoles() {
        isLoading.value = true;
        try {
            const response = await roleApi.getAll();
            roles.value = response.data;
        } catch (err) {
            console.warn('API fetch failed, using mock data', err);
            // Keep mock data
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchRoleDetails(roleId: string) {
        isLoading.value = true;
        // Check local first or api
        let role = roles.value.find(r => r.id === roleId);

        try {
            const response = await roleApi.getById(roleId);
            role = response.data;
        } catch (err) {
             console.warn('API details fetch failed, using fallback', err);
             // Use local role
        }

        if (role) {
            // Inject mock phases if still empty (handling limited API data)
            if (!role.phases || role.phases.length === 0) {
                 role.phases = getMockPhases(role.completedPhases);
            }
            currentRoleDetails.value = role;
        }
        isLoading.value = false;
    }

    function setActiveRole(roleId: string) {
        roles.value.forEach(r => r.isActive = (r.id === roleId));
    }

    async function createRole(role: Role) {
        isLoading.value = true;
        try {
             const response = await roleApi.create(role);
             roles.value.push(response.data);
        } catch (err) {
             console.warn('API create failed, adding locally', err);
             roles.value.push(role);
        } finally {
             isLoading.value = false;
        }
    }

    function getMockPhases(completedCount: number): RolePhase[] {
         return [
            {
                id: 'p1',
                title: 'Phase 1: Foundations',
                description: 'Understand the basics of the craft.',
                order: 1,
                isUnlocked: true,
                isCompleted: completedCount > 0,
                steps: [
                    {
                        id: 's1',
                        title: 'Setup Environment',
                        description: 'Install IDE, runtime, and basic tools.',
                        isCompleted: true,
                        isLocked: false,
                        tasks: [
                            { id: 't1', title: 'Install VS Code', isCompleted: true, xpReward: 10, coinReward: 5 },
                            { id: 't2', title: 'Install Node.js', isCompleted: true, xpReward: 10, coinReward: 5 }
                        ]
                    },
                    {
                        id: 's2',
                        title: 'First "Hello World"',
                        description: 'Write your first script.',
                        isCompleted: false,
                        isLocked: false,
                        tasks: [
                            { id: 't3', title: 'Write console.log', isCompleted: false, xpReward: 15, coinReward: 5 }
                        ]
                    }
                ]
            },
            {
                id: 'p2',
                title: 'Phase 2: Deep Dive',
                description: 'Advanced concepts and patterns.',
                order: 2,
                isUnlocked: completedCount > 0,
                isCompleted: false,
                steps: []
            }
        ];
    }

    return {
        roles,
        activeRole,
        currentRoleDetails,
        isLoading,
        error,
        fetchRoles,
        fetchRoleDetails,
        setActiveRole,
        createRole
    };
});
