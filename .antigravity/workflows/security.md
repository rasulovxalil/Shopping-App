# Security Audit & Bug Detection Guidelines

When performing a security and bug audit on Go (Echo / PostgreSQL) code, carefully inspect the code for vulnerabilities and strictly apply the structured output format below.

## 1. Vulnerability Checklist
- **SQL Injection:** Check for raw SQL queries, string formatting (`fmt.Sprintf`), or unescaped user inputs in PostgreSQL statements.
- **Broken Access Control:** Inspect Echo handlers and middleware for missing authorization checks.
- **Data Races & Memory Issues:** Look for improper goroutine usage, unhandled panics, or unclosed DB connections/rows.
- **Input Validation & Sanitization:** Verify that path parameters, request bodies, and headers are properly validated.
- **Error Handling:** Ensure internal system stack traces or sensitive credentials are not exposed in HTTP responses.

## 2. Mandatory Output Format
For EVERY vulnerability or bug discovered, structure your response as follows:

### ⚠️ [Severity Level: Critical/High/Medium/Low] - [Issue Title]

* **Problematic File & Line:** `path/to/file.go` (Line XX)
* **Vulnerable Code Line:**
  ```go
  // Paste the problematic code line here