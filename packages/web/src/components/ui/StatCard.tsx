/**
 * Stat display card for web
 */

import React from 'react';
import { Card } from './Card';
import { cn } from '../../lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  className,
}) => {
  return (
    <Card className={cn('game-stat-card text-center', className)}>
      <div className="mb-3">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-[#6B7280] mt-1">{label}</p>
    </Card>
  );
};
