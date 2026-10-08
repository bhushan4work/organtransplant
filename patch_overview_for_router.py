import re

with open('fe/components/WorkspaceOverview.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r"import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { useRouter } from 'next/navigation';",
    content
)

content = re.sub(
    r"export function WorkspaceOverview\(\) {",
    "export function WorkspaceOverview() {\n  const router = useRouter();\n",
    content
)

new_run_demo = """<button onClick={async () => {
            try {
              const offers = await api.offers.list();
              const active = offers.find((o: any) => o.status === 'ACTIVE');
              if (!active) throw new Error('No active offers found to match');
              const res = await api.matches.runMatch(active.id);
              router.push(`/workspace/runs/${res.match_run_id}`);
            } catch (err: any) {
              alert(`Match failed: ${err.message}`);
            }
          }}"""

content = re.sub(
    r"<button onClick=\{async \(\) => \{\n\s*try \{\n\s*const res = await api\.sim\.runMatch\(\{ offer_id: 1 \}\);\n\s*alert\(`Match successful! Output hash: \$\{res\.output_hash\}\\nMatches: \$\{res\.total_candidates\}`\);\n\s*\} catch \(err: any\) \{\n\s*alert\(`Match failed: \$\{err\.message\}`\);\n\s*\}\n\s*\}\}",
    new_run_demo,
    content
)

with open('fe/components/WorkspaceOverview.tsx', 'w') as f:
    f.write(content)
