---
description: Core coding rules to follow for this project
---

# CODING RULES - MUST FOLLOW

## Rule 1: Write Code Properly
- Take the time needed to write clean, well-structured code
- Quality over speed - ALWAYS
- Follow best practices and conventions

## Rule 2: Never Override Code
- DO NOT overwrite entire files or large sections
- Instead: FIX specific issues, DELETE unused code, or CHANGE targeted lines
- Use multi_replace_file_content for non-contiguous changes
- Use replace_file_content for single block changes

## Rule 3: No Duplicate Code
- Before writing new code, check if similar code already exists
- Refactor and reuse existing code when possible
- Remove any dead or redundant code found
- Keep the codebase clean - NO TRASH

## Rule 4: Always Ask Questions
- If there's ANY uncertainty, ASK the user
- Even the smallest question is worth asking
- Clarify requirements before implementing
- Don't make assumptions about user intent
