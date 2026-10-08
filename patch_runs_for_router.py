import re

with open('fe/components/WorkspaceRuns.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r"import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { useRouter } from 'next/navigation';",
    content
)

content = re.sub(
    r"export function WorkspaceRuns\(\) {",
    "export function WorkspaceRuns() {\n  const router = useRouter();\n",
    content
)

new_run_demo = """<button onClick={async () => {
            try {
              const offers = await api.offers.list();
              const active = offers.find((o: any) => o.status === 'ACTIVE');
              if (!active) throw new Error('No active offers found to match');
              const res = await api.matches.runMatch(active.id);
              router.push(`/workspace/runs/${res.match_run_id}`);
            } catch(e: any) {
              alert(e.message);
            }
          }} className="h-[38px] md:h-[42px] px-[16px] md:px-[20px] border-0 rounded-[10px] md:rounded-[12px] bg-[#97002f] hover:bg-[#860029] text-white font-[750] text-[12px] md:text-[13px] shadow-[0_4px_12px_rgba(151,0,47,.25)] flex items-center gap-[9px] cursor-pointer transition-all active:scale-[0.98]">"""

content = re.sub(
    r"<button className=\"h-\[38px\].*?Run demo match\n\s*</button>",
    new_run_demo + "\n            <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <path d=\"M12 5v14M5 12h14\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\"/>\n            </svg> \n            Run demo match\n          </button>",
    content
)

# And hook up Inspect button
inspect_btn = """<button onClick={() => router.push(`/workspace/runs/${r.id.split('-')[2]}`)} className="border-0 bg-transparent text-[#97002f] font-[750] text-[11px] p-0 hover:text-[#760025] cursor-pointer invisible group-hover:visible">
                        Inspect
                      </button>"""
content = re.sub(
    r"<button className=\"border-0 bg-transparent text-\[#97002f\].*?>\n\s*Inspect\n\s*</button>",
    inspect_btn,
    content
)


with open('fe/components/WorkspaceRuns.tsx', 'w') as f:
    f.write(content)
