'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className = '', count = 1 }: SkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`animate-pulse rounded-lg bg-neutral-700 ${className}`}
                />
            ))}
        </>
    );
}

export function SkeletonGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-3 w-40" />
                </div>
            ))}
        </div>
    );
}

export function SkeletonChart() {
    return (
        <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
}
