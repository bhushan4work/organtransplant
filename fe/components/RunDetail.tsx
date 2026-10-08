'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

export function RunDetail({ runId }: { runId: string }) {
  const [run, setRun] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [decisionReason, setDecisionReason] = useState('');
  const [decisionError, setDecisionError] = useState<string | null>(null);

  const fetchRun = async () => {
    setLoading(true);
    try {
      const data = await api.matches.getRun(runId);
      setRun(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load run');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRun();
  }, [runId]);

  const handleDecision = async (action: 'ACCEPT' | 'DECLINE') => {
    if (!decisionReason) {
      setDecisionError('Reason code is required');
      return;
    }
    setDecisionError(null);
    try {
      await api.matches.recordDecision(runId, {
        waitlist_entry_id: selectedCandidate.waitlist_entry_id,
        action,
        reason_code: decisionReason
      });
      alert(`Decision ${action} recorded successfully.`);
      setSelectedCandidate(null);
      setDecisionReason('');
      fetchRun(); // refresh run state
    } catch (err: any) {
      setDecisionError(err.message || 'Decision failed');
    }
  };

  const handleReplay = async () => {
    try {
      const res = await api.audit.replay(runId);
      alert(res.verified ? `Replay matched! Output hash: ${res.output_hash}` : `Replay failed! Hashes differ.`);
    } catch (err: any) {
      alert(`Replay failed: ${err.message}`);
    }
  };

  if (loading && !run) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-[#97002f] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
        Error: {error}
      </div>
    );
  }

  if (!run) return null;

  return (
    <section className="animate-[fadeIn_0.25s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[16px] mb-[20px]">
        <div>
          <div className="text-[#8191a7] uppercase text-[10px] tracking-[1.2px] font-[800] mb-[7px]">Run detail</div>
          <h1 className="text-[28px] md:text-[34px] font-[800] tracking-[-1px] text-[#111827] m-0">RUN-{run.id}</h1>
          <p className="text-[#64748b] text-[13px] md:text-[14px] mt-[9px] max-w-[540px]">
            Policy v{run.engine_version} · Initiated at {new Date(run.run_time).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-[10px]">
          <button onClick={handleReplay} className="h-[38px] px-[16px] border border-[#cbd5e1] rounded-[10px] bg-white text-[#475569] font-[750] text-[12px] hover:bg-[#f8fafc] cursor-pointer">
            Replay Run
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] mb-[20px]">
        <div className="p-4 border border-[#e2e8f0] rounded-[14px] bg-white">
          <div className="text-[#8190a1] text-[10px] font-[650]">Hashes</div>
          <div className="mt-2 text-[11px] font-mono text-[#475569]">
            <div>Policy: {run.hashes.policy}</div>
            <div>Offer: {run.hashes.offer}</div>
            <div>Waitlist: {run.hashes.waitlist}</div>
            <div className="font-bold text-[#172236]">Output: {run.hashes.output}</div>
          </div>
        </div>
      </div>

      <h2 className="text-[18px] font-[800] text-[#172236] mb-4">Ranked Matches</h2>
      <div className="border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-[12px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase">Rank</th>
              <th className="p-[12px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase">Entry ID</th>
              <th className="p-[12px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase">Score</th>
              <th className="p-[12px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {run.matches.map((m: any) => (
              <tr key={m.candidate_id} className="hover:bg-[#f8fafd]">
                <td className="p-[12px] border-b border-[#eef1f5] font-bold text-[#172236]">{m.rank}</td>
                <td className="p-[12px] border-b border-[#eef1f5] text-[#45556b]">{m.waitlist_entry_id}</td>
                <td className="p-[12px] border-b border-[#eef1f5] text-[#45556b]">{m.score.toFixed(2)}</td>
                <td className="p-[12px] border-b border-[#eef1f5]">
                  <button onClick={() => setSelectedCandidate(m)} className="text-[#97002f] text-[11px] font-[750]">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-[18px] font-[800] text-[#172236] mb-4">Excluded Candidates</h2>
      <div className="border border-[#e2e8f0] rounded-[17px] bg-white shadow-[0_10px_30px_rgba(19,35,59,.045)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-[12px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase">Entry ID</th>
              <th className="p-[12px] border-b border-[#edf0f5] bg-[#fafbfd] text-[#6b7a90] font-[750] text-[10px] uppercase">Reason</th>
            </tr>
          </thead>
          <tbody>
            {run.excluded.map((m: any) => (
              <tr key={m.candidate_id} className="hover:bg-[#f8fafd]">
                <td className="p-[12px] border-b border-[#eef1f5] text-[#45556b]">{m.waitlist_entry_id}</td>
                <td className="p-[12px] border-b border-[#eef1f5] text-[#aa4848] text-[11px] font-mono">{m.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e192873] backdrop-blur-[4px]">
          <div className="w-full max-w-lg bg-white rounded-[18px] shadow-xl overflow-hidden">
            <div className="p-[20px] border-b border-[#e2e8f0]">
              <h3 className="text-[18px] font-[800] text-[#172236]">Clinical Decision</h3>
              <p className="text-[#64748b] text-[12px]">Waitlist Entry: {selectedCandidate.waitlist_entry_id} | Rank: {selectedCandidate.rank}</p>
            </div>
            <div className="p-[20px]">
              <div className="mb-4 p-3 bg-[#f8fafd] rounded-[8px] text-[11px] font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedCandidate.trace.join('\n')}
              </div>
              <div className="mb-4">
                <label className="block text-[#475569] text-[12px] font-[650] mb-2">Reason Code</label>
                <select 
                  className="w-full p-2 border border-[#cbd5e1] rounded-[8px] text-[13px] bg-white"
                  value={decisionReason}
                  onChange={(e) => setDecisionReason(e.target.value)}
                >
                  <option value="">-- Select a reason --</option>
                  <option value="CLINICAL_REVIEW_PASS">Accept - Clinical Review Pass</option>
                  <option value="NOT_SUITABLE">Decline - Not Suitable</option>
                  <option value="PATIENT_UNAVAILABLE">Decline - Patient Unavailable</option>
                </select>
              </div>
              {decisionError && <div className="mb-4 p-3 bg-[#fff0f0] text-[#aa4848] text-[12px] rounded-[8px]">{decisionError}</div>}
              <div className="flex gap-[10px] justify-end">
                <button onClick={() => setSelectedCandidate(null)} className="px-[16px] py-[8px] text-[#475569] font-[750] text-[12px]">Cancel</button>
                <button onClick={() => handleDecision('DECLINE')} className="px-[16px] py-[8px] bg-white border border-[#cbd5e1] text-[#172236] font-[750] text-[12px] rounded-[8px]">Decline</button>
                <button onClick={() => handleDecision('ACCEPT')} className="px-[16px] py-[8px] bg-[#97002f] text-white font-[750] text-[12px] rounded-[8px]">Accept Match</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
