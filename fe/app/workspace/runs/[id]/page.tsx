import React from 'react';
import { RunDetail } from '@/components/RunDetail';

export default function RunDetailPage({ params }: { params: { id: string } }) {
  return <RunDetail runId={params.id} />;
}
