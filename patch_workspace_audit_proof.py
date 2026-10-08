import re

with open('fe/components/WorkspaceAudit.tsx', 'r') as f:
    content = f.read()

# Add fetch proof logic to rows
proof_btn = """<button onClick={async () => {
                  try {
                    const res = await api.audit.proof(a.seq);
                    alert(`Proof for seq ${a.seq}:\\nHash: ${res.event_hash}\\nValid: ${res.valid}\\nPrevious: ${res.previous_hash}`);
                  } catch (e: any) {
                    alert('Proof fetch failed: ' + e.message);
                  }
                }} className="text-[#287f7b] hover:text-[#1b5855] cursor-pointer border-0 bg-transparent text-[10px] font-[800] flex items-center justify-end gap-[5px] ml-auto">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> View Proof
                </button>"""

content = re.sub(
    r"<div className=\"text-\[#287f7b\].*?>\n\s*<svg width=\"13\".*?>\n\s*<path d=\"m5 12 4 4L19 6\".*?>\n\s*</svg> Verified\n\s*</div>",
    proof_btn,
    content
)

# And expose a.seq
content = content.replace("time: new Date(a.timestamp).toLocaleString(),", "time: new Date(a.timestamp).toLocaleString(), seq: a.sequence,")

with open('fe/components/WorkspaceAudit.tsx', 'w') as f:
    f.write(content)
