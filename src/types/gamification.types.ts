export interface GamifiedTask {
  id: string;
  title: string;
  isCompleted: boolean;
  xpReward: number;
  coinReward: number;
}

export interface RoleStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  tasks: GamifiedTask[];
  masteryCheck?: {
      type: 'quiz' | 'text';
      question: string;
      passed: boolean;
  };
}

export interface RolePhase {
  id: string;
  title: string;
  description: string;
  order: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  steps: RoleStep[];
  reward?: {
      type: 'item' | 'badge';
      name: string;
      assetUrl: string;
  };
}

export interface Role {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji or asset URL
  level: string; // 'Beginner' | 'Intermediate' | 'Expert'
  totalPhases: number;
  completedPhases: number;
  progress: number; // 0-100
  phases: RolePhase[];
  isActive: boolean;
  createdAt: Date;
}
