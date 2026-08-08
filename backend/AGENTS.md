# Security Audit & Bug Detection Workflow

When asked to review backend code (Go/Echo/PostgreSQL) for security, bugs, or test execution, strictly follow this output structure:

## 1. Vulnerability & Bug Analysis
- Check for SQL Injection (especially in raw SQL / PostgreSQL queries).
- Check for Broken Access Control / Middleware authorization flaws.
- Check for Unhandled Errors, Panic risks, and Data Race conditions.
- Check for Insecure Input Validation (Sanitization).

## 2. Output Requirements
For EACH issue found, you MUST provide:

### [Issue Title] - (e.g., Critical: Potential SQL Injection)
- **Problematic File & Line:** `backend/handler/user_handler.go` (Line 42)
- **Problem Explanation:** Explain why this line is vulnerable or bug-prone.
- **Auto-Test:** Run or generate a Go test (`go test ./...`) reproducing/verifying the issue.
- **Solution Options:**
  1. *Option A (Recommended):* Best practice fix.
  2. *Option B:* Alternative fix if applicable.
- **Fixed Code:** Show the exact refactored code snippet ready to replace.