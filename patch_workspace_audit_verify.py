import re

with open('fe/components/WorkspaceAudit.tsx', 'r') as f:
    content = f.read()

new_btn = """<button onClick={async () => {
          try {
            const res = await api.audit.verify();
            alert("Audit chain verified successfully! No tampering detected.");
          } catch (e: any) {
            let msg = e.message;
            if (e.message.includes('valid')) {
                try {
                    const parsed = JSON.parse(e.message);
                    msg = `Validation Failed at Sequence ${parsed.broken_sequence}: ${parsed.reason}`;
                } catch(err){}
            }
            alert(`🚨 Verification Alert: ${msg}`);
          }
        }}"""

content = re.sub(
    r"<button onClick=\{async \(\) => \{\n\s*try \{\n\s*const res = await api\.audit\.verify\(\);\n\s*alert.*?\}\n\s*\}\}",
    new_btn,
    content
)

with open('fe/components/WorkspaceAudit.tsx', 'w') as f:
    f.write(content)
